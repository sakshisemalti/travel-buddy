'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Day } from '@/lib/types';
import { ActivityCard } from './ActivityCard';
import { EateryCard } from './EateryCard';
import { DisruptionAlert } from './DisruptionAlert';
import { LocalEventBadge } from './LocalEventBadge';
import { TripMap } from '../map/TripMap';

interface DayCardProps {
  day: Day;
}

/**
 * Collapsible card component for displaying a single day's itinerary
 */
export function DayCard({ day }: DayCardProps) {
  const [isExpanded, setIsExpanded] = useState(day.day === 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
      >
        <div className="text-left">
          <h3 className="text-lg font-bold text-gray-900">
            Day {day.day}: {day.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{day.focus}</p>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-6 w-6 text-gray-600" />
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-6 border-t border-gray-200 px-6 py-6">
              {/* Disruption alert (if any) */}
              {day.disruption_note && (
                <DisruptionAlert note={day.disruption_note} dayNumber={day.day} />
              )}

              {/* Local events (if any) */}
              {day.local_events && day.local_events.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900">🎪 Local Events</h4>
                  <div className="flex flex-wrap gap-2">
                    {day.local_events.map((event, idx) => (
                      <LocalEventBadge key={idx} event={event} index={idx} />
                    ))}
                  </div>
                </div>
              )}

              {/* Activities */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">📍 Activities</h4>
                <div className="space-y-3">
                  {day.activities.map((activity, idx) => (
                    <ActivityCard key={idx} activity={activity} index={idx} />
                  ))}
                </div>
              </div>

              {/* Eateries */}
              {day.eateries && day.eateries.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900">🍽️ Top-Rated Spots</h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {day.eateries.map((eatery, idx) => (
                      <EateryCard key={idx} eatery={eatery} index={idx} />
                    ))}
                  </div>
                </div>
              )}

              {/* Map visualization */}
              {day.map_stops && day.map_stops.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900">🗺️ Your Route</h4>
                  <TripMap stops={day.map_stops} dayTitle={day.title} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
