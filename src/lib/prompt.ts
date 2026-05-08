import type { GeneratePayload } from './types';
import { CITIES, MOODS } from './constants';

/**
 * Builds an optimized prompt for the Gemini API that incorporates all user preferences
 * and feature toggles to generate contextually rich itineraries.
 */
export function buildPrompt(data: GeneratePayload): string {
  const city = CITIES.find(c => c.id === data.city);
  const mood = MOODS.find(m => m.id === data.mood);

  const moodDesc = mood
    ? `${mood.label} — ${mood.hint}${data.moodText ? `. Personal vibe: "${data.moodText}"` : ''}`
    : data.moodText || 'Open minded';

  const moodPacing: Record<string, string> = {
    burnt_out: 'Slow pace, rest-heavy, rooftop breakfasts, quiet gardens, minimal commitments.',
    adventurous: 'Maximum activities, street food challenges, local transport, physical challenges.',
    spiritual: 'Temples at dawn, ghats at dusk, silence walks, meditation, sacred sites.',
    food_obsessed: 'Every slot centered on food — dhaba trails, market tastings, cooking experiences.',
    romantic: 'Sunset spots, candlelit heritage venues, slow evenings, intimate experiences.',
    lost_drifting: 'Intentionally vague — "get lost" lane walks, serendipitous encounters.',
    curious: 'Niche museums, architecture deep-dives, talking to locals, learning experiences.',
    wild_free: 'Physical challenges, night markets, unconventional transport, unfiltered experiences.',
  };

  const rules = [
    data.antiTourist &&
      'ANTI-TOURIST MODE: Skip ALL mainstream tourist attractions (Taj Mahal, Gateway of India, etc). Suggest ONLY hyper-local neighbourhood gems that locals actually visit. Each activity MUST include an "anti_note" field explaining what locals prefer instead.',
    data.liveDisruptions &&
      'DISRUPTION AWARENESS: Add a "disruption_note" string to every day with 1 India-specific risk (monsoon flooding, bandh/hartal, extreme heat >45°C, temple closure, train delayed). Explain impact and suggest indoor alternatives.',
    data.localEvents &&
      'LOCAL EVENT INJECTION: Add "local_events" array per day with 1-2 entries: { name, type, time, description }. Types: mela, sabzi_mandi, music_sabha, procession, mohalla_festival.',
    data.showEateries &&
      'RESTAURANT RECOMMENDATIONS: Add "eateries" array per day with exactly 2 entries: { name, type (dhaba|street_food|thali|chai_stall|cafe), specialty, rating (4.0-5.0), neighbourhood }. NO hotel restaurants, NO tourist menus.',
    data.activeDisruption &&
      `⚠️ ACTIVE DISRUPTION: ${data.activeDisruption}. Reroute all outdoor activities with indoor alternatives.`,
  ].filter(Boolean);

  const rulesText = rules.length > 0 ? rules.join('\n\n') : '';

  return `You are an expert India travel planner with deep local knowledge of ${city?.name}.

TRIP CONTEXT:
- Destination: ${city?.name || 'Unknown city'}
- Duration: ${data.duration} days
- Travel Style: ${data.style}
- Budget: ₹${data.budget.toLocaleString('en-IN')} per person
- Traveller Mood: ${moodDesc}
- Mood-based pacing: ${moodPacing[data.mood ?? ''] ?? 'Flexible'}

${rulesText ? `FEATURE CONFIGURATION:\n${rulesText}` : ''}

CRITICAL UNIQUENESS RULE:
Every single day MUST have completely different activities, locations, neighbourhoods, and eateries.
NEVER repeat the same place, restaurant, market, or neighbourhood across different days.
Each day should explore a different part of the city with a different theme.

MAP STOPS RULE (MANDATORY):
Every day MUST include a "map_stops" array with 3-5 stops.
Each stop needs REAL latitude and longitude for the actual place in ${city?.name}, India.
Example: Chandni Chowk Delhi = lat:28.6507, lng:77.2334
Activities are type "activity", restaurants/eateries are type "restaurant".

Return ONLY raw valid JSON (no markdown, no code blocks):
{
  "destination": "${city?.name}",
  "city": "${data.city}",
  "duration": ${data.duration},
  "budget": ${data.budget},
  "mood": "${data.mood}",
  "style": "${data.style}",
  "days": [
    {
      "day": 1,
      "title": "unique theme for this day",
      "focus": "what makes this day special",
      "activities": [
        {
          "time": "Morning|Afternoon|Evening|Night",
          "icon": "walk|food|temple|art|nature|shop|coffee|train|mountain|relax|boat|star|building|music|camera|default",
          "title": "Specific place name in specific neighbourhood",
          "description": "2-3 sentences with neighbourhood name, what to do, local tip",
          "anti_note": "only if antiTourist mode is on"
        }
      ],
      "eateries": [],
      "local_events": [],
      "disruption_note": "only if liveDisruptions is on",
      "map_stops": [
        { "id": "d1-s1", "name": "Place Name", "type": "activity", "lat": 28.6507, "lng": 77.2334 },
        { "id": "d1-s2", "name": "Restaurant Name", "type": "restaurant", "lat": 28.6512, "lng": 77.2340 }
      ]
    }
  ]
}

Quality standards:
✓ 3-4 activities per day, each in a DIFFERENT neighbourhood
✓ Every day covers a different part of the city
✓ Zero repeated places across all days
✓ map_stops MUST be present for every day with real lat/lng coordinates
✓ Budget-conscious and mood-aligned`;
}

export function validateItineraryResponse(data: unknown): data is Record<string, unknown> {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  const requiredFields = ['destination', 'city', 'duration', 'budget', 'mood', 'style', 'days'];
  return requiredFields.every(field => field in obj);
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '').slice(0, 500).trim();
}
