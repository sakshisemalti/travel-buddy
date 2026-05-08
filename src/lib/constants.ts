import type { City, Mood, DisruptionConfig } from './types';

// ============================================================================
// CITIES - 8 Indian cities with rich metadata
// ============================================================================
export const CITIES: City[] = [
  {
    id: 'delhi',
    name: 'Delhi',
    tagline: 'History & Chaos',
    description: 'Ancient monuments, bustling bazaars, and modern vibrancy meet in India\'s capital',
    emoji: '🏛️',
    bg: 'bg-orange-50',
    accent: 'text-orange-700',
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    tagline: 'Dreams & Sea',
    description: 'Bollywood glamour, Gateway of India, and cosmopolitan energy by the Arabian Sea',
    emoji: '🌊',
    bg: 'bg-blue-50',
    accent: 'text-blue-700',
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    tagline: 'Pink City Magic',
    description: 'Pink-painted streets, majestic palaces, and desert landscapes of Rajasthan',
    emoji: '🏰',
    bg: 'bg-pink-50',
    accent: 'text-pink-700',
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    tagline: 'Soul & Ghats',
    description: 'Spiritual epicenter with sacred ghats, ancient temples, and the holy Ganges',
    emoji: '🪔',
    bg: 'bg-amber-50',
    accent: 'text-amber-700',
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    tagline: 'Garden City',
    description: 'Tech hub with lush gardens, pleasant weather, and thriving coffee culture',
    emoji: '🌿',
    bg: 'bg-emerald-50',
    accent: 'text-emerald-700',
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    tagline: 'Art & Intellect',
    description: 'Cultural capital with literature, art, colonial architecture, and unique charm',
    emoji: '🎨',
    bg: 'bg-yellow-50',
    accent: 'text-yellow-700',
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    tagline: 'Lakes & Palaces',
    description: 'Romantic lake city with majestic palaces, sunset views, and royal heritage',
    emoji: '🏯',
    bg: 'bg-violet-50',
    accent: 'text-violet-700',
  },
  {
    id: 'chennai',
    name: 'Chennai',
    tagline: 'Temples & Coast',
    description: 'Ancient temple city on the Coromandel coast with traditional Dravidian culture',
    emoji: '🌴',
    bg: 'bg-teal-50',
    accent: 'text-teal-700',
  },
];

// ============================================================================
// MOODS - 8 travel moods with personality
// ============================================================================
export const MOODS: Mood[] = [
  {
    id: 'burnt_out',
    label: 'Burnt Out',
    emoji: '😮‍💨',
    hint: 'Slow down & restore',
  },
  {
    id: 'adventurous',
    label: 'Adventurous',
    emoji: '⚡',
    hint: 'Push limits, embrace chaos',
  },
  {
    id: 'spiritual',
    label: 'Spiritual',
    emoji: '🙏',
    hint: 'Seek meaning & stillness',
  },
  {
    id: 'food_obsessed',
    label: 'Food Obsessed',
    emoji: '🍛',
    hint: 'Eat everything, regret nothing',
  },
  {
    id: 'romantic',
    label: 'Romantic',
    emoji: '💕',
    hint: 'Slow evenings, beautiful places',
  },
  {
    id: 'lost_drifting',
    label: 'Lost & Drifting',
    emoji: '🌫️',
    hint: 'No plan, just wander',
  },
  {
    id: 'curious',
    label: 'Curious',
    emoji: '🔍',
    hint: 'Learn, explore, question',
  },
  {
    id: 'wild_free',
    label: 'Wild & Free',
    emoji: '🦅',
    hint: 'Untamed, off-road, unfiltered',
  },
];

// ============================================================================
// DISRUPTIONS - India-specific real-world challenges
// ============================================================================
export const DISRUPTIONS: DisruptionConfig[] = [
  {
    type: 'monsoon',
    label: 'Monsoon Flooding',
    emoji: '🌧️',
    description: 'Heavy rain has flooded lower areas and transport routes.',
  },
  {
    type: 'bandh',
    label: 'Bandh / Hartal',
    emoji: '🚫',
    description: 'City-wide shutdown — shops and transport are closed.',
  },
  {
    type: 'heat',
    label: 'Extreme Heat 45°C+',
    emoji: '🔥',
    description: 'Heat advisory — outdoor activities are unsafe midday.',
  },
  {
    type: 'temple_closed',
    label: 'Site Closed',
    emoji: '⛩️',
    description: 'Main religious site closed for festival preparation.',
  },
  {
    type: 'train_delay',
    label: 'Train Delayed',
    emoji: '🚂',
    description: 'Major delays affecting all inter-city rail connections.',
  },
];

// ============================================================================
// ICON MAPPING - Emoji representations for activity icons
// ============================================================================
export const ICON_MAP: Record<string, string> = {
  flight: '✈️',
  walk: '🚶',
  food: '🍽️',
  train: '🚆',
  nature: '🌳',
  mountain: '⛰️',
  relax: '♨️',
  temple: '⛩️',
  shop: '🛍️',
  art: '🎨',
  boat: '⛴️',
  star: '⭐',
  building: '🏢',
  coffee: '☕',
  music: '🎵',
  camera: '📸',
  default: '📍',
};

// ============================================================================
// BUDGET CONFIGURATION - INR range for slider
// ============================================================================
export const BUDGET_MIN = 2000;
export const BUDGET_MAX = 80000;
export const BUDGET_DEFAULT = 15000;
export const BUDGET_STEP = 1000;

// Duration ranges
export const DURATION_MIN = 1;
export const DURATION_MAX = 30;
export const DURATION_DEFAULT = 5;

// Feature descriptions
export const FEATURE_DESCRIPTIONS = {
  antiTourist: 'Skip mainstream spots, find hyper-local gems only',
  liveDisruptions: 'Get alerts for monsoons, bandhs, heat waves & disruptions',
  localEvents: 'Discover melas, sabzi mandis, music sabhas & festivals',
  showEateries: 'Find authentic dhabas, street food & local restaurants',
} as const;

// ============================================================================
// UI CONSTANTS
// ============================================================================
export const LOADING_MESSAGES = [
  '✨ Crafting your perfect itinerary...',
  '🗺️ Mapping out hidden gems...',
  '🎭 Tuning into your mood...',
  '🧳 Packing in local wisdom...',
  '⚡ Adding anti-tourist gems...',
  '🍛 Hunting down the best dhabas...',
  '🎨 Sketching your journey...',
];

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 800,
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-index scale
export const Z_INDEX = {
  hidden: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modal: 1300,
  tooltip: 1400,
  notification: 1500,
} as const;
