import { describe, it, expect } from 'vitest';
import { buildMockItinerary } from '../mock';

describe('buildMockItinerary', () => {
  it('should return correct structure', () => {
    const result = buildMockItinerary({
      city: 'delhi',
      mood: 'adventurous',
      duration: 3,
      budget: 15000,
      style: 'Solo',
    });

    expect(result).toHaveProperty('destination');
    expect(result).toHaveProperty('city', 'delhi');
    expect(result).toHaveProperty('duration', 3);
    expect(result).toHaveProperty('budget', 15000);
    expect(result).toHaveProperty('days');
    expect(result.days).toHaveLength(3);
  });

  it('should generate correct number of days', () => {
    const result = buildMockItinerary({
      city: 'mumbai',
      mood: 'food_obsessed',
      duration: 7,
      budget: 20000,
      style: 'Couple',
    });
    expect(result.days).toHaveLength(7);
  });

  it('should have unique day titles for first 4 days (Delhi)', () => {
    const result = buildMockItinerary({
      city: 'delhi',
      mood: 'curious',
      duration: 4,
      budget: 10000,
      style: 'Solo',
    });
    const titles = result.days.map(d => d.title);
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(4);
  });

  it('should include map_stops with lat/lng for each day', () => {
    const result = buildMockItinerary({
      city: 'delhi',
      mood: 'adventurous',
      duration: 2,
      budget: 15000,
      style: 'Solo',
    });
    result.days.forEach(day => {
      expect(day.map_stops).toBeDefined();
      expect(day.map_stops!.length).toBeGreaterThan(0);
      day.map_stops!.forEach(stop => {
        expect(stop).toHaveProperty('lat');
        expect(stop).toHaveProperty('lng');
        expect(typeof stop.lat).toBe('number');
        expect(typeof stop.lng).toBe('number');
      });
    });
  });

  it('should include eateries for each day', () => {
    const result = buildMockItinerary({
      city: 'delhi',
      mood: 'food_obsessed',
      duration: 2,
      budget: 15000,
      style: 'Solo',
    });
    result.days.forEach(day => {
      expect(day.eateries).toBeDefined();
      expect(day.eateries!.length).toBeGreaterThan(0);
    });
  });

  it('should fallback to delhi for null city', () => {
    const result = buildMockItinerary({
      city: null,
      mood: null,
      duration: 1,
      budget: 5000,
      style: 'Solo',
    });
    expect(result.city).toBe('delhi');
  });

  it('should handle all 8 cities', () => {
    const cities = ['delhi', 'mumbai', 'jaipur', 'varanasi', 'bengaluru', 'kolkata', 'udaipur', 'chennai'] as const;
    cities.forEach(city => {
      const result = buildMockItinerary({ city, mood: 'curious', duration: 2, budget: 10000, style: 'Solo' });
      expect(result.days).toHaveLength(2);
    });
  });
});
