"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSport } from "@/components/sport/SportContext";
import { sportContent } from "@/components/sport/sportContent";
import HudlVerified from "@/components/HudlVerified";
import HudlEmbed from "@/components/HudlEmbed";

export default function HighlightsSection() {
  const { currentSport } = useSport();
  const hudlBlock = useMemo(() => sportContent[currentSport].hudl, [currentSport]);
  const [currentVideo, setCurrentVideo] = useState<string>(hudlBlock?.highlight || "");
  const [startIndex, setStartIndex] = useState(0);

  // Reset pagination when sport changes
  useEffect(() => {
    setStartIndex(0);
    setCurrentVideo(hudlBlock?.highlight || "");
  }, [currentSport, hudlBlock]);

  if (!hudlBlock) return null;

  const itemsPerPage = 4;
  const totalGames = hudlBlock.games?.length || 0;
  const visibleGames = hudlBlock.games?.slice(startIndex, startIndex + itemsPerPage) || [];
  const hasMore = startIndex + itemsPerPage < totalGames;
  const hasPrevious = startIndex > 0;

  const handleVideoSelect = (embedUrl: string) => {
    setCurrentVideo(embedUrl);
    // Auto-scroll to video player
    document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative bg-slate-900 py-10 sm:py-14 lg:py-16" id="highlights">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Highlights & Full Games
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-white/70">
              Verified film that shows how LaMarin impacts winning at every level.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSport}-${currentVideo}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-[0_18px_45px_rgba(0,0,0,0.7)]"
            >
              {/* Hudl Verified Badge */}
              <div className="absolute top-3 left-3 z-10">
                <HudlVerified />
              </div>

              <HudlEmbed src={currentVideo} title="LaMarin Powell Highlights" />
            </motion.div>
          </AnimatePresence>

          {hudlBlock.games && hudlBlock.games.length > 0 && (
            <div className="flex flex-col gap-4">
              {visibleGames.map((game, idx) => {
                const actualIndex = startIndex + idx;
                const embedUrl = game.url.replace('/video/', '/embed/video/');
                const isActive = currentVideo === embedUrl;
                
                return (
                  <button
                    key={actualIndex}
                    onClick={() => handleVideoSelect(embedUrl)}
                    className={`group relative overflow-hidden rounded-xl px-5 py-4 backdrop-blur-sm transition-all border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                      isActive 
                        ? 'bg-white/18 border-white/30' 
                        : 'bg-white/7 border-white/10 hover:bg-white/12'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm sm:text-base font-medium ${
                        isActive ? 'text-white' : 'text-white/90'
                      }`}>
                        {game.label}
                      </span>
                      <span className={`text-xs transition-colors flex items-center gap-1 ${
                        isActive ? 'text-white' : 'text-white/90 group-hover:text-white'
                      }`}>
                        {isActive ? 'PLAYING' : 'PLAY'}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isActive ? "M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" : "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"} />
                        </svg>
                      </span>
                    </div>
                  </button>
                );
              })}
              
              {/* Pagination Controls */}
              {(hasPrevious || hasMore) && (
                <div className="flex items-center justify-between gap-2 mt-2 pt-3 border-t border-white/10">
                  <button
                    onClick={() => setStartIndex(Math.max(0, startIndex - itemsPerPage))}
                    disabled={!hasPrevious}
                    className={`flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                      hasPrevious
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-white/30 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    PREV
                  </button>
                  <span className="text-xs text-white/50 font-medium">
                    {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalGames)} of {totalGames}
                  </span>
                  <button
                    onClick={() => setStartIndex(startIndex + itemsPerPage)}
                    disabled={!hasMore}
                    className={`flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                      hasMore
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-white/30 cursor-not-allowed'
                    }`}
                  >
                    NEXT
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
