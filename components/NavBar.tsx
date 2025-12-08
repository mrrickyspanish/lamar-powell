'use client';

import { useSport } from '@/components/sport/SportContext';
import { motion } from 'framer-motion';

export default function NavBar() {
  const { currentSport, setSport } = useSport();

  const badges = {
    football: {
      items: [
        { label: '40-YD', value: '4.42s' },
        { label: 'VERT', value: '38"' },
        { label: 'GPA', value: '4.0' },
      ],
      accentColor: '#FFC107',
    },
    basketball: {
      items: [
        { label: 'PPG', value: '18.5' },
        { label: '3PT%', value: '41%' },
        { label: 'GPA', value: '4.0' },
      ],
      accentColor: '#4ECDC4',
    },
  };

  const currentBadge = badges[currentSport];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white text-xl font-semibold tracking-tight">
              LAMARIN POWELL
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setSport('football')}
              className={`relative px-4 py-2 text-[17px] font-medium tracking-normal transition-all ${
                currentSport === 'football'
                  ? 'text-white'
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              Football
              {currentSport === 'football' && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC107]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>

            <span className="text-white/30 text-base">•</span>

            <button
              onClick={() => setSport('basketball')}
              className={`relative px-4 py-2 text-[17px] font-medium tracking-normal transition-all ${
                currentSport === 'basketball'
                  ? 'text-white'
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              Basketball
              {currentSport === 'basketball' && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4ECDC4]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>

          <motion.div
            key={currentSport}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-6"
          >
            {currentBadge.items.map((item) => (
              <div key={item.label} className="hidden sm:flex flex-col items-center">
                <div
                  className="text-xl font-semibold leading-none"
                  style={{ color: currentBadge.accentColor }}
                >
                  {item.value}
                </div>
                <div className="text-xs text-white/50 font-medium tracking-wider uppercase mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="md:hidden border-t border-white/10">
        <div className="flex">
          <button
            onClick={() => setSport('football')}
            className={`flex-1 py-3 text-sm font-semibold uppercase tracking-wider transition-all ${
              currentSport === 'football'
                ? 'bg-[#FFC107]/20 text-[#FFC107] border-b-2 border-[#FFC107]'
                : 'text-white/50'
            }`}
          >
            Football
          </button>
          <button
            onClick={() => setSport('basketball')}
            className={`flex-1 py-3 text-sm font-semibold uppercase tracking-wider transition-all ${
              currentSport === 'basketball'
                ? 'bg-[#4ECDC4]/20 text-[#4ECDC4] border-b-2 border-[#4ECDC4]'
                : 'text-white/50'
            }`}
          >
            Basketball
          </button>
        </div>
      </div>
    </nav>
  );
}
