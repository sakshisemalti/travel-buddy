# 🚀 Quick Start & Deployment Guide

## 📋 Prerequisites

- **Node.js**: 18+ (install from nodejs.org)
- **npm** or **yarn** (typically bundled)
- **Gemini API Key** (optional, uses mock data without it)

## ⚡ Quick Setup

### **1. Install Dependencies**
```bash
cd travel-planning
npm install
# or
yarn install
```

### **2. Environment Setup**

Create `.env.local` in project root:
```bash
# Optional: Get from https://ai.google.dev/
GEMINI_API_KEY=your_api_key_here_or_leave_empty_for_mock
```

(The app works perfectly with mock data if you skip this)

### **3. Run Development Server**
```bash
npm run dev
# or
yarn dev
```

Open **http://localhost:3000** in browser

### **4. Build for Production**
```bash
npm run build
npm start
```

---

## 🎯 Project Structure Quick Reference

```
src/
├── app/                    # Next.js app
│   └── api/generate/      # AI endpoint
├── components/             # React components
│   ├── form/              # Input components
│   ├── itinerary/         # Output display
│   └── map/               # Map visualization
├── lib/                    # Business logic
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── constants.ts       # Config data
└── App.jsx                # Main component
```

---

## 🎨 How to Customize

### **Change Cities**
Edit `src/lib/constants.ts`:
```javascript
export const CITIES = [
  { id: 'new-city', name: 'New City', tagline: '...', emoji: '🏘️', ... },
  // Add more cities here
];
```

### **Add More Moods**
```javascript
export const MOODS = [
  { id: 'new_mood', label: 'New Mood', emoji: '✨', hint: 'description' },
  // Add more moods
];
```

### **Change Colors/Styling**
- Edit `src/app/globals.css` for global styles
- Use Tailwind classes in components (they auto-apply)

### **Modify AI Prompt**
Edit `src/lib/prompt.ts` → `buildPrompt()` function

### **Update Mock Data**
Edit `src/lib/mock.ts` for fallback data

---

## 🔐 Deployment Options

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set env var in Vercel dashboard
# GEMINI_API_KEY = your_key
```

### **Docker**
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

```bash
# Build & run
docker build -t wanderlust-ai .
docker run -p 3000:3000 wanderlust-ai
```

### **Traditional Server (AWS/GCP/Azure)**
```bash
# Build
npm run build

# Transfer `next` folder & `package.json` to server
# Install on server
npm install --production

# Run on port 3000
npm start
```

---

## 🧪 Testing

### **Run ESLint**
```bash
npm run lint
```

### **Manual Testing Checklist**
- [ ] Fill form with all fields
- [ ] Try each city/mood combo
- [ ] Toggle each feature
- [ ] Submit → check console for errors
- [ ] Verify itinerary displays
- [ ] Expand day cards
- [ ] Check mobile display

### **Sample Test Data**
```json
{
  "city": "delhi",
  "mood": "food_obsessed",
  "duration": 3,
  "budget": 20000,
  "style": "Solo",
  "antiTourist": true,
  "liveDisruptions": true,
  "localEvents": true,
  "showEateries": true
}
```

---

## 🐛 Common Issues & Fixes

### **Issue: Blank Page**
- Check browser console for errors
- Verify API key in `.env.local`
- Check if `npm run dev` is running

### **Issue: API Returns 500**
- Check `.env.local` has valid key
- Verify network request in DevTools
- Check server logs: `npm run dev` output

### **Issue: Styling Looks Wrong**
- Clear Tailwind cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check Tailwind config in `tailwind.config.ts`

### **Issue: Components Not Rendering**
- Verify component imports use correct path
- Check file names match imports
- Ensure all files are `.tsx` or `.ts`

---

## 📊 Monitoring & Analytics

### **Add to Google Analytics** (future enhancement)
```javascript
// In app layout
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### **Log API Calls**
Already included in `src/app/api/generate/route.ts`:
```javascript
console.info('[WanderLust] API call received');
console.error('[WanderLust] Error:', err);
```

---

## 🔄 CI/CD Pipeline Example

### **GitHub Actions** (.github/workflows/deploy.yml)
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📱 Mobile Optimization

App is already mobile-responsive! Tested breakpoints:
- ✅ 320px (iPhone SE)
- ✅ 640px (Landscape smartphone)
- ✅ 768px (Tablet)
- ✅ 1024px+ (Desktop)

---

## 🎨 Design System

### **Color Tokens** (in globals.css)
```css
:root {
  --color-primary: #4f46e5;        /* Indigo */
  --color-primary-light: #e0e7ff;  /* Light indigo */
}
```

### **Component Classes**
```css
.btn-primary    /* Blue gradient button */
.btn-ghost      /* Text-only button */
.card           /* White card with shadow */
.badge-success  /* Green success badge */
```

---

## 📚 Learning Outcomes

After working with this code, you'll understand:

- ✅ **Next.js**: App Router, API routes, server/client components
- ✅ **React**: Custom hooks, state management patterns
- ✅ **TypeScript**: Type safety, interfaces, strict mode
- ✅ **Tailwind**: Utility-first CSS, responsive design
- ✅ **Framer Motion**: Animations and transitions
- ✅ **API Design**: Request validation, error handling
- ✅ **LLM Integration**: Prompt engineering, JSON responses
- ✅ **Accessibility**: WCAG compliance, semantic HTML

---

## 🤝 Contributing

To add features:

1. **Create branch**: `git checkout -b feature/your-feature`
2. **Make changes**: Edit components, add types
3. **Test locally**: `npm run dev`
4. **Lint**: `npm run lint`
5. **Commit**: `git commit -m "Add feature: description"`
6. **Push**: `git push origin feature/your-feature`
7. **PR**: Open pull request with description

---

## 📞 Support & Resources

### **Documentation**
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design & data flow
- [FEATURES.md](./FEATURES.md) - Feature implementations
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### **External APIs**
- [Google Gemini API](https://ai.google.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

## 🎬 Demo Walkthrough

### **Scenario: Plan a 5-day Delhi trip**

1. **Page loads**: Hero section + form appears
2. **Select city**: Click "Delhi" tile (🏛️)
3. **Select mood**: Click "Food Obsessed" (🍛)
4. **Add custom vibe**: Type "Love trying risky street food"
5. **Set duration**: Drag slider to 5 days
6. **Set budget**: Set ₹25,000
7. **Select style**: Click "Solo"
8. **Enable features**: Toggle all ON
9. **Generate**: Click "✨ Generate My Trip"
10. **Wait**: Loading animation + messages
11. **View**: Itinerary appears with:
    - Day 1-5 cards (expandable)
    - Activities with anti-notes
    - Restaurant recommendations
    - Local event badges
    - SVG maps
12. **Explore**: Click day to expand/collapse
13. **Create another**: Button to reset & start over

---

## 🚀 Deployment Checklist

Before going live:

- [ ] Test all form combinations
- [ ] Verify API responses format
- [ ] Check mobile responsiveness 
- [ ] Test error states
- [ ] Validate accessibility
- [ ] Set `GEMINI_API_KEY` in production
- [ ] Configure domain/SSL
- [ ] Set up monitoring/logging
- [ ] Create backup strategy
- [ ] Document admin procedures
- [ ] Plan scaling strategy
- [ ] Setup CDN for images (if added)

---

## 🎓 Next Steps

### **Short-term** (1-2 weeks)
- [ ] User feedback on feature usefulness
- [ ] Performance optimization
- [ ] A/B testing on feature toggles
- [ ] Analytics integration

### **Medium-term** (1-2 months)
- [ ] User accounts & saved trips
- [ ] Social sharing (Discord, Twitter sharing)
- [ ] API documentation for mobile apps
- [ ] Second language support (Hindi)

### **Long-term** (3-6 months)
- [ ] Real data integration (Google Places, etc)
- [ ] Multi-city trips
- [ ] Collaborative planning
- [ ] Offline mode (PWA)
- [ ] Advanced matching (dietary, accessibility)

---

## 💡 Pro Tips

1. **Faster Development**: Use `npm run dev` with open DevTools
2. **Type Checking**: Install ESLint extension for VS Code
3. **Mock Testing**: Remove API key to test safe paths
4. **Component Preview**: Create Storybook setup
5. **Debugging**: Use React DevTools extension
6. **Performance**: Check Network tab for slow requests

---

## 🎉 You're Ready!

The app is **production-ready** and **fully deployable**. 

Start with:
```bash
npm install && npm run dev
```

Then open http://localhost:3000 and start exploring! 🚀

Questions? Check ARCHITECTURE.md or FEATURES.md for detailed info.

Happy building! ✨
