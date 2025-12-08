'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSport } from '@/components/sport/SportContext';

type ShareState = 'closed' | 'open';

export default function Header() {
  const { currentSport, setSport } = useSport();
  const [shareState, setShareState] = useState<ShareState>('closed');

  const isFootball = currentSport === 'football';
  const accentColor = isFootball ? '#fbbf24' : '#22d3ee';

  const jerseyNumber = 'LP21';

  const measurables = isFootball
    ? ['4.42s 40-YD', '38" VERT', '4.0 GPA']
    : ['18.5 PPG', '41% 3PT', '4.0 GPA'];

  const copyLink = (sport: 'football' | 'basketball') => {
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://lamar-powell.vercel.app';
    const url = `${origin}/?sport=${sport}`;

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }

    setShareState('closed');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {/* Top strip – Nike style utility bar */}
      <div className="bg-black text-[11px] uppercase tracking-[0.2em] text-white/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>Coach Tools</span>

          <nav className="flex items-center gap-6">
            <a href="#athlete-content" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-2 py-1">
              Stats
            </a>
            <a href="#schedule" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-2 py-1">
              Schedule
            </a>
            <a href="#contact" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-2 py-1">
              Contact
            </a>

            {/* Share dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setShareState((prev) => (prev === 'open' ? 'closed' : 'open'))
                }
                className="inline-flex items-center rounded-full border border-white/30 px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] hover:border-white hover:text-white"
              >
                SHARE ▾
              </button>

              {shareState === 'open' && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10 bg-black/90 py-2 text-[12px] shadow-xl z-50">
                  <div className="px-4 pb-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Share {currentSport === 'football' ? 'Football' : 'Basketball'} Profile
                  </div>

                  <button
                    type="button"
                    onClick={() => copyLink(currentSport)}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-white/80 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                  >
                    <span>Copy {currentSport === 'football' ? 'Football' : 'Basketball'} Profile Link</span>
                    <span className="text-xs">↗</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Main nav – logo / sport toggle / measurables */}
      <div className="border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* LEFT – Jersey badge with shimmer */}
          <div className="flex items-center gap-3">
            <motion.div
              key={currentSport}
              initial={{ boxShadow: `0 0 0 0 ${accentColor}00`, opacity: 0.9 }}
              animate={{
                boxShadow: [
                  `0 0 0 0 ${accentColor}00`,
                  `0 0 26px 4px ${accentColor}55`,
                  `0 0 0 0 ${accentColor}00`,
                ],
                opacity: 1,
              }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="relative flex h-10 w-12 items-center justify-center rounded-full border border-white/25 bg-zinc-900 text-white"
            >
              <span className="text-[10px] font-black italic tracking-tight">
                {jerseyNumber}
              </span>
            </motion.div>
            <span className="hidden text-xs text-white/70 sm:block">
              Class of 2028
            </span>
          </div>

          {/* CENTER – sport toggle */}
          <div className="flex items-center justify-center gap-8 text-sm font-medium">
            <button
              type="button"
              onClick={() => setSport('football')}
              className={[
                'pb-1 transition-colors w-20 text-center',
                isFootball
                  ? 'border-b-2 border-amber-400 text-amber-300'
                  : 'border-b-2 border-transparent text-white/60 hover:text-white',
              ].join(' ')}
            >
              Football
            </button>

            <button
              type="button"
              onClick={() => setSport('basketball')}
              className={[
                'pb-1 transition-colors w-20 text-center',
                !isFootball
                  ? 'border-b-2 border-cyan-300 text-cyan-200'
                  : 'border-b-2 border-transparent text-white/60 hover:text-white',
              ].join(' ')}
            >
              Basketball
            </button>
          </div>

          {/* RIGHT – measurables badge */}
          <div className="hidden items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold text-white/80 shadow-sm sm:flex">
            {measurables.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
