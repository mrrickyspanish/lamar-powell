'use client';

import { useState, useEffect } from "react";

export default function ShareBar() {
  const [origin, setOrigin] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<"football" | "basketball" | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const base = origin ?? "https://lamar-powell.vercel.app";
  const footballUrl = `${base}?sport=football`;
  const basketballUrl = `${base}?sport=basketball`;

  async function handleCopy(key: "football" | "basketball") {
    try {
      const url = key === "football" ? footballUrl : basketballUrl;
      await navigator.clipboard.writeText(url);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch (e) {
      console.error("Clipboard copy failed:", e);
    }
  }

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-5 md:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.26em] uppercase text-slate-500">
            Share LaMarin&apos;s profile
          </p>
          <p className="mt-1 text-xs text-slate-300">
            Quick links for staff and recruiting coordinators to view{" "}
            <span className="font-semibold">football</span> or{" "}
            <span className="font-semibold">basketball</span> film.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleCopy("football")}
            className="inline-flex items-center rounded-full border border-sky-400/60 bg-slate-950 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-100 hover:bg-slate-900 hover:scale-[1.02] hover:border-sky-400/80 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
          >
            {copiedKey === "football" ? (
              <>Copied ✓</>
            ) : (
              <>Copy Football Profile</>
            )}
            {copiedKey !== "football" && <span className="ml-2 text-sm">↗</span>}
          </button>

          <button
            type="button"
            onClick={() => handleCopy("basketball")}
            className="inline-flex items-center rounded-full border border-emerald-400/60 bg-slate-950 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-100 hover:bg-slate-900 hover:scale-[1.02] hover:border-emerald-400/80 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
          >
            {copiedKey === "basketball" ? (
              <>Copied ✓</>
            ) : (
              <>Copy Basketball Profile</>
            )}
            {copiedKey !== "basketball" && <span className="ml-2 text-sm">↗</span>}
          </button>
        </div>
      </div>
    </footer>
  );
}
