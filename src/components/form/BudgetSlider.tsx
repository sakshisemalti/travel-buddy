'use client';

import { BUDGET_MIN, BUDGET_MAX, BUDGET_STEP } from '@/lib/constants';
import { formatIndianCurrency } from '@/lib/utils/formatting';

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
}

/**
 * Budget slider component with INR scale
 */
export function BudgetSlider({ value, onChange }: BudgetSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between">
        <label className="block text-sm font-semibold text-gray-900">
          💰 Budget per person
        </label>
        <span className="text-lg font-bold text-indigo-600">
          {formatIndianCurrency(value)}
        </span>
      </div>

      <div className="space-y-2">
        <input
          type="range"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={BUDGET_STEP}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-600"
        />

        <div className="flex justify-between text-xs text-gray-600">
          <span>{formatIndianCurrency(BUDGET_MIN)}</span>
          <span>{formatIndianCurrency(BUDGET_MAX)}</span>
        </div>

        {/* Budget category indicator */}
        <div className="flex gap-1 text-xs">
          {value < 10000 && <span className="rounded-full bg-green-100 px-2 py-1 text-green-700">Budget Travel</span>}
          {value >= 10000 && value < 40000 && (
            <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-700">Comfort Travel</span>
          )}
          {value >= 40000 && (
            <span className="rounded-full bg-purple-100 px-2 py-1 text-purple-700">Luxury Travel</span>
          )}
        </div>
      </div>
    </div>
  );
}
