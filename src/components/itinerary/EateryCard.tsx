'use client';

import { motion } from 'framer-motion';
import type { Eatery } from '@/lib/types';
import { getRatingStars } from '@/lib/utils/formatting';

interface EateryCardProps {
  eatery: Eatery;
  index: number;
}

const EateryTypeEmoji: Record<string, string> = {
  dhaba: '🍲',
  street_food: '🥘',
  thali: '🍽️',
  chai_stall: '☕',
  cafe: '🍰',
};

/**
 * Card component for displaying a restaurant/eatery
 */
export function EateryCard({ eatery, index }: EateryCardProps) {
  const emoji = EateryTypeEmoji[eatery.type] || '🍽️';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-lg border border-teal-200 bg-teal-50 p-4 transition-all hover:shadow-md"
    >
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <div className="text-2xl">{emoji}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 leading-tight">{eatery.name}</h4>
            <p className="text-xs text-gray-600 capitalize">
              {eatery.type.replace('_', ' ')}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-900">
            Specialty: <span className="text-teal-700">{eatery.specialty}</span>
          </p>
          <p className="text-xs text-gray-600">
            📍 {eatery.neighbourhood}
          </p>
          <div className="text-sm">{getRatingStars(eatery.rating)}</div>
        </div>
      </div>
    </motion.div>
  );
}
