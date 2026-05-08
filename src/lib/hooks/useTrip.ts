'use client';

import { useState, useCallback } from 'react';
import type { Itinerary, GeneratePayload, ApiError } from '../types';
import { validateItineraryResponse } from '../prompt';
import { extractJSONFromText } from '../utils/validation';

interface UseTrip {
  itinerary: Itinerary | null;
  isLoading: boolean;
  streamProgress: number; // 0-100
  error: string | null;
  generateTrip: (payload: GeneratePayload) => Promise<void>;
  reset: () => void;
}

export function useTrip(): UseTrip {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [streamProgress, setStreamProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const generateTrip = useCallback(async (payload: GeneratePayload) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setStreamProgress(0);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as ApiError;
        throw new Error(errorData.error || 'Failed to generate itinerary');
      }

      // Read the stream
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response stream available');

      const decoder = new TextDecoder();
      let fullText = '';
      let estimatedTotal = 3000; // rough estimate of total chars for progress

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        // Update progress based on how much we've received
        const progress = Math.min(90, Math.round((fullText.length / estimatedTotal) * 90));
        setStreamProgress(progress);

        // Dynamically adjust estimate as we learn more
        if (fullText.length > estimatedTotal * 0.8) {
          estimatedTotal = fullText.length * 1.5;
        }
      }

      setStreamProgress(95);

      // Check for fallback marker
      let jsonText = fullText;
      const fallbackIdx = fullText.lastIndexOf('\n__FALLBACK__');
      if (fallbackIdx !== -1) {
        jsonText = fullText.slice(fallbackIdx + '\n__FALLBACK__'.length);
      }

      // Extract and parse JSON
      const cleaned = extractJSONFromText(jsonText);
      let data;
      try {
        data = JSON.parse(cleaned);
      } catch {
        throw new Error('Could not parse itinerary response. Please try again.');
      }

      if (!validateItineraryResponse(data)) {
        throw new Error('Invalid response format from API');
      }

      setStreamProgress(100);
      setItinerary(data as Itinerary);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      console.error('Trip generation error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setItinerary(null);
    setError(null);
    setStreamProgress(0);
  }, []);

  return { itinerary, isLoading, streamProgress, error, generateTrip, reset };
}
