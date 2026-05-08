'use client';

import { motion } from 'framer-motion';
import { FEATURE_DESCRIPTIONS } from '@/lib/constants';

interface ToggleFeaturesProps {
  antiTourist: boolean;
  liveDisruptions: boolean;
  localEvents: boolean;
  showEateries: boolean;
  onToggle: (feature: 'antiTourist' | 'liveDisruptions' | 'localEvents' | 'showEateries') => void;
}

const features = [
  {
    id: 'antiTourist' as const,
    label: '🎭 Anti-Tourist Mode',
    icon: '🚶',
    description: FEATURE_DESCRIPTIONS.antiTourist,
  },
  {
    id: 'liveDisruptions' as const,
    label: '⚠️ Real-World Disruptions',
    icon: '🚫',
    description: FEATURE_DESCRIPTIONS.liveDisruptions,
  },
  {
    id: 'localEvents' as const,
    label: '🎪 Local Events',
    icon: '🎉',
    description: FEATURE_DESCRIPTIONS.localEvents,
  },
  {
    id: 'showEateries' as const,
    label: '🍛 Local Eateries',
    icon: '🍽️',
    description: FEATURE_DESCRIPTIONS.showEateries,
  },
];

/**
 * Toggle component for optional features
 */
export function ToggleFeatures({
  antiTourist,
  liveDisruptions,
  localEvents,
  showEateries,
  onToggle,
}: ToggleFeaturesProps) {
  const state = {
    antiTourist,
    liveDisruptions,
    localEvents,
    showEateries,
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-900">
          ✨ Trip Customization
        </label>
        <p className="mt-1 text-sm text-gray-600">
          Add these features to make your trip more personalized
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {features.map(feature => (
          <motion.button
            key={feature.id}
            onClick={() => onToggle(feature.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all ${
              state[feature.id]
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            {/* Toggle checkbox */}
            <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all" style={{
              borderColor: state[feature.id] ? '#4f46e5' : '#d1d5db',
              backgroundColor: state[feature.id] ? '#4f46e5' : 'transparent',
            }}>
              {state[feature.id] && <span className="text-white font-bold">✓</span>}
            </div>

            {/* Content */}
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-900">{feature.label}</h3>
              <p className="text-xs text-gray-600">{feature.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
