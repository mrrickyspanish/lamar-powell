'use client';

import { useSport } from '@/components/sport/SportContext';
import { sportContent } from '@/components/sport/sportContent';

export default function QuotesSection() {
  const { currentSport } = useSport();
  const quotes = sportContent[currentSport].quotes;

  if (!quotes || quotes.length === 0) return null;

  const [primary, ...rest] = quotes;
  const accent = sportContent[currentSport].colors.accent;

  return (
    <section className="bg-slate-950 py-12 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              What Coaches Are Saying
            </h2>
            <p className="mt-1 text-sm md:text-base text-slate-300">
              Direct pull-quotes from coaches and evaluators on LaMarin&apos;s{' '}
              {currentSport === 'football' ? 'football' : 'basketball'} impact.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
            {currentSport.toUpperCase()} • COACH QUOTES
          </span>
        </div>

        {/* Primary quote */}
        <div className="relative mb-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-6 md:p-7">
          <div
            className="absolute inset-0 rounded-2xl opacity-40 pointer-events-none"
            style={{ background: `radial-gradient(circle at 0% 0%, ${accent}33, transparent 55%)` }}
          />
          <div className="relative">
            <p className="text-4xl md:text-5xl text-slate-700 mb-2 leading-none">
              “
            </p>
            <p className="text-lg md:text-xl text-slate-50 leading-relaxed">
              {primary.text}
            </p>
            <p className="mt-3 text-sm font-medium text-slate-300">
              — {primary.author}
            </p>
          </div>
        </div>

        {/* Secondary quotes */}
        {rest.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((q, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-950/80 border border-slate-800 px-4 py-4"
              >
                <p className="text-sm text-slate-100 leading-relaxed">
                  “{q.text}”
                </p>
                <p className="mt-2 text-xs font-medium text-slate-400">
                  — {q.author}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
