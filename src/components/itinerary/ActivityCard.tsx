'use client';

import { motion } from 'framer-motion';
import type { Activity } from '@/lib/types';
import { getActivityEmoji } from '@/lib/utils/formatting';

interface ActivityCardProps {
  activity: Activity;
  index: number;
}

/**
 * Card component for displaying a single activity
 */
export function ActivityCard({ activity, index }: ActivityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md"
    >
      {/* Time and icon */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100">
          <span className="text-lg">{getActivityEmoji(activity.icon)}</span>
        </div>
        <div className="text-xs font-medium text-gray-600">{activity.time}</div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1 min-w-0">
        <h4 className="font-semibold text-gray-900 leading-tight">{activity.title}</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{activity.description}</p>

        {/* Anti-tourist note */}
        {activity.anti_note && (
          <div className="mt-2 rounded-lg bg-amber-50 p-2 border-l-2 border-amber-400">
            <p className="text-xs text-amber-900">
              <span className="font-semibold">💡 Local tip:</span> {activity.anti_note}
            </p>
          </div>
        )}

        {/* Local event badge */}
        {activity.is_local_event && (
          <div className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            🎪 Local Event
          </div>
        )}
      </div>
    </motion.div>
  );
}
