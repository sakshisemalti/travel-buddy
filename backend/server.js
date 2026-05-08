const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

// ─── Serve static React build in production ───────────────────────────────────
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// ─── Mock data fallback (used when GEMINI_API_KEY is not set) ─────────────────
function buildMockItinerary({ destination, duration, budget, style }) {
  const dest = destination || 'Tokyo, Japan';
  const days = parseInt(duration) || 7;
  const templates = [
    {
      title: 'Arrival & First Impressions',
      focus: 'Land, settle in, and soak up the atmosphere of the city.',
      activities: [
        { time: 'Afternoon', icon: 'flight', title: `Arrive in ${dest}`, description: `Touch down and make your way to the city centre. Check into your accommodation and freshen up after the journey.` },
        { time: 'Evening', icon: 'walk', title: 'Explore the Neighbourhood', description: 'Take a slow walk around the area, get your bearings and discover the local character of your base for the trip.' },
        { time: 'Dinner', icon: 'food', title: 'Local Welcome Dinner', description: 'Find a well-reviewed local restaurant nearby and try the signature dish of the region for your first meal.' }
      ],
      tips: 'Keep your first evening light — jet lag and travel fatigue are real. A short walk and an early dinner is the perfect reset.'
    },
    {
      title: 'Culture & History Deep Dive',
      focus: 'Immerse yourself in the historical and cultural fabric of the city.',
      activities: [
        { time: 'Morning', icon: 'temple', title: 'Historic Quarter', description: `Spend the morning exploring the oldest and most historically rich neighbourhood in ${dest}. Look for hidden courtyards and centuries-old architecture.` },
        { time: 'Afternoon', icon: 'art', title: 'Local Museum', description: "Visit the most acclaimed local museum or gallery to understand the region's art, history and identity. Allocate 2-3 hours." },
        { time: 'Evening', icon: 'walk', title: 'Sunset Viewpoint', description: 'Find the best viewpoint in the city for golden-hour views. Locals will know the spot.' },
        { time: 'Dinner', icon: 'food', title: 'Traditional Cuisine', description: 'Dine at a restaurant known for authentic, traditional preparation of local cuisine. Avoid tourist-facing menus.' }
      ],
      tips: 'Book museum tickets online in advance to skip queues. Most major museums are far quieter on weekday mornings.'
    },
    {
      title: 'Nature & Adventure Day',
      focus: 'Get outdoors and experience the natural landscape around the city.',
      activities: [
        { time: 'Morning', icon: 'mountain', title: 'Scenic Hike or Park', description: `Head to the best natural area within reach of ${dest} — a national park, coastal trail, or forested hillside. Start early to beat the heat.` },
        { time: 'Afternoon', icon: 'nature', title: 'Natural Landmark', description: 'Visit the most iconic natural feature of the region — a waterfall, lake, canyon or viewpoint that the locals are proud of.' },
        { time: 'Evening', icon: 'relax', title: 'Spa or Hot Spring', description: 'Reward tired muscles with a local spa treatment or natural hot spring experience if available in the region.' },
        { time: 'Dinner', icon: 'food', title: 'Farm-to-Table Dinner', description: 'Seek out a restaurant sourcing locally grown produce, ideally near the natural area you explored today.' }
      ],
      tips: 'Pack water, sunscreen and snacks for the outdoor day. Conditions can change quickly in natural environments.'
    },
    {
      title: 'Local Markets & Hidden Gems',
      focus: 'Go off the beaten path and shop, taste and discover like a local.',
      activities: [
        { time: 'Morning', icon: 'shop', title: 'Local Market', description: 'Visit the most authentic local market — food, craft or antique. Arrive early for the best selection and a quieter atmosphere before the tourist rush.' },
        { time: 'Afternoon', icon: 'walk', title: 'Hidden Neighbourhood', description: `Explore the neighbourhood in ${dest} that most tourists miss. It is typically residential, slightly gritty, and full of independent cafes and street art.` },
        { time: 'Evening', icon: 'building', title: 'Rooftop Bar or Terrace', description: 'Find a rooftop or elevated terrace with a view of the city skyline for sundowner drinks.' },
        { time: 'Dinner', icon: 'food', title: 'Street Food Night', description: 'Spend dinner grazing at street food stalls or a lively night market. The best local snacks are always found here.' }
      ],
      tips: 'Hidden gem: Ask your accommodation host which neighbourhood THEY live in and go there for coffee. It is always the most authentic spot.'
    },
    {
      title: 'Day Trip & Surroundings',
      focus: 'Escape the city and explore what lies just beyond.',
      activities: [
        { time: 'Morning', icon: 'train', title: 'Day Trip Departure', description: `Take an early train or bus to a nearby town or attraction within 1–2 hours of ${dest}. Smaller towns near major cities are often the most rewarding visits.` },
        { time: 'Afternoon', icon: 'nature', title: 'Explore the Day Trip Destination', description: 'Spend 3–4 hours in the nearby town. Walk its main street, visit a local attraction, and try lunch at a spot popular with residents, not tourists.' },
        { time: 'Evening', icon: 'train', title: 'Return to City', description: 'Head back before dark. Take a different route if possible for new scenery.' },
        { time: 'Dinner', icon: 'food', title: 'Neighbourhood Bistro', description: 'Keep dinner local and relaxed after the day trip — a neighbourhood bistro within walking distance of your hotel.' }
      ],
      tips: 'Buy train/bus tickets the evening before. Day trip routes sell out, especially on weekends.'
    },
    {
      title: 'Art, Design & Modern Culture',
      focus: 'Discover the contemporary creative scene of the city.',
      activities: [
        { time: 'Morning', icon: 'art', title: 'Contemporary Art Space', description: 'Seek out the most talked-about contemporary art gallery or immersive experience in the city. Modern spaces often have no queues and bold, surprising exhibitions.' },
        { time: 'Afternoon', icon: 'building', title: 'Design District', description: `Walk through the most design-forward neighbourhood in ${dest} — independent boutiques, studios, and architecture worth photographing at every corner.` },
        { time: 'Evening', icon: 'coffee', title: 'Specialty Coffee & Books', description: 'Find the most acclaimed independent bookshop with a café. Spend an hour here — a beloved local ritual.' },
        { time: 'Dinner', icon: 'star', title: 'Chef\'s Table or Tasting Menu', description: 'Splurge on one special dinner at a restaurant with a tasting menu. One outstanding meal is worth more than three mediocre ones.' }
      ],
      tips: 'Check local event listings — art openings, pop-up markets, and free concerts frequently happen in evenings with no advance notice needed.'
    },
    {
      title: 'Slow Morning & Farewell',
      focus: 'Savour the last hours and depart with memories to last a lifetime.',
      activities: [
        { time: 'Morning', icon: 'coffee', title: 'Slow Breakfast', description: 'Start with a long breakfast at the best café you discovered during the trip. Order everything you haven\'t tried yet.' },
        { time: 'Afternoon', icon: 'shop', title: 'Last-Minute Souvenirs', description: 'Visit the craft or artisan market for locally made souvenirs. Avoid airport shops — the best gifts are always found in the city.' },
        { time: 'Afternoon', icon: 'flight', title: 'Departure', description: `Head to the airport or station for your onward journey from ${dest}. Carry the pace and mindset of this trip with you.` }
      ],
      tips: 'Leave a review for every small business that made your trip special. It makes a real difference to local operators.'
    }
  ];

  return {
    destination: dest,
    duration: days,
    budget: budget || '$2,000 USD',
    style: style || 'Solo',
    days: Array.from({ length: days }, (_, i) => {
      const template = templates[i % templates.length];
      return { day: i + 1, ...template };
    })
  };
}

// ─── API Route ────────────────────────────────────────────────────────────────
app.post('/api/generate-itinerary', async (req, res) => {
  const { destination, duration, style, budget, vibes, constraints } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const hasKey = apiKey && apiKey !== 'YOUR_API_KEY_HERE';

  // ── Fallback to mock data if no API key ──
  if (!hasKey) {
    console.log('[INFO] No GEMINI_API_KEY found — serving dynamic mock itinerary.');
    return res.json(buildMockItinerary({ destination, duration, budget, style }));
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    const prompt = `
You are an expert travel planner. Create a ${duration}-day itinerary for ${destination}.
Travel Style: ${style}
Budget (per person): ${budget}
Interests & Vibes: ${vibes}
Constraints: ${constraints || 'None'}

Return ONLY a valid JSON object matching this exact structure (no markdown, no code fences):
{
  "destination": "${destination}",
  "duration": ${duration},
  "budget": "${budget}",
  "style": "${style}",
  "days": [
    {
      "day": 1,
      "title": "Short catchy title for the day",
      "focus": "Brief theme of the day in 1 sentence.",
      "activities": [
        {
          "time": "Morning",
          "icon": "walk",
          "title": "Specific place or restaurant name",
          "description": "2-3 sentences making this sound exciting and specific."
        }
      ],
      "tips": "1 practical local insight for the day"
    }
  ]
}

Rules:
- icon must be exactly one of: flight, walk, food, train, nature, mountain, relax, temple, shop, art, boat, star, building, coffee, default
- Provide 3-4 activities per day covering Morning, Afternoon, Evening, and Dinner where relevant.
- Be specific — real place names, neighborhoods, transport options, dietary notes.
- Return ONLY the raw JSON. No extra text.
`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-pro',
      generationConfig: { responseMimeType: 'application/json' },
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse AI JSON response:', text.slice(0, 500));
      // Fall back to mock if AI returns garbage
      return res.json(buildMockItinerary({ destination, duration, budget, style }));
    }

    res.json(parsedData);
  } catch (error) {
    console.error('Error generating itinerary:', error.message);
    // Fall back to mock on any error
    res.json(buildMockItinerary({ destination, duration, budget, style }));
  }
});

// ─── Catch-all: serve React app for any non-API route ─────────────────────────
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ WanderLust AI server running on http://localhost:${PORT}`);
  console.log(`   Gemini AI: ${process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_API_KEY_HERE' ? '✅ Enabled' : '⚠️  No key — using rich mock data'}`);
});
