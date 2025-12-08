'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSport } from "@/components/sport/SportContext";

type ShareKey = "football" | "basketball" | null;

// header metric strip (always-visible measurables)
const headerMetrics: Record<
  "football" | "basketball",
  { label: string; value: string }[]
> = {
  football: [
    { label: "40-YD", value: "4.42s" },
    { label: 'VERT', value: '38"' },
    { label: "GPA", value: "4.0" },
  ],
  basketball: [
    { label: "PPG", value: "18.5" },
    { label: "3PT%", value: "41%" },
    { label: "GPA", value: "4.0" },
  ],
};

export default function Header() {
  const { currentSport, setSport } = useSport();
  const [origin, setOrigin] = useState<string | null>(null);
  const [openShare, setOpenShare] = useState(false);
  const [copiedKey, setCopiedKey] = useState<ShareKey>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const base = origin ?? "https://lamar-powell.vercel.app";
  const footballUrl = `${base}?sport=football`;
  const basketballUrl = `${base}?sport=basketball`;

  async function handleCopy(key: Exclude<ShareKey, null>) {
    try {
      const url = key === "football" ? footballUrl : basketballUrl;
      await navigator.clipboard.writeText(url);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch (e) {
      console.error("Clipboard copy failed:", e);
    }
  }

  function scrollToContact() {
    if (typeof window === "undefined") return;
    const el =
      document.getElementById("recruiting-form") ||
      document.querySelector("[data-recruiting-form]") ||
      document.getElementById("contact");
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function scrollToHighlights() {
    if (typeof window === "undefined") return;
    const el =
      document.getElementById("highlights") ||
      document.querySelector("[data-highlights-section]");
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function scrollToSchedule() {
    if (typeof window === "undefined") return;
    const el =
      document.getElementById("schedule") ||
      document.querySelector("[data-schedule-section]");
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const metrics = headerMetrics[currentSport];

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80">
      {/* Tier 1: Coach tools bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-[11px] text-slate-300">
        <span className="uppercase tracking-[0.18em] text-slate-500">
          Coach tools
        </span>

        <div className="flex items-center gap-3">
          {/* Share dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenShare((v) => !v)}
              className="inline-flex items-center gap-1 rounded-full border border-slate-600/80 bg-slate-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] hover:border-sky-400 hover:text-sky-100 transition"
            >
              Share
              <span className="text-[10px]">
                {openShare ? "▴" : "▾"}
              </span>
            </button>

            {openShare && (
              <div className="absolute right-0 mt-2 w-60 rounded-xl border border-slate-700 bg-slate-950/98 shadow-xl">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Share Lamarin&apos;s profile
                  </p>
                </div>
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => handleCopy("football")}
                    className="flex w-full items-center justify-between px-3 py-2 text-xs text-slate-200 hover:bg-slate-900"
                  >
                    <span>Copy Football Profile Link</span>
                    <span className="text-[11px] text-sky-300">
                      {copiedKey === "football" ? "Copied" : "↗"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy("basketball")}
                    className="flex w-full items-center justify-between px-3 py-2 text-xs text-slate-200 hover:bg-slate-900"
                  >
                    <span>Copy Basketball Profile Link</span>
                    <span className="text-[11px] text-emerald-300">
                      {copiedKey === "basketball" ? "Copied" : "↗"}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick jumps */}
          <button
            type="button"
            onClick={scrollToHighlights}
            className="hidden sm:inline-flex items-center rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400 hover:text-sky-200 transition"
          >
            Film
          </button>

          <button
            type="button"
            onClick={scrollToSchedule}
            className="hidden sm:inline-flex items-center rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400 hover:text-sky-200 transition"
          >
            Schedule
          </button>

          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center rounded-full border border-emerald-400/80 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-100 hover:bg-emerald-500/20 transition"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Tier 2: Main nav */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
        {/* Left: TB mark + name */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-slate-900 text-[10px] font-bold tracking-[0.18em]">
            TB
          </div>
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-100"
          >
            Lamarin Powell
          </Link>
        </div>

        {/* Center: sport toggle */}
        <nav className="flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.28em]">
          <button
            type="button"
            onClick={() => setSport("football")}
            className={`pb-1 transition ${
              currentSport === "football"
                ? "text-amber-300 border-b border-amber-300"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            Football
          </button>
          <button
            type="button"
            onClick={() => setSport("basketball")}
            className={`pb-1 transition ${
              currentSport === "basketball"
                ? "text-cyan-300 border-b border-cyan-300"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            Basketball
          </button>
        </nav>

        {/* Right: measurables + GPA (always visible) */}
        <div className="hidden md:flex items-end gap-4 text-[11px] uppercase tracking-[0.18em]">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="flex flex-col items-end leading-tight"
            >
              <span className="text-[10px] text-slate-500">
                {m.label}
              </span>
              <span className="text-xs font-semibold text-slate-100">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
