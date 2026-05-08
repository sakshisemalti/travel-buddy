'use client';

import { useState } from 'react';
import { MOODS } from '@/lib/constants';
import type { MoodId } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface MoodSelectorProps {
  selectedMood: MoodId | null;
  moodText: string;
  onSelectMood: (moodId: MoodId) => void;
  onSetMoodText: (text: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

/**
 * Mood selector component - 8 moods grid + optional custom text
 */
export function MoodSelector({
  selectedMood,
  moodText,
  onSelectMood,
  onSetMoodText,
}: MoodSelectorProps) {
  const [showCustomInput, setShowCustomInput] = useState(!!moodText);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-900">
          😌 What's your travel vibe?
        </label>
        <p className="mt-1 text-sm text-gray-600">
          Choose your mood and we'll shape the itinerary to match
        </p>
      </div>

      {/* Mood grid */}
      <motion.div
        className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {MOODS.map(mood => (
          <motion.button
            key={mood.id}
            onClick={() => {
              onSelectMood(mood.id);
              setShowCustomInput(false);
            }}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative overflow-hidden rounded-xl border-2 p-3 text-center transition-all ${
              selectedMood === mood.id
                ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="relative space-y-1">
              <div className="text-2xl">{mood.emoji}</div>
              <div>
                <p className="text-xs font-semibold text-gray-900">{mood.label}</p>
                <p className="text-xs text-gray-600">{mood.hint}</p>
              </div>
            </div>

            {selectedMood === mood.id && (
              <div className="absolute right-2 top-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500">
                  <span className="text-xs text-white">✓</span>
                </div>
              </div>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Custom mood text input */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className="space-y-2 pt-2">
            <button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              {showCustomInput ? '−' : '+'} Add custom mood description
            </button>

            {showCustomInput && (
              <input
                type="text"
                value={moodText}
                onChange={e => onSetMoodText(e.target.value)}
                placeholder="Describe your vibe... (optional)"
                maxLength={200}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm transition-colors placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
