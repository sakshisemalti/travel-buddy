'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';
import type { FormState } from '@/lib/types';
import { DURATION_MIN, DURATION_MAX } from '@/lib/constants';
import { useTripForm } from '@/lib/hooks/useTripForm';
import { CityPicker } from './CityPicker';
import { MoodSelector } from './MoodSelector';
import { BudgetSlider } from './BudgetSlider';
import { ToggleFeatures } from './ToggleFeatures';

interface TripFormProps {
  onSubmit: (formData: FormState) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Main trip form component that orchestrates all form inputs
 */
export function TripForm({ onSubmit, isLoading = false }: TripFormProps) {
  const form = useTripForm();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.validate()) {
      return;
    }

    await onSubmit(form.form);
  };

  const isValid = form.form.city && form.form.mood && form.form.duration && form.form.budget;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto w-full max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* City Picker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <CityPicker
            selectedCity={form.form.city}
            onSelectCity={form.selectCity}
          />
        </motion.div>

        {/* Mood Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <MoodSelector
            selectedMood={form.form.mood}
            moodText={form.form.moodText}
            onSelectMood={form.selectMood}
            onSetMoodText={form.setMoodText}
          />
        </motion.div>

        {/* Trip Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="space-y-4">
            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                <Calendar className="mb-1 h-4 w-4 inline-block mr-2" />
                How many days?
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="range"
                  min={DURATION_MIN}
                  max={DURATION_MAX}
                  value={form.form.duration}
                  onChange={e => form.setDuration(Number(e.target.value))}
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-600"
                />
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 font-semibold text-indigo-600">
                  {form.form.duration}
                </span>
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                <Users className="mb-1 h-4 w-4 inline-block mr-2" />
                Travel Style
              </label>
              <div className="mt-2 grid gap-2 sm:grid-cols-4">
                {['Solo', 'Couple', 'Family', 'Group'].map(style => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => form.setStyle(style as 'Solo' | 'Couple' | 'Family' | 'Group')}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                      form.form.style === style
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <BudgetSlider
              value={form.form.budget}
              onChange={form.setBudget}
            />
          </div>
        </motion.div>

        {/* Advanced Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <ToggleFeatures
            antiTourist={form.form.antiTourist}
            liveDisruptions={form.form.liveDisruptions}
            localEvents={form.form.localEvents}
            showEateries={form.form.showEateries}
            onToggle={form.toggleFeature}
          />
        </motion.div>

        {/* Error messages */}
        {form.errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-red-200 bg-red-50 p-4"
          >
            <p className="text-sm font-medium text-red-800">
              Please fix the following errors:
            </p>
            <ul className="mt-2 space-y-1">
              {form.errors.map((error, idx) => (
                <li key={idx} className="text-xs text-red-700">
                  • {error}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!isValid || isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 font-semibold text-white shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Generating your itinerary...
            </span>
          ) : (
            '✨ Generate My Trip'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
