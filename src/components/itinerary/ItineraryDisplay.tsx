'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';
import type { Itinerary } from '@/lib/types';
import { CITIES, MOODS } from '@/lib/constants';
import { formatIndianCurrency } from '@/lib/utils/formatting';
import { DayCard } from './DayCard';

interface ItineraryDisplayProps {
  itinerary: Itinerary | null;
  isLoading: boolean;
  streamProgress: number;
  error: string | null;
  onReset: () => void;
  onActivateDisruption?: (disruption: string) => void;
}

export function ItineraryDisplay({
  itinerary,
  isLoading,
  streamProgress,
  error,
  onReset,
}: ItineraryDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareText = itinerary
      ? `🌍 Check out my ${itinerary.duration}-day trip to ${itinerary.destination} planned with GoAmigos!\n\n` +
        itinerary.days.map(d => `Day ${d.day}: ${d.title}\n${d.focus}`).join('\n\n')
      : 'Check out GoAmigos — AI-powered India travel planner!';

    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${itinerary?.duration}-Day Trip to ${itinerary?.destination} | GoAmigos`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // cancelled or unsupported — fall through
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt('Copy this link to share:', shareUrl);
    }
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
      >
        <h3 className="text-lg font-bold text-red-900">Oops, something went wrong</h3>
        <p className="mt-2 text-red-800">{error}</p>
        <button
          onClick={onReset}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Try Again
        </button>
      </motion.div>
    );
  }

  if (isLoading) {
    const messages = [
      '🗺️ Mapping your route...',
      '🍽️ Finding hidden eateries...',
      '🎭 Tuning to your mood...',
      '📍 Pinning local gems...',
      '✨ Crafting your itinerary...',
    ];
    const msgIndex = Math.floor((streamProgress / 100) * messages.length);
    const currentMsg = messages[Math.min(msgIndex, messages.length - 1)];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto max-w-2xl space-y-6 text-center py-12"
      >
        <div className="text-4xl animate-bounce">✈️</div>
        <h3 className="text-xl font-bold text-gray-900">Planning your trip...</h3>
        <p className="text-gray-500 text-sm">{currentMsg}</p>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: `${streamProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-gray-400">{streamProgress}% complete</p>
        <div className="space-y-4 text-left mt-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="h-20 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200"
            />
          ))}
        </div>
      </motion.div>
    );
  }

  if (!itinerary) return null;

  const city = CITIES.find(c => c.id === itinerary.city);
  const mood = MOODS.find(m => m.id === itinerary.mood);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto w-full max-w-4xl space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 print:bg-white print:border-gray-300"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-5xl mb-3">{city?.emoji}</div>
            <h2 className="text-3xl font-bold text-gray-900">
              {itinerary.duration}-Day Trip to {itinerary.destination}
            </h2>
            <p className="mt-2 text-gray-600">
              {mood?.emoji} {mood?.label} Pace • 👥 {itinerary.style} • 💰 {formatIndianCurrency(itinerary.budget)}/person
            </p>
          </div>

          {/* Action buttons — hidden when printing */}
          <div className="flex flex-col gap-2 print:hidden">
            <button
              onClick={handlePrint}
              aria-label="Print itinerary"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleShare}
              aria-label="Share itinerary"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="hidden sm:inline text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Days */}
      <div className="space-y-4">
        <AnimatePresence>
          {itinerary.days.map(day => (
            <DayCard key={day.day} day={day} />
          ))}
        </AnimatePresence>
      </div>

      {/* Reset button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onReset}
        className="w-full rounded-xl border-2 border-gray-200 px-6 py-4 font-semibold text-gray-900 transition-all hover:border-gray-300 hover:bg-gray-50 print:hidden"
      >
        <ArrowLeft className="h-4 w-4 inline-block mr-2" />
        Create Another Trip
      </motion.button>
    </motion.div>
  );
}
