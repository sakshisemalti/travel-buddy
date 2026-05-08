'use client';
import { MOODS } from '@/lib/constants';
import type { MoodId } from '@/lib/types';
import { motion } from 'framer-motion';

interface Props { value: MoodId | null; moodText: string; onMoodChange: (id: MoodId) => void; onTextChange: (t: string) => void; }

export default function MoodSelector({ value, moodText, onMoodChange, onTextChange }: Props) {
  return (
    <div className="space-y-4">
      <p className="section-label">How Are You Feeling?</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {MOODS.map((mood, i) => {
          const selected = value === mood.id;
          return (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onMoodChange(mood.id)}
              aria-pressed={selected}
              className={`flex flex-col items-center gap-1.5 p-3.5 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                selected
                  ? 'border-violet-500 bg-violet-50 shadow-md'
                  : 'border-gray-100 bg-white hover:border-violet-200 hover:shadow-card'
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className={`font-semibold text-xs ${selected ? 'text-violet-700' : 'text-gray-800'}`}>{mood.label}</span>
              <span className={`text-[10px] leading-tight ${selected ? 'text-violet-500' : 'text-gray-400'}`}>{mood.hint}</span>
            </motion.button>
          );
        })}
      </div>
      <div>
        <label htmlFor="mood-text" className="section-label block">Or describe it yourself (optional)</label>
        <input
          id="mood-text"
          type="text"
          value={moodText}
          onChange={e => onTextChange(e.target.value)}
          placeholder='e.g. "I need to completely disconnect from work..."'
          maxLength={200}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        />
      </div>
    </div>
  );
}
