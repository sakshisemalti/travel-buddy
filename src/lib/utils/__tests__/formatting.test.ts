import { describe, it, expect } from 'vitest';
import {
  formatIndianCurrency,
  getActivityEmoji,
  capitalize,
  kebabToTitleCase,
  getRatingStars,
  truncateText,
  generateId,
  formatActivityTime,
} from '../formatting';

describe('formatting utils', () => {
  describe('formatIndianCurrency', () => {
    it('should format number as INR', () => {
      const result = formatIndianCurrency(15000);
      expect(result).toContain('₹');
      expect(result).toContain('15');
    });

    it('should handle zero', () => {
      const result = formatIndianCurrency(0);
      expect(result).toContain('₹');
    });
  });

  describe('getActivityEmoji', () => {
    it('should return correct emoji for known icon', () => {
      expect(getActivityEmoji('walk')).toBe('🚶');
      expect(getActivityEmoji('food')).toBe('🍽️');
      expect(getActivityEmoji('temple')).toBe('⛩️');
    });

    it('should return default emoji for unknown icon', () => {
      expect(getActivityEmoji('unknown_icon')).toBe('📍');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('kebabToTitleCase', () => {
    it('should convert kebab-case to Title Case', () => {
      expect(kebabToTitleCase('hello-world')).toBe('Hello World');
    });

    it('should handle single word', () => {
      expect(kebabToTitleCase('hello')).toBe('Hello');
    });
  });

  describe('getRatingStars', () => {
    it('should return 5 stars for rating 5', () => {
      const result = getRatingStars(5);
      expect(result).toContain('⭐');
    });

    it('should include half star for decimal rating', () => {
      const result = getRatingStars(4.5);
      expect(result).toContain('✨');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const result = truncateText('Hello World', 8);
      expect(result).toBe('Hello...');
      expect(result.length).toBe(8);
    });

    it('should not truncate short text', () => {
      expect(truncateText('Hi', 10)).toBe('Hi');
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('should return a string', () => {
      expect(typeof generateId()).toBe('string');
    });
  });

  describe('formatActivityTime', () => {
    it('should format Morning correctly', () => {
      expect(formatActivityTime('Morning')).toContain('Morning');
    });

    it('should return original for unknown time', () => {
      expect(formatActivityTime('Unknown')).toBe('Unknown');
    });
  });
});
