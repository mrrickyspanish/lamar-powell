'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSport } from './SportContext';
import { sportContent } from './sportContent';

export const AthleteStats = () => {
  const { currentSport } = useSport();
  const content = sportContent[currentSport];

  return (
    <section className="relative py-20 px-6 bg-black">
      {/* Background gradient that matches current sport */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`stats-bg-${currentSport}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${content.colors.gradient} opacity-20`}
        />
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`stats-title-${currentSport}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
              Season Stats
            </h2>
            <p className="text-white/70 text-lg">
              {content.position} Performance
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Stats Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`stats-grid-${currentSport}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {content.stats.map((stat, index) => (
              <motion.div
                key={`${currentSport}-stat-${stat.label}`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                className="group relative"
              >
                {/* Glassmorphic Card */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl hover:bg-black/50 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-3xl">
                  {/* Stat Value */}
                  <div className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
                    {stat.value}
                  </div>
                  
                  {/* Stat Label */}
                  <div className="text-sm md:text-base text-white/70 uppercase tracking-wider font-semibold">
                    {stat.label}
                  </div>

                  {/* Subtle gradient accent on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${content.colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
