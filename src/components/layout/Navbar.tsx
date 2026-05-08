'use client';

import { Github, MapPin } from 'lucide-react';
import Link from 'next/link';

/**
 * Main navigation bar component
 */
export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-pink-500">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            GoAmigos
          </span>
        </Link>

        {/* GitHub button only */}
        <a
          href="https://github.com/sakshisemalti/GoAmigos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-sm"
        >
          <Github className="h-4 w-4" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </nav>
  );
}
