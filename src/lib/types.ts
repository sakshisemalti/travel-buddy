// ============================================================================
// TYPE DEFINITIONS - Complete type safety for the entire application
// ============================================================================

// Travel-related types
export type CityId = 'delhi' | 'mumbai' | 'jaipur' | 'varanasi' | 'bengaluru' | 'kolkata' | 'udaipur' | 'chennai';
export type MoodId = 'burnt_out' | 'adventurous' | 'spiritual' | 'food_obsessed' | 'romantic' | 'lost_drifting' | 'curious' | 'wild_free';
export type TravelStyle = 'Solo' | 'Couple' | 'Family' | 'Group';
export type DisruptionType = 'monsoon' | 'bandh' | 'heat' | 'temple_closed' | 'train_delay';
export type EateryType = 'dhaba' | 'street_food' | 'thali' | 'chai_stall' | 'cafe';

// Configuration interfaces
export interface City {
  id: CityId;
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  bg: string;
  accent: string;
}

export interface Mood {
  id: MoodId;
  label: string;
  emoji: string;
  hint: string;
}

export interface DisruptionConfig {
  type: DisruptionType;
  label: string;
  emoji: string;
  description: string;
}

// Itinerary content types
export interface MapStop {
  id: string;
  name: string;
  type: 'activity' | 'restaurant';
  lat: number;
  lng: number;
  x?: number; // legacy SVG coord
  y?: number; // legacy SVG coord
}

export interface LocalEvent {
  name: string;
  type: string;
  time: string;
  description: string;
}

export interface Eatery {
  name: string;
  type: EateryType;
  specialty: string;
  rating: number;
  neighbourhood: string;
}

export interface Activity {
  time: string;
  icon: string;
  title: string;
  description: string;
  anti_note?: string;
  is_local_event?: boolean;
}

export interface Day {
  day: number;
  title: string;
  focus: string;
  activities: Activity[];
  eateries?: Eatery[];
  local_events?: LocalEvent[];
  disruption_note?: string;
  map_stops?: MapStop[];
}

export interface Itinerary {
  destination: string;
  city: CityId;
  duration: number;
  budget: number;
  mood: MoodId;
  style: TravelStyle;
  days: Day[];
}

// Form-related types
export interface FormState {
  city: CityId | null;
  mood: MoodId | null;
  moodText: string;
  duration: number;
  budget: number;
  style: TravelStyle;
  antiTourist: boolean;
  liveDisruptions: boolean;
  localEvents: boolean;
  showEateries: boolean;
}

export interface GeneratePayload extends FormState {
  activeDisruption?: string;
}

// API response types
export interface GenerateResponse {
  destination: string;
  city: CityId;
  duration: number;
  budget: number;
  mood: MoodId;
  style: TravelStyle;
  days: Day[];
}

export interface ApiError {
  error: string;
  status?: number;
  details?: string;
}

// UI state types
export interface LoadingState {
  isLoading: boolean;
  progress?: number;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

// Validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}
