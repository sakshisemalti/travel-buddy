'use client';

import { motion } from 'framer-motion';
import type { LocalEvent } from '@/lib/types';

interface LocalEventBadgeProps {
  event: LocalEvent;
  index: number;
}

const EventTypeEmoji: Record<string, string> = {
  mela: '🎪',
  sabzi_mandi: '🥬',
  music_sabha: '🎵',
  procession: '🎭',
  mohalla_festival: '🎉',
};

/**
 * Badge component for displaying local events
 */
export function LocalEventBadge({ event, index }: LocalEventBadgeProps) {
  const emoji = EventTypeEmoji[event.type] || '🎉';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-4 py-2 text-sm"
    >
      <span className="text-lg">{emoji}</span>
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-green-900">{event.name}</span>
        <span className="text-xs text-green-700">{event.time}</span>
      </div>
    </motion.div>
  );
}
