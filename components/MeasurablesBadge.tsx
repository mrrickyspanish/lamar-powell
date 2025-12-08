'use client';

import { useSport } from '@/components/sport/SportContext';
import { motion } from 'framer-motion';

export default function MeasurablesBadge() {
  const { currentSport, setSport } = useSport();

  const badges = {
    football: {
      items: [
        { label: '40-YD', value: '4.42s' },
        { label: 'VERT', value: '36"' },
        { label: 'GPA', value: '4.0' },
      ],
      accentColor: '#FFC107',
    },
    basketball: {
      items: [
        { label: 'PPG', value: '18.5' },
        { label: 'GPA', value: '4.0' },
      ],
      accentColor: '#4ECDC4',
    },
  };

  const currentBadge = badges[currentSport];

  return (
    <motion.div
      key={currentSport}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-2 right-2 md:top-4 md:right-4 z-50"
    >
      <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl overflow-hidden">
        {/* Sport Switcher */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setSport('football')}
            className={`flex-1 px-3 py-2 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${
              currentSport === 'football'
                ? 'bg-[#FFC107] text-black'
                : 'bg-transparent text-white/60 hover:text-white/80'
            }`}
          >
            Football
          </button>
          <button
            onClick={() => setSport('basketball')}
            className={`flex-1 px-3 py-2 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${
              currentSport === 'basketball'
                ? 'bg-[#4ECDC4] text-black'
                : 'bg-transparent text-white/60 hover:text-white/80'
            }`}
          >
            Basketball
          </button>
        </div>

        {/* Stats Display */}
        <div className="px-2 py-2 md:px-4 md:py-3">
          <div className="flex items-center gap-2 md:gap-4">
            {currentBadge.items.map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div
                  className="text-sm md:text-xl font-bold"
                  style={{ color: currentBadge.accentColor }}
                >
                  {item.value}
                </div>
                <div className="text-[8px] md:text-[10px] text-white/60 font-semibold tracking-wider uppercase">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
