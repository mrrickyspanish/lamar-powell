'use client';

export default function CoachTestimonial() {
  return (
    <section className="bg-slate-950/60 py-8 px-4 border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-950/30 border border-white/10 p-8 md:p-10">
          <div className="absolute top-0 left-8 -translate-y-1/2">
            <div className="bg-slate-800 border border-white/20 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
          </div>
          
          <blockquote className="text-center pt-4">
            <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed mb-4">
              "LaMarin is the kind of athlete who makes everyone around him better — disciplined, coachable, and team-first."
            </p>
            <cite className="not-italic text-sm text-slate-400">
              — Coach Mike Henderson, Elgin High School
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
