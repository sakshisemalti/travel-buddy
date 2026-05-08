import type { FormState, ValidationResult, ValidationError } from '../types';
import { BUDGET_MIN, BUDGET_MAX, DURATION_MIN, DURATION_MAX } from '../constants';

/**
 * Validates the entire form state
 */
export function validateFormState(form: FormState): ValidationResult {
  const errors: ValidationError[] = [];

  if (!form.city) {
    errors.push({ field: 'city', message: 'Please select a city' });
  }

  if (!form.mood) {
    errors.push({ field: 'mood', message: 'Please select a mood' });
  }

  if (form.duration < DURATION_MIN || form.duration > DURATION_MAX) {
    errors.push({
      field: 'duration',
      message: `Duration must be between ${DURATION_MIN} and ${DURATION_MAX} days`,
    });
  }

  if (form.budget < BUDGET_MIN || form.budget > BUDGET_MAX) {
    errors.push({
      field: 'budget',
      message: `Budget must be between ₹${BUDGET_MIN} and ₹${BUDGET_MAX}`,
    });
  }

  if (!form.style) {
    errors.push({ field: 'style', message: 'Please select a travel style' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates individual form fields
 */
export function validateField(
  field: keyof FormState,
  value: unknown,
): ValidationError | null {
  switch (field) {
    case 'city':
      return !value ? { field, message: 'City is required' } : null;

    case 'mood':
      return !value ? { field, message: 'Mood is required' } : null;

    case 'duration':
      if (typeof value !== 'number') {
        return { field, message: 'Duration must be a number' };
      }
      if (value < DURATION_MIN || value > DURATION_MAX) {
        return {
          field,
          message: `Duration must be between ${DURATION_MIN} and ${DURATION_MAX}`,
        };
      }
      return null;

    case 'budget':
      if (typeof value !== 'number') {
        return { field, message: 'Budget must be a number' };
      }
      if (value < BUDGET_MIN || value > BUDGET_MAX) {
        return {
          field,
          message: `Budget must be between ₹${BUDGET_MIN} and ₹${BUDGET_MAX}`,
        };
      }
      return null;

    case 'style':
      return !value ? { field, message: 'Travel style is required' } : null;

    case 'moodText':
      if (typeof value === 'string' && value.length > 500) {
        return { field, message: 'Mood description is too long (max 500 chars)' };
      }
      return null;

    default:
      return null;
  }
}

/**
 * Sanitizes string input to prevent XSS
 */
export function sanitizeString(input: string, maxLength = 500): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Remove angle brackets
}

/**
 * Checks if the API response has valid JSON structure
 */
export function isValidJSON(text: string): boolean {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extracts JSON from text that might contain markdown code blocks
 */
export function extractJSONFromText(text: string): string {
  // Try to find JSON within markdown code blocks
  const jsonBlockMatch = text.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
  if (jsonBlockMatch && jsonBlockMatch[1]) {
    return jsonBlockMatch[1].trim();
  }

  // If no code block, return original text
  return text.trim();
}
