'use client';

import { CITIES } from '@/lib/constants';
import type { CityId } from '@/lib/types';
import { motion } from 'framer-motion';

interface CityPickerProps {
  selectedCity: CityId | null;
  onSelectCity: (cityId: CityId) => void;
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
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

/**
 * City picker grid component - allows users to select their destination
 */
export function CityPicker({ selectedCity, onSelectCity }: CityPickerProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-900">
          🗺️ Where do you want to go?
        </label>
        <p className="mt-1 text-sm text-gray-600">
          Choose from 8 amazing Indian cities, each with its own soul
        </p>
      </div>

      <motion.div
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {CITIES.map(city => (
          <motion.button
            key={city.id}
            onClick={() => onSelectCity(city.id)}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative overflow-hidden rounded-2xl border-2 p-4 transition-all ${
              selectedCity === city.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50 opacity-0 transition-opacity group-hover:opacity-50" />

            {/* Content */}
            <div className="relative space-y-2">
              <div className="text-3xl">{city.emoji}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{city.name}</h3>
                <p className="text-xs text-gray-600">{city.tagline}</p>
              </div>
            </div>

            {/* Selection indicator */}
            {selectedCity === city.id && (
              <div className="absolute right-2 top-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                  <span className="text-white">✓</span>
                </div>
              </div>
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
