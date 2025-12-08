'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSport, Sport } from './SportContext';
import { sportContent } from './sportContent';
import Image from 'next/image';

export const AthleteHero = () => {
  const { currentSport, setSport } = useSport();
  const content = sportContent[currentSport];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSport}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${content.colors.gradient}`}
        />
      </AnimatePresence>

      {/* Hero Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`img-${currentSport}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={content.heroImage}
            alt={`${content.name} ${currentSport}`}
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Sport Selector */}
        <div className="w-full p-6 flex justify-center">
          <div className="inline-flex gap-2 p-1 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            {(['football', 'basketball'] as Sport[]).map((sport) => (
              <button
                key={sport}
                onClick={() => setSport(sport)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  currentSport === sport
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-6xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSport}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                {/* Name and Position */}
                <div className="mb-8">
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                    {content.name}
                  </h1>
                  <p className="text-2xl md:text-3xl text-white/90 font-light">
                    {content.position}
                  </p>
                </div>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-white/95 font-medium mb-6 italic"
                >
                  {content.tagline}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-white/80 max-w-3xl mx-auto mb-12"
                >
                  {content.description}
                </motion.p>

                {/* Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
                >
                  {content.stats.map((stat, index) => (
                    <motion.div
                      key={`${currentSport}-${stat.label}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/70 uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="flex justify-center"
                >
                  <button
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                    }}
                    className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl"
                  >
                    Get in Touch
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center">
          <p className="text-white/60 text-sm">
            Dual-Sport Athlete • Class of 2026
          </p>
        </div>
      </div>
    </div>
  );
};
