'use client';

export default function HudlVerified() {
  return (
    <div className="inline-flex items-center gap-1.5 bg-[#FF6600]/10 border border-[#FF6600]/30 rounded-full px-3 py-1 backdrop-blur-sm">
      <svg 
        className="w-3 h-3 text-[#FF6600]" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
          clipRule="evenodd" 
        />
      </svg>
      <span className="text-xs font-semibold text-[#FF6600]">
        Verified by Hudl
      </span>
    </div>
  );
}
