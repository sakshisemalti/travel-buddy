'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { MapStop } from '@/lib/types';

interface TripMapProps {
  stops: MapStop[];
  dayTitle: string;
}

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? '';

/**
 * Nearest-neighbour shortest route algorithm.
 * Starts from the first stop and always picks the closest unvisited next stop.
 */
function shortestRoute(stops: MapStop[]): MapStop[] {
  if (stops.length <= 2) return stops;
  const unvisited = [...stops];
  const route: MapStop[] = [unvisited.shift()!];
  while (unvisited.length > 0) {
    const last = route[route.length - 1];
    let nearestIdx = 0;
    let nearestDist = Infinity;
    unvisited.forEach((s, idx) => {
      const d = Math.hypot(s.lat - last.lat, s.lng - last.lng);
      if (d < nearestDist) { nearestDist = d; nearestIdx = idx; }
    });
    route.push(unvisited.splice(nearestIdx, 1)[0]);
  }
  return route;
}

/**
 * Builds a Google Maps Embed Directions URL showing the full route.
 * Uses origin → waypoints → destination format.
 */
function buildDirectionsEmbedUrl(ordered: MapStop[]): string {
  if (ordered.length === 0) return '';

  const origin = `${ordered[0].lat},${ordered[0].lng}`;
  const destination = `${ordered[ordered.length - 1].lat},${ordered[ordered.length - 1].lng}`;

  const waypoints = ordered
    .slice(1, -1)
    .map(s => `${s.lat},${s.lng}`)
    .join('|');

  const params = new URLSearchParams({
    key: MAPS_KEY,
    origin,
    destination,
    mode: 'walking',
  });

  if (waypoints) params.set('waypoints', waypoints);

  return `https://www.google.com/maps/embed/v1/directions?${params.toString()}`;
}

/**
 * Builds a Google Maps Embed Place/Search URL for a single stop (fallback for 1 stop).
 */
function buildPlaceEmbedUrl(stop: MapStop): string {
  const params = new URLSearchParams({
    key: MAPS_KEY,
    q: `${stop.lat},${stop.lng}`,
    zoom: '15',
  });
  return `https://www.google.com/maps/embed/v1/place?${params.toString()}`;
}

export function TripMap({ stops, dayTitle }: TripMapProps) {
  // Only use stops that have real lat/lng
  const validStops = stops.filter(s => s.lat != null && s.lng != null && s.lat !== 0 && s.lng !== 0);

  const orderedStops = useMemo(() => shortestRoute(validStops), [validStops]);

  const embedUrl = useMemo(() => {
    if (orderedStops.length === 0) return '';
    if (orderedStops.length === 1) return buildPlaceEmbedUrl(orderedStops[0]);
    return buildDirectionsEmbedUrl(orderedStops);
  }, [orderedStops]);

  if (validStops.length === 0 || !MAPS_KEY) return null;

  const activities = orderedStops.filter(s => s.type === 'activity');
  const restaurants = orderedStops.filter(s => s.type === 'restaurant');

  return (
    <div className="flex flex-col gap-3">
      {/* Google Maps iframe */}
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <iframe
          title={`Map for ${dayTitle}`}
          width="100%"
          height="360"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={embedUrl}
        />

        {/* Legend */}
        <div className="bg-white border-t border-gray-100 px-4 py-2 flex flex-wrap gap-5 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span>Activities ({activities.length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-teal-600" />
            <span>Eateries ({restaurants.length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-indigo-500 font-medium">↗ Shortest walking route</span>
          </div>
        </div>
      </div>

      {/* Ordered stop list */}
      <div className="grid gap-2 sm:grid-cols-2">
        {orderedStops.map((stop, i) => (
          <motion.div
            key={stop.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-2 text-xs p-2 rounded-lg bg-gray-50 border border-gray-100"
          >
            <span className={`font-bold shrink-0 ${stop.type === 'activity' ? 'text-rose-500' : 'text-teal-600'}`}>
              {stop.type === 'activity' ? `${i + 1}.` : '🍽️'}
            </span>
            <span className="text-gray-800 font-medium">{stop.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
