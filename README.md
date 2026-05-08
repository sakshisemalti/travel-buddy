# 🌍 WanderLust AI — Dynamic Trip Planner

An AI-powered travel planning web app that generates personalized, day-by-day itineraries based on your destination, mood, budget, travel style, and constraints. Built with Next.js 15 and powered by Google Gemini 2.5 Pro.

---

## ✨ Features

- 🤖 **AI-Powered Itineraries** — Google Gemini 2.5 Pro crafts real, detailed day-by-day plans
- 🏙️ **8 Indian Cities** — Delhi, Mumbai, Jaipur, Varanasi, Bengaluru, Kolkata, Udaipur, Chennai
- � **Emotion Engine** — 8 travel moods (Adventurous, Spiritual, Food Obsessed, Burnt Out, and more)
- 💸 **Budget Slider** — ₹2,000–₹80,000 range with category badges (Budget / Comfort / Luxury)
- 🚫 **Anti-Tourist Mode** — Skips mainstream spots, surfaces hyper-local hidden gems
- 🌧️ **Live Disruption Rerouter** — Monsoon, bandh, heat wave, and transport alerts with alternatives
- 🎪 **Local Event Injection** — Melas, music sabhas, processions, and mohalla festivals
- 🍽️ **Top-Rated Local Eateries** — 2 authentic spots per day (dhabas, chai stalls, thali spots)
- 🗺️ **Visual Trip Map** — SVG route visualization with activity and restaurant stops
- � **Mock Data Fallback** — Works fully without an API key

---

## 🏗️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Next.js 15 (App Router)           |
| Language   | TypeScript 5 (strict mode)        |
| Styling    | Tailwind CSS 3                    |
| Animations | Framer Motion                     |
| Icons      | Lucide React                      |
| Backend    | Node.js + Express 5               |
| AI         | Google Gemini 2.5 Pro             |
| Deployment | Docker / Google Cloud Run / Vercel|

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/sakshisemalti/travel-buddy.git
cd travel-planning
```

### 2. Install dependencies

```bash
# Frontend (Next.js)
npm install

# Backend (Express)
cd backend && npm install && cd ..
```

### 3. Set up environment variables

**Frontend** — create `.env.local` in the project root:
```bash
GEMINI_API_KEY=your_google_gemini_api_key_here
```

**Backend** — create `backend/.env`:
```bash
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=5000
```

Get a free API key at: https://aistudio.google.com/app/apikey

> The app works with mock data if you skip the API key entirely.

### 4. Run locally (two terminals)

**Terminal 1 — Backend:**
```bash
cd backend
node server.js
# Running at http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
npm run dev
# Running at http://localhost:3000
```

Open **http://localhost:3000** in your browser.

---

## 📂 Project Structure

```
travel-planning/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── api/generate/           # POST /api/generate — AI itinerary endpoint
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   └── globals.css             # Global styles & animations
│   │
│   ├── components/
│   │   ├── form/                   # Input components
│   │   │   ├── CityPicker.tsx      # 8-city grid selector
│   │   │   ├── MoodSelector.tsx    # 8-mood grid + custom text
│   │   │   ├── BudgetSlider.tsx    # ₹2K–₹80K range slider
│   │   │   ├── ToggleFeatures.tsx  # Feature toggles
│   │   │   └── TripForm.tsx        # Main form orchestrator
│   │   │
│   │   ├── itinerary/              # Output display components
│   │   │   ├── ItineraryDisplay.tsx
│   │   │   ├── DayCard.tsx         # Collapsible day container
│   │   │   ├── ActivityCard.tsx    # Activity with anti-notes
│   │   │   ├── EateryCard.tsx      # Restaurant listing
│   │   │   ├── LocalEventBadge.tsx # Mela / festival badges
│   │   │   └── DisruptionAlert.tsx # Warning banners
│   │   │
│   │   ├── map/
│   │   │   └── TripMap.tsx         # SVG interactive route map
│   │   │
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   │
│   ├── lib/
│   │   ├── types.ts                # TypeScript interfaces
│   │   ├── constants.ts            # Cities, moods, disruptions config
│   │   ├── prompt.ts               # Gemini prompt builder
│   │   ├── mock.ts                 # Mock itinerary fallback
│   │   ├── hooks/
│   │   │   ├── useTrip.ts          # API call & itinerary state
│   │   │   └── useTripForm.ts      # Form state management
│   │   └── utils/
│   │       ├── validation.ts       # Form & input validation
│   │       └── formatting.ts       # Display formatting helpers
│   │
│   ├── data/
│   │   └── mockItinerary.js        # Static mock data
│   │
│   └── App.tsx                     # Main app component
│
├── backend/
│   ├── server.js                   # Express server (port 5000)
│   └── .env                        # Backend env vars (not committed)
│
├── public/                         # Static assets
├── Dockerfile                      # Multi-stage Docker build
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔌 API Reference

### Frontend API (Next.js)

**POST `/api/generate`**

```json
{
  "city": "delhi",
  "mood": "food_obsessed",
  "moodText": "Love trying risky street food",
  "duration": 3,
  "budget": 15000,
  "style": "Solo",
  "antiTourist": true,
  "liveDisruptions": true,
  "localEvents": true,
  "showEateries": true
}
```

### Backend API (Express)

**POST `/api/generate-itinerary`** — same payload, runs on port 5000

Both endpoints fall back to rich mock data if no API key is configured.

---

## 🐳 Docker

```bash
# Build
docker build -t wanderlust-ai .

# Run
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key wanderlust-ai
```

---

## ☁️ Deploy to Cloud Run

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

gcloud run deploy wanderlust-ai \
  --source . \
  --region us-central1 \
  --set-env-vars GEMINI_API_KEY=your_key \
  --allow-unauthenticated
```

---

## 🧪 Development

```bash
# Lint
npm run lint

# Production build
npm run build
npm start
```

---

## 📚 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design, data flow, component communication
- [FEATURES.md](./FEATURES.md) — Feature deep-dives and prompt engineering
- [QUICKSTART.md](./QUICKSTART.md) — Deployment options and customization guide
