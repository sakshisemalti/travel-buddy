import type { BUDGET_MIN, BUDGET_MAX, ICON_MAP } from '../constants';
import { ICON_MAP as iconMap } from '../constants';

/**
 * Formats a number as Indian currency (₹)
 */
export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats budget range for display
 */
export function formatBudgetRange(min: number, max: number): string {
  return `₹${min.toLocaleString('en-IN')} - ₹${max.toLocaleString('en-IN')}`;
}

/**
 * Gets emoji for an activity icon
 */
export function getActivityEmoji(icon: string): string {
  return iconMap[icon] || iconMap['default'] || '📍';
}

/**
 * Capitalizes first letter of string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts kebab-case to Title Case
 */
export function kebabToTitleCase(str: string): string {
  return str
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Gets rating stars display
 */
export function getRatingStars(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    '⭐'.repeat(fullStars) + (hasHalf ? '✨' : '') + '☆'.repeat(emptyStars)
  );
}

/**
 * Formats date to readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Gets initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Truncates text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Generates a random ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Sleep for a given duration (for animations/delays)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Formats activity time to 12-hour format with AM/PM
 */
export function formatActivityTime(time: string): string {
  const times: Record<string, string> = {
    'Morning': '🌅 Morning (6AM-12PM)',
    'Afternoon': '☀️ Afternoon (12PM-5PM)',
    'Evening': '🌆 Evening (5PM-8PM)',
    'Night': '🌙 Night (8PM+)',
  };
  return times[time] || time;
}

/**
 * Gets neighborhood from description (if mentioned)
 */
export function extractNeighborhood(description: string): string | null {
  // This is a basic extraction - in production, use NLP
  const neighborhoods = ['Hauz Khas', 'Connaught Place', 'Chandni Chowk', 'Saket'];
  for (const neighborhood of neighborhoods) {
    if (description.includes(neighborhood)) {
      return neighborhood;
    }
  }
  return null;
}
