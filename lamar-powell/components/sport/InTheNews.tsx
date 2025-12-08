'use client';

import { useState, useEffect } from 'react';
import { useSport } from "@/components/sport/SportContext";
import { sportContent } from "@/components/sport/sportContent";

export default function InTheNews() {
  const { currentSport } = useSport();
  const data = sportContent[currentSport];
  const [startIndex, setStartIndex] = useState(0);

  // Reset pagination when sport changes
  useEffect(() => {
    setStartIndex(0);
  }, [currentSport]);

  if (!data.news || data.news.length === 0) return null;

  const itemsPerPage = 4;
  const totalArticles = data.news.length;
  const visibleArticles = data.news.slice(startIndex, startIndex + itemsPerPage);
  const hasMore = startIndex + itemsPerPage < totalArticles;
  const hasPrevious = startIndex > 0;

  const handleNext = () => {
    if (hasMore) {
      setStartIndex(prev => prev + itemsPerPage);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      setStartIndex(prev => Math.max(0, prev - itemsPerPage));
    }
  };

  return (
    <section className="py-20 px-4 md:px-12 bg-gray-900/20">
      <div className="max-w-6xl mx-auto backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-gray-800/60 border border-white/10 shadow-2xl rounded-3xl p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">In the News</h2>
            <p className="text-white/60 text-sm md:text-base mt-2">
              Coverage, scouting reports, and highlights featuring LaMarin&apos;s{" "}
              <span className="font-semibold">{currentSport}</span> impact.
            </p>
          </div>

          <span className="px-3 py-1 text-xs uppercase tracking-[0.2em] rounded-full border border-white/30 text-white/90 font-semibold">
            {currentSport.toUpperCase()} • Featured
          </span>
        </div>

        {/* Article grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {visibleArticles.map((item, idx) => (
            <div
              key={startIndex + idx}
              className="bg-black/25 rounded-2xl p-6 border border-white/10 backdrop-blur-lg hover:bg-black/35 transition shadow-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-white/80 text-xs uppercase tracking-wide">
                  <span>{item.source}</span>
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/10 border border-white/15">
                    {item.type}
                  </span>
                </div>
                <span className="text-white/50 text-xs">{item.date}</span>
              </div>

              <h3 className="text-lg text-white font-semibold leading-snug">
                {item.title}
              </h3>

              <p className="text-white/40 text-sm mt-3">Third-party coverage</p>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-300 text-sm font-semibold mt-4 inline-flex items-center hover:text-teal-200"
              >
                View <span className="ml-1">↗</span>
              </a>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalArticles > itemsPerPage && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={handlePrevious}
              disabled={!hasPrevious}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                hasPrevious
                  ? 'text-white bg-white/10 hover:bg-white/20 border border-white/20'
                  : 'text-white/30 bg-white/5 border border-white/5 cursor-not-allowed'
              }`}
            >
              ← Previous
            </button>

            <p className="text-sm text-white/60">
              Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, totalArticles)} of {totalArticles}
            </p>

            <button
              onClick={handleNext}
              disabled={!hasMore}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                hasMore
                  ? 'text-white bg-white/10 hover:bg-white/20 border border-white/20'
                  : 'text-white/30 bg-white/5 border border-white/5 cursor-not-allowed'
              }`}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
