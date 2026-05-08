import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GeneratePayload, ApiError } from '@/lib/types';
import { buildPrompt, validateItineraryResponse } from '@/lib/prompt';
import { buildMockItinerary } from '@/lib/mock';
import { extractJSONFromText } from '@/lib/utils/validation';

/**
 * POST /api/generate
 * Streams the itinerary generation using Gemini.
 * Falls back to mock data on quota errors or any Gemini failure.
 */
export async function POST(req: NextRequest) {
  // Parse body first so it's available throughout
  let body: GeneratePayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request format. Please send valid JSON.' } as ApiError,
      { status: 400 }
    );
  }

  // Validate required fields
  const requiredFields = ['city', 'mood', 'duration', 'budget', 'style'];
  const missingFields = requiredFields.filter(field => !body[field as keyof GeneratePayload]);
  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missingFields.join(', ')}` } as ApiError,
      { status: 400 }
    );
  }

  if (typeof body.duration !== 'number' || body.duration < 1 || body.duration > 30) {
    return NextResponse.json(
      { error: 'Duration must be a number between 1 and 30' } as ApiError,
      { status: 400 }
    );
  }
  if (typeof body.budget !== 'number' || body.budget < 2000 || body.budget > 80000) {
    return NextResponse.json(
      { error: 'Budget must be a number between 2000 and 80000 INR' } as ApiError,
      { status: 400 }
    );
  }

  // Helper: return mock as a streaming response so the client code path is identical
  const serveMock = () => {
    const mockData = buildMockItinerary({
      city: body.city,
      mood: body.mood,
      duration: body.duration,
      budget: body.budget,
      style: body.style,
    });
    const json = JSON.stringify(mockData);
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(json));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { 'Content-Type': 'application/json', 'X-Source': 'mock' },
    });
  };

  // Check for API key
  const apiKey = process.env.GEMINI_API_KEY;
  const hasValidApiKey = apiKey && apiKey !== 'YOUR_API_KEY_HERE' && apiKey.length > 0;
  if (!hasValidApiKey) {
    console.info('[WanderLust] No GEMINI_API_KEY — serving mock itinerary.');
    return serveMock();
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.9,
        topP: 0.95,
      },
    });

    const prompt = buildPrompt(body);

    // Use streaming so the client receives data progressively
    const streamResult = await model.generateContentStream(prompt);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let fullText = '';
        try {
          for await (const chunk of streamResult.stream) {
            const chunkText = chunk.text();
            fullText += chunkText;
            // Stream raw chunks to client
            controller.enqueue(encoder.encode(chunkText));
          }

          // Validate the complete response after streaming
          const cleaned = extractJSONFromText(fullText);
          let parsed;
          try {
            parsed = JSON.parse(cleaned);
          } catch {
            // If JSON is malformed, stream mock data instead
            console.error('[WanderLust] Failed to parse streamed JSON, falling back to mock');
            const mockData = buildMockItinerary({
              city: body.city, mood: body.mood,
              duration: body.duration, budget: body.budget, style: body.style,
            });
            controller.enqueue(encoder.encode('\n__FALLBACK__' + JSON.stringify(mockData)));
          }

          if (parsed && !validateItineraryResponse(parsed)) {
            console.error('[WanderLust] AI response missing required fields, falling back to mock');
            const mockData = buildMockItinerary({
              city: body.city, mood: body.mood,
              duration: body.duration, budget: body.budget, style: body.style,
            });
            controller.enqueue(encoder.encode('\n__FALLBACK__' + JSON.stringify(mockData)));
          }
        } catch (streamErr) {
          console.error('[WanderLust] Stream error:', streamErr);
          const mockData = buildMockItinerary({
            city: body.city, mood: body.mood,
            duration: body.duration, budget: body.budget, style: body.style,
          });
          controller.enqueue(encoder.encode('\n__FALLBACK__' + JSON.stringify(mockData)));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked',
        'X-Source': 'gemini-stream',
      },
    });
  } catch (err) {
    console.error('[WanderLust] Gemini API error — falling back to mock:', err);
    return serveMock();
  }
}
