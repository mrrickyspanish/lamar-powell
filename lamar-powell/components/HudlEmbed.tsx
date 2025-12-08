"use client";

import { useState } from "react";

interface HudlEmbedProps {
  src: string;
  title?: string;
}

export default function HudlEmbed({ src, title = "LaMarin Powell Highlights" }: HudlEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full pt-[56.25%]">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm bg-slate-950/60 rounded-2xl">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
            <span>Loading verified Hudl film…</span>
          </div>
        </div>
      )}

      <iframe
        src={src}
        title={title}
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
