'use client';

import { useState, useCallback } from 'react';
import type { FormState, CityId, MoodId, TravelStyle } from '../types';
import { CITIES, MOODS, DURATION_DEFAULT, BUDGET_DEFAULT } from '../constants';
import { validateFormState, validateField } from '../utils/validation';

/**
 * Hook to manage trip form state with validation
 */
export function useTripForm(initialState?: Partial<FormState>) {
  const defaultState: FormState = {
    city: null,
    mood: null,
    moodText: '',
    duration: DURATION_DEFAULT,
    budget: BUDGET_DEFAULT,
    style: 'Solo',
    antiTourist: false,
    liveDisruptions: false,
    localEvents: false,
    showEateries: false,
    ...initialState,
  };

  const [form, setForm] = useState<FormState>(defaultState);
  const [errors, setErrors] = useState<string[]>([]);

  const updateField = useCallback((field: keyof FormState, value: unknown) => {
    // Validate the field
    const error = validateField(field, value);
    setErrors(prev => {
      const filtered = prev.filter(e => !e.includes(field));
      return error ? [...filtered, `${field}: ${error.message}`] : filtered;
    });

    // Update state
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const updateMultiple = useCallback((updates: Partial<FormState>) => {
    setForm(prev => ({ ...prev, ...updates }));
  }, []);

  const validate = useCallback(() => {
    const result = validateFormState(form);
    setErrors(result.errors.map(e => `${e.field}: ${e.message}`));
    return result.isValid;
  }, [form]);

  const reset = useCallback(() => {
    setForm(defaultState);
    setErrors([]);
  }, [defaultState]);

  const selectCity = useCallback((cityId: CityId) => {
    updateField('city', cityId);
  }, [updateField]);

  const selectMood = useCallback((moodId: MoodId) => {
    updateField('mood', moodId);
  }, [updateField]);

  const setMoodText = useCallback((text: string) => {
    updateField('moodText', text);
  }, [updateField]);

  const setBudget = useCallback((budget: number) => {
    updateField('budget', budget);
  }, [updateField]);

  const setDuration = useCallback((duration: number) => {
    updateField('duration', duration);
  }, [updateField]);

  const setStyle = useCallback((style: TravelStyle) => {
    updateField('style', style);
  }, [updateField]);

  const toggleFeature = useCallback((feature: 'antiTourist' | 'liveDisruptions' | 'localEvents' | 'showEateries') => {
    setForm(prev => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  }, []);

  return {
    form,
    errors,
    updateField,
    updateMultiple,
    validate,
    reset,
    selectCity,
    selectMood,
    setMoodText,
    setBudget,
    setDuration,
    setStyle,
    toggleFeature,
  };
}
