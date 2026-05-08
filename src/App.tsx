'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TripForm } from '@/components/form/TripForm';
import { ItineraryDisplay } from '@/components/itinerary/ItineraryDisplay';
import { useTrip } from '@/lib/hooks/useTrip';
import { useTripForm } from '@/lib/hooks/useTripForm';
import { FormState } from '@/lib/types';

/**
 * Main App component - orchestrates the form and itinerary display
 */
export default function App() {
  const { itinerary, isLoading, streamProgress, error, generateTrip, reset: resetTrip } = useTrip();
  const form = useTripForm();
  const [showItinerary, setShowItinerary] = useState(false);

  const handleGenerateTrip = async (formData: FormState) => {
    setShowItinerary(true);
    await generateTrip(formData);
  };

  const handleReset = () => {
    resetTrip();
    form.reset();
    setShowItinerary(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        {!showItinerary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
          >
            <div className="text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4"
              >
                GoAmigos — Your India Travel Companion
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                AI-powered itineraries shaped by your mood. Skip the tourist traps, discover local gems, and embrace the real India.
              </motion.p>
            </div>

            {/* Form */}
            <TripForm onSubmit={handleGenerateTrip} isLoading={isLoading} />
          </motion.div>
        )}

        {/* Itinerary display */}
        {showItinerary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
          >
            <ItineraryDisplay
              itinerary={itinerary}
              isLoading={isLoading}
              streamProgress={streamProgress}
              error={error}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
