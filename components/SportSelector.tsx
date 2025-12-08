'use client';

import { useSport } from '@/components/sport/SportContext';
import { motion } from 'framer-motion';

export default function SportSelector() {
  const { currentSport, setSport } = useSport();

  const sports = [
    {
      id: 'football' as const,
      label: 'Football',
      image: '/LP_football_4.png',
      tagline: 'Running Back',
      position: '55% center',
      scale: 'scale-125',
    },
    {
      id: 'basketball' as const,
      label: 'Basketball',
      image: '/LP_hoops_8.png',
      tagline: 'Guard',
      position: '45% center',
      scale: 'scale-100',
    },
  ];

  const handleSportSelect = (sportId: 'football' | 'basketball') => {
    setSport(sportId);
    const contentSection = document.getElementById('athlete-content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="sport-selector"
      className="w-full bg-white"
    >
      <div className="grid md:grid-cols-2">
        {sports.map((sportOption) => (
          <motion.button
            key={sportOption.id}
            onClick={() => handleSportSelect(sportOption.id)}
            className="group relative h-[600px] w-full overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`absolute inset-0 bg-cover transition-transform duration-500 group-hover:scale-110 ${sportOption.scale}`}
              style={{ 
                backgroundImage: `url(${sportOption.image})`,
                backgroundPosition: sportOption.position,
                filter: sportOption.id === 'basketball' 
                  ? 'contrast(1.12) saturate(0.92) brightness(1.03) sepia(0.04) hue-rotate(-2deg)' 
                  : 'none'
              }}
            />

            <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/50" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/80">
                {sportOption.tagline}
              </p>
              <h3 className="mb-6 text-5xl font-bold text-white md:text-6xl">
                {sportOption.label}
              </h3>
              <div className="rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition-colors duration-300 group-hover:bg-gray-100">
                View Profile
              </div>
            </div>

            {currentSport === sportOption.id && (
              <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-black">
                Selected
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
