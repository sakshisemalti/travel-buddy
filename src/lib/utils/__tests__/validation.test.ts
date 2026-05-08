import { describe, it, expect } from 'vitest';
import {
  validateFormState,
  validateField,
  sanitizeString,
  isValidJSON,
  extractJSONFromText,
} from '../validation';
import type { FormState } from '../../types';

describe('validation utils', () => {
  describe('validateFormState', () => {
    it('should pass validation for valid form', () => {
      const form: FormState = {
        city: 'delhi',
        mood: 'adventurous',
        moodText: '',
        duration: 5,
        budget: 15000,
        style: 'Solo',
        antiTourist: false,
        liveDisruptions: false,
        localEvents: false,
        showEateries: true,
      };
      const result = validateFormState(form);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail when city is missing', () => {
      const form: FormState = {
        city: null,
        mood: 'adventurous',
        moodText: '',
        duration: 5,
        budget: 15000,
        style: 'Solo',
        antiTourist: false,
        liveDisruptions: false,
        localEvents: false,
        showEateries: true,
      };
      const result = validateFormState(form);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({ field: 'city', message: 'Please select a city' });
    });

    it('should fail when duration is out of range', () => {
      const form: FormState = {
        city: 'delhi',
        mood: 'adventurous',
        moodText: '',
        duration: 50,
        budget: 15000,
        style: 'Solo',
        antiTourist: false,
        liveDisruptions: false,
        localEvents: false,
        showEateries: true,
      };
      const result = validateFormState(form);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.field === 'duration')).toBe(true);
    });
  });

  describe('sanitizeString', () => {
    it('should remove angle brackets', () => {
      expect(sanitizeString('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
    });

    it('should trim whitespace', () => {
      expect(sanitizeString('  hello  ')).toBe('hello');
    });

    it('should limit length', () => {
      const long = 'a'.repeat(600);
      expect(sanitizeString(long, 500)).toHaveLength(500);
    });
  });

  describe('isValidJSON', () => {
    it('should return true for valid JSON', () => {
      expect(isValidJSON('{"key": "value"}')).toBe(true);
    });

    it('should return false for invalid JSON', () => {
      expect(isValidJSON('{key: value}')).toBe(false);
    });
  });

  describe('extractJSONFromText', () => {
    it('should extract JSON from markdown code block', () => {
      const text = '```json\n{"key": "value"}\n```';
      expect(extractJSONFromText(text)).toBe('{"key": "value"}');
    });

    it('should return original text if no code block', () => {
      const text = '{"key": "value"}';
      expect(extractJSONFromText(text)).toBe('{"key": "value"}');
    });
  });
});
