export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-sky-50 to-lime-50" />

      {/* soft clouds */}
      <div className="absolute left-[8%] top-10 h-16 w-32 rounded-full bg-white/70 blur-xl" />
      <div className="absolute left-[38%] top-6 h-14 w-40 rounded-full bg-white/60 blur-xl" />
      <div className="absolute right-[10%] top-16 h-16 w-36 rounded-full bg-white/60 blur-xl" />

      {/* kite */}
      <div className="absolute right-[28%] top-4 hidden sm:block" style={{ animation: "kite-sway 4s ease-in-out infinite" }}>
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <path d="M35 4 62 35 35 66 8 35Z" fill="url(#kiteGrad)" stroke="#334155" strokeWidth="1" />
          <path d="M35 4V66M8 35H62" stroke="#334155" strokeWidth="0.75" />
          <defs>
            <linearGradient id="kiteGrad" x1="8" y1="4" x2="62" y2="66" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" />
              <stop offset="0.5" stopColor="#60a5fa" />
              <stop offset="1" stopColor="#f472b6" />
            </linearGradient>
          </defs>
        </svg>
        {/* tail */}
        <svg width="16" height="90" viewBox="0 0 16 90" fill="none" className="absolute left-1/2 top-[64px] -translate-x-1/2">
          <path d="M8 0C8 20 0 20 0 40S16 60 16 80" stroke="#94a3b8" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* birds */}
      <Bird className="left-[6%] top-20 h-5 w-8 text-rose-300/70" duration={3.4} delay={0} />
      <Bird className="left-[16%] top-40 h-4 w-6 text-slate-400/60" duration={3} delay={0.6} />
      <Bird className="right-[6%] top-24 h-6 w-9 text-sky-400/60" duration={3.8} delay={0.3} />
      <Bird className="right-[16%] top-44 h-4 w-6 text-slate-400/60" duration={3.2} delay={1} />

      {/* house, bottom right */}
      <svg
        className="absolute -right-4 bottom-0 h-40 w-40 text-amber-800/20 sm:h-48 sm:w-48"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path d="M10 55 50 25 90 55" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <rect x="20" y="55" width="60" height="40" stroke="currentColor" strokeWidth="4" />
        <rect x="42" y="70" width="16" height="25" stroke="currentColor" strokeWidth="3" />
        <rect x="26" y="62" width="12" height="12" stroke="currentColor" strokeWidth="3" />
      </svg>

      {/* rolling hill at the bottom */}
      <svg
        className="absolute bottom-0 left-0 h-28 w-full sm:h-36"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120 C200 60 400 160 650 100 C850 55 1050 130 1200 90 L1200 200 L0 200Z"
          fill="#bbf7d0"
          opacity="0.7"
        />
        <path
          d="M0 150 C250 110 450 190 700 140 C900 105 1050 170 1200 140 L1200 200 L0 200Z"
          fill="#86efac"
          opacity="0.8"
        />
      </svg>

      <style>{`
        @keyframes kite-sway {
          0%, 100% { transform: translate(0, 0) rotate(-3deg); }
          50% { transform: translate(6px, 8px) rotate(3deg); }
        }
        @keyframes bird-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

function Bird({
  className,
  duration = 3,
  delay = 0,
}: {
  className?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <svg
      viewBox="0 0 32 20"
      fill="none"
      className={`absolute ${className}`}
      style={{ animation: `bird-bob ${duration}s ease-in-out ${delay}s infinite` }}
    >
      <path
        d="M1 12C5 6 10 6 16 10C22 6 27 6 31 12C25 11 21 13 16 17C11 13 7 11 1 12Z"
        fill="currentColor"
      />
    </svg>
  );
}