'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface DisruptionAlertProps {
  note: string;
  dayNumber: number;
}

/**
 * Alert component for displaying disruption information
 */
export function DisruptionAlert({ note, dayNumber }: DisruptionAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 flex gap-3"
    >
      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-semibold text-red-900">⚠️ Day {dayNumber} Alert</h4>
        <p className="text-sm text-red-800 mt-1">{note}</p>
      </div>
    </motion.div>
  );
}
