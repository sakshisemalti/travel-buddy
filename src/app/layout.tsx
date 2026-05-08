import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'GoAmigos — India Trip Planner',
  description: 'Plan dynamic, personalised India trips with AI. Anti-tourist mode, live disruptions, local events, and desi food gems.',
  keywords: 'india travel planner, ai itinerary, delhi mumbai jaipur varanasi trip, GoAmigos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}
