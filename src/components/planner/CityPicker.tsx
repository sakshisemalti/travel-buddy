'use client';
import { CITIES } from '@/lib/constants';
import type { CityId } from '@/lib/types';
import { motion } from 'framer-motion';

interface Props { value: CityId | null; onChange: (id: CityId) => void; }

export default function CityPicker({ value, onChange }: Props) {
  return (
    <div>
      <p className="section-label">Choose Your City</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CITIES.map((city, i) => {
          const selected = value === city.id;
          return (
            <motion.button
              key={city.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onChange(city.id)}
              aria-pressed={selected}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                selected
                  ? 'border-indigo-500 bg-indigo-50 shadow-md'
                  : 'border-gray-100 bg-white hover:border-indigo-200 hover:shadow-card'
              }`}
            >
              <span className="text-3xl" role="img" aria-label={city.name}>{city.emoji}</span>
              <span className={`font-semibold text-sm ${selected ? 'text-indigo-700' : 'text-gray-800'}`}>{city.name}</span>
              <span className={`text-xs leading-tight ${selected ? 'text-indigo-500' : 'text-gray-400'}`}>{city.tagline}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
