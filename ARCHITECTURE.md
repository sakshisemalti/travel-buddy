# WanderLust AI - Production Architecture & Implementation Guide

## 🏗️ Architecture Overview

### **System Design**
The application follows a **clean, modular architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────┐
│           User Interface Layer (React)           │
│  Forms → ITinerary Display → Map Visualizations │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│        State Management Layer (Hooks)            │
│  useTripForm → useTrip → Form State Management  │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│      Business Logic Layer (Lib utilities)        │
│  Validation → Formatting → Prompt Building      │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│         External Services Layer (APIs)           │
│  Gemini API → Mock Data → JSON Processing       │
└─────────────────────────────────────────────────┘
```

### **Key Design Principles**

1. **Type Safety**: Full TypeScript coverage with explicit types/interfaces
2. **Separation of Concerns**: Business logic isolated from UI components
3. **Reusability**: Small, focused components that can be combined
4. **Error Resilience**: Graceful degradation with mock data fallback
5. **Accessibility**: WCAG 2.1 compliance with proper ARIA labels
6. **Performance**: Memoization, lazy loading, optimized re-renders

---

## 📁 Folder Structure

```
src/
├── app/                      # Next.js app directory
│   ├── api/generate/        # API endpoint for itinerary generation
│   │   └── route.ts         # POST handler with validation & error handling
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles + animations
│
├── components/              # React components (organized by feature)
│   ├── layout/              # App structure components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   │
│   ├── form/                # Form input components
│   │   ├── CityPicker.tsx       (8-city grid with descriptions)
│   │   ├── MoodSelector.tsx     (8-mood grid + custom text input)
│   │   ├── BudgetSlider.tsx     (₹2K-₹80K range slider)
│   │   ├── ToggleFeatures.tsx   (4 optional feature toggles)
│   │   └── TripForm.tsx         (Main form orchestrator)
│   │
│   ├── itinerary/           # Itinerary display components
│   │   ├── ActivityCard.tsx      (Single activity with anti-notes)
│   │   ├── EateryCard.tsx        (Restaurant/cafe listing)
│   │   ├── LocalEventBadge.tsx   (Mela, festival badges)
│   │   ├── DisruptionAlert.tsx   (Warning alerts)
│   │   ├── DayCard.tsx           (Collapsible day container)
│   │   └── ItineraryDisplay.tsx  (Main output display)
│   │
│   ├── map/                 # Map visualization
│   │   └── TripMap.tsx      (SVG interactive route map)
│   │
│   └── index.ts             # Component exports
│
├── lib/                     # Business logic & utilities
│   ├── types.ts             # TypeScript interfaces (20+ types)
│   ├── constants.ts         # Configuration data
│   │   ├── CITIES (8 cities with metadata)
│   │   ├── MOODS (8 moods with emojis)
│   │   ├── DISRUPTIONS (5 India challenges)
│   │   ├── Feature descriptions
│   │   └── UI constants
│   │
│   ├── prompt.ts            # AI prompt builder
│   │   ├── buildPrompt()        (Feature-aware prompt generation)
│   │   ├── validateItineraryResponse()
│   │   └── sanitizeInput()
│   │
│   ├── mock.ts              # Mock data generator (fallback)
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useTripForm.ts       (Form state management)
│   │   └── useTrip.ts           (API call & itinerary state)
│   │
│   └── utils/               # Utility functions
│       ├── validation.ts        (Form & input validation)
│       └── formatting.ts        (Display formatting helpers)
│
├── App.jsx                  # Main app component
└── main.jsx                 # Entry point
```

---

## 🔄 Data Flow

### **1. User Input → Form State**
```
User selects city → CityPicker
           ↓
User selects mood → MoodSelector
           ↓
User sets budget → BudgetSlider
           ↓
User selects optional features → ToggleFeatures
           ↓
Form state stored in useTripForm hook
```

### **2. Form Submission → API**
```
TripForm.onSubmit()
  ↓
Validate form state (useTripForm.validate())
  ↓
Call generateTrip() (useTrip hook)
  ↓
Build prompt (buildPrompt from lib/prompt.ts)
  ↓
POST to /api/generate
  ↓
API validates request
  ↓
Call Gemini API or return mock data
  ↓
Parse & validate response
  ↓
Update itinerary state
```

### **3. Itinerary Display**
```
ItineraryDisplay receives Itinerary object
  ↓
Maps over days array
  ↓
DayCard renders each day (collapsible)
  ↓
ActivityCard renders activities with anti-notes
  ↓
EateryCard renders restaurants
  ↓
LocalEventBadge renders events
  ↓
TripMap renders SVG visualization
```

---

## 🎯 Core Features Explained

### **1. Emotion Engine (8 Moods)**
- **Built in**: MoodSelector component + constants.ts
- **How it works**: Each mood has emoji, label, hint, and pacing guidelines
- **AI Integration**: Mood ID + optional text passed to `buildPrompt()`
- **Impact**: Shapes activity types, pacing, and recommendations

### **2. Anti-Tourist Mode**
- **Toggle**: ToggleFeatures component (`antiTourist` state)
- **In Prompt**: If enabled, instruction tells AI to skip mainstream sites
- **Display**: ActivityCard shows `anti_note` field explaining local preference
- **Example**: Instead of "Taj Mahal" → "Local markets in Agra suburbs"

### **3. Live Disruption Rerouter**
- **Disruptions Defined**: DISRUPTIONS constant (monsoon, bandh, heat, etc)
- **Toggle**: liveDisruptions flag in form
- **Output**: Each day gets `disruption_note` field
- **Display**: DisruptionAlert component shows red banner with warning

### **4. Local Event Injection**
- **Configuration**: localEvents toggle in form
- **AI Output**: Days include `local_events` array
- **Display**: LocalEventBadge components with emoji (🎪 mela, 🎵 music, etc)

### **5. Top-Rated Local Eateries**
- **Toggle**: showEateries flag in form
- **Output**: Each day has `eateries` array (exactly 2 per day)
- **Fields**: name, type (dhaba/street_food/thali/chai/cafe), specialty, rating (4.0-5.0), neighbourhood
- **Display**: EateryCard with teal background, rating stars

### **6. Visual Trip Map**
- **Data**: `map_stops` array per day with x,y coordinates
- **Visualization**: SVG with activity circles (coral) & restaurant squares (teal)
- **Interactions**: Dashed lines show walking routes, hover animations
- **Responsive**: Scales to container, legend shows stop counts

---

## 🔐 Security & Validation

### **Form Validation** (lib/utils/validation.ts)
- ✅ City selected (required)
- ✅ Mood selected (required)
- ✅ Duration 1-30 days
- ✅ Budget ₹2,000-₹80,000
- ✅ Travel style defined
- ✅ Custom mood text max 500 chars

### **API Validation** (src/app/api/generate/route.ts)
- ✅ Parse JSON safely with error handling
- ✅ Validate all required fields
- ✅ Type-check numeric fields
- ✅ Check API key presence
- ✅ Extract JSON from markdown code blocks
- ✅ Validate response contains required itinerary fields
- ✅ Fallback to mock data on any error

### **Input Sanitization**
- Removes angle brackets (`<>`)
- Trims whitespace
- Limits length
- Prevents XSS attacks

---

## 📊 Component Communication

### **Props Drilling Strategy**
- ✅ Minimal props at each level
- ✅ Hooks handle state (no prop drilling)
- ✅ Context not needed (simple app)
- ✅ Callbacks for events (onSelectCity, etc)

### **State Management Hierarchy**
```
App.tsx (top level)
├── useTrip() - manages itinerary state
│   ├── isLoading
│   ├── itinerary
│   ├── error
│   └── generateTrip()
│
└── useTripForm() - manages form state
    ├── form (FormState object)
    ├── errors (validation messages)
    └── methods (selectCity, setBudget, etc)
```

---

## 🎨 UI/UX Design System

### **Color Palette**
- **Primary**: Indigo (`#4f46e5`) - actions, highlights
- **Secondary**: Blue (`#3b82f6`) - accent gradient
- **Success**: Emerald - badges, confirmations
- **Warning**: Amber - alerts, cautions
- **Danger**: Red - errors, disruptions
- **Neutral**: Gray - backgrounds, text, borders
- **Background**: White (`#ffffff`) - clean, minimalist

### **Typography**
- **Font**: Inter (system font as fallback)
- **H1**: 36px / 44px (home hero)
- **H2**: 30px / 36px (section titles)
- **H3**: 20px / 28px (card titles)
- **Body**: 16px / 24px (paragraphs)
- **Small**: 14px / 20px (labels, hints)

### **Spacing**
- **Padding**: 4px, 8px, 12px, 16px, 24px, 32px, 40px
- **Margins**: Same as padding
- **Gap**: 8px, 12px, 16px, 24px

### **Shadows**
- **sm**: `0 1px 2px rgba(0,0,0,0.05)` - subtle
- **md**: `0 4px 6px rgba(0,0,0,0.1)` - normal
- **lg**: `0 10px 15px rgba(0,0,0,0.1)` - hover

### **Animations**
- **Fade In**: 300ms ease-in-out
- **Slide In**: 300ms ease-out
- **Scale**: 150-300ms
- **Stagger**: 50-100ms between children

---

## 📱 Responsive Design Breakpoints

```
xs: 320px   (mobile)
sm: 640px   (landscape mobile)
md: 768px   (tablet)
lg: 1024px  (desktop)
xl: 1280px  (large desktop)
2xl: 1536px (ultra-wide)
```

**Strategy**: Mobile-first, grid adjusts from 1→2→3→4 columns

---

## 🧪 Testing Strategy

### **Unit Tests** (components in isolation)
- CityPicker: selection, visual feedback
- MoodSelector: mood & custom text
- BudgetSlider: value bounds, formatting
- ActivityCard: anti-note display
- EateryCard: rating display

### **Integration Tests** (component flows)
- Form submission → API call → Display
- Error handling → mock data fallback
- Feature toggles affect prompt & output

### **E2E Tests**
- User journey: select city → mood → submit → view itinerary
- Disruption toggle → alert display
- Map rendering with coordinates

---

## 🚀 Deployment & Performance

### **Build Optimization**
- ✅ Tree-shaking unused code
- ✅ Code splitting by route
- ✅ Dynamic imports for heavy components
- ✅ Image optimization
- ✅ CSS minification

### **Runtime Performance**
- ✅ Memoized components (no unnecessary re-renders)
- ✅ Lazy loading images
- ✅ Debounced API calls
- ✅ Optimized animations (GPU-accelerated)
- ✅ Viewport-based rendering

### **Accessibility**
- ✅ Semantic HTML
- ✅ ARIA labels on form inputs
- ✅ Keyboard navigation support
- ✅ Color contrast > 4.5:1 (WCAG AA)
- ✅ Focus indicators visible
- ✅ Screen reader friendly

---

## 📖 API Documentation

### **POST /api/generate**

**Request:**
```json
{
  "city": "delhi",
  "mood": "adventurous",
  "moodText": "Love trying risky street food",
  "duration": 5,
  "budget": 25000,
  "style": "Solo",
  "antiTourist": true,
  "liveDisruptions": true,
  "localEvents": true,
  "showEateries": true,
  "activeDisruption": "monsoon"
}
```

**Success Response (200):**
```json
{
  "destination": "Delhi",
  "city": "delhi",
  "duration": 5,
  "budget": 25000,
  "mood": "adventurous",
  "style": "Solo",
  "days": [
    {
      "day": 1,
      "title": "Arrival & Local Chaos",
      "focus": "Land, crash, embrace the madness",
      "activities": [...],
      "eateries": [...],
      "local_events": [...],
      "disruption_note": "...",
      "map_stops": [...]
    }
  ]
}
```

**Error Response (400/500):**
```json
{
  "error": "Description of what went wrong",
  "status": 400,
  "details": "Additional context"
}
```

---

## 🔧 Configuration

### **Environment Variables**
```bash
GEMINI_API_KEY=your_key_here  # Required for real AI
```

### **Feature Flags**
- All features are user-controlled toggles
- No backend feature flags needed yet

---

## 📚 Development Workflow

### **1. Adding a New Feature**
1. Define types in `lib/types.ts`
2. Add constants in `lib/constants.ts`
3. Create component in `components/`
4. Add form state in `useTripForm()`
5. Update prompt builder in `lib/prompt.ts`
6. Test form → API → display flow

### **2. Modifying AI Prompt**
1. Edit `buildPrompt()` in `lib/prompt.ts`
2. Update `GeneratePayload` type if needed
3. Test with mock data
4. Verify JSON structure in response

### **3. Styling Changes**
1. Modify component JSX (Tailwind classes)
2. Add global styles in `globals.css`
3. Test responsive breakpoints
4. Check accessibility contrast

---

## 🎓 Learning Resources

### **Technology Stack**
- **Next.js 15**: App Router, Server/Client Components
- **React 19**: Hooks, Concurrent Features
- **TypeScript 5**: Strict mode, generics
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Production animation library
- **Lucide React**: Icon library (170+ icons)
- **Google Gemini API**: LLM integration

### **Key Concepts**
- Custom hooks for state management
- Client vs Server components
- Type-driven development
- API route handlers
- Error boundaries & fallbacks
- Responsive design patterns
- Accessibility standards

---

## 🐛 Debugging Tips

### **Common Issues**
1. **Blank itinerary**: Check mock.ts returns valid structure
2. **Form not submitting**: Validate form state in useTripForm()
3. **API timeout**: Increase timeout or use mock data
4. **Map not rendering**: Check map_stops array exists & has coordinates
5. **Styling issues**: Verify Tailwind classes apply correctly

### **Debugging Tools**
- React DevTools (component tree inspection)
- Network tab (API requests/responses)
- Console logs (validation errors)
- Browser accessibility inspector

---

## 📝 Code Quality Standards

### **Followed**
- ✅ ESLint config from Next.js
- ✅ Prettier formatting (semicolons, brackets)
- ✅ Type safety (strict TypeScript)
- ✅ No `any` types
- ✅ Comments on complex logic
- ✅ Meaningful variable names
- ✅ DRY principle (no duplication)
- ✅ SOLID principles (Single Responsibility)

### **File Size Targets**
- Components: < 400 lines
- Hooks: < 200 lines  
- Utils: < 150 lines
- Types: Concise, self-documenting

---

## 🎊 Summary

This implementation provides a **production-ready, fully-featured** India travel planning assistant with:

- ✅ **Modern UI**: Clean white theme, smooth animations, responsive
- ✅ **Type-safe**: Full TypeScript, no runtime surprises
- ✅ **Scalable**: Modular components, easy to extend
- ✅ **Accessible**: WCAG 2.1 compliant, keyboard navigation
- ✅ **Resilient**: Error handling, mock data fallback
- ✅ **Performant**: Optimized rendering, animations
- ✅ **Developer-friendly**: Well-documented, clear architecture

Deploy with confidence! 🚀
