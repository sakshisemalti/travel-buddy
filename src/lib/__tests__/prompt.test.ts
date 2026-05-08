import { describe, it, expect } from 'vitest';
import { buildPrompt, validateItineraryResponse, sanitizeInput } from '../prompt';
import type { GeneratePayload } from '../types';

const basePayload: GeneratePayload = {
  city: 'delhi',
  mood: 'adventurous',
  moodText: '',
  duration: 3,
  budget: 15000,
  style: 'Solo',
  antiTourist: false,
  liveDisruptions: false,
  localEvents: false,
  showEateries: false,
};

describe('buildPrompt', () => {
  it('should include city name in prompt', () => {
    const prompt = buildPrompt(basePayload);
    expect(prompt).toContain('Delhi');
  });

  it('should include duration in prompt', () => {
    const prompt = buildPrompt(basePayload);
    expect(prompt).toContain('3 days');
  });

  it('should include budget in prompt', () => {
    const prompt = buildPrompt(basePayload);
    expect(prompt).toContain('15,000');
  });

  it('should include anti-tourist rule when enabled', () => {
    const prompt = buildPrompt({ ...basePayload, antiTourist: true });
    expect(prompt).toContain('ANTI-TOURIST MODE');
  });

  it('should NOT include anti-tourist rule when disabled', () => {
    const prompt = buildPrompt({ ...basePayload, antiTourist: false });
    expect(prompt).not.toContain('ANTI-TOURIST MODE');
  });

  it('should include disruption rule when enabled', () => {
    const prompt = buildPrompt({ ...basePayload, liveDisruptions: true });
    expect(prompt).toContain('DISRUPTION AWARENESS');
  });

  it('should include eateries rule when enabled', () => {
    const prompt = buildPrompt({ ...basePayload, showEateries: true });
    expect(prompt).toContain('RESTAURANT RECOMMENDATIONS');
  });

  it('should include local events rule when enabled', () => {
    const prompt = buildPrompt({ ...basePayload, localEvents: true });
    expect(prompt).toContain('LOCAL EVENT INJECTION');
  });

  it('should include lat/lng instruction for map stops', () => {
    const prompt = buildPrompt(basePayload);
    expect(prompt).toContain('lat');
    expect(prompt).toContain('lng');
  });

  it('should include uniqueness rule', () => {
    const prompt = buildPrompt(basePayload);
    expect(prompt).toContain('CRITICAL UNIQUENESS RULE');
  });

  it('should include moodText when provided', () => {
    const prompt = buildPrompt({ ...basePayload, moodText: 'love street food' });
    expect(prompt).toContain('love street food');
  });
});

describe('validateItineraryResponse', () => {
  it('should return true for valid response', () => {
    const valid = {
      destination: 'Delhi',
      city: 'delhi',
      duration: 3,
      budget: 15000,
      mood: 'adventurous',
      style: 'Solo',
      days: [],
    };
    expect(validateItineraryResponse(valid)).toBe(true);
  });

  it('should return false for missing fields', () => {
    expect(validateItineraryResponse({ destination: 'Delhi' })).toBe(false);
  });

  it('should return false for null', () => {
    expect(validateItineraryResponse(null)).toBe(false);
  });

  it('should return false for non-object', () => {
    expect(validateItineraryResponse('string')).toBe(false);
  });
});

describe('sanitizeInput', () => {
  it('should remove angle brackets', () => {
    expect(sanitizeInput('<script>')).not.toContain('<');
  });

  it('should trim whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });

  it('should limit to 500 chars', () => {
    expect(sanitizeInput('a'.repeat(600))).toHaveLength(500);
  });
});
