/**
 * A simple flat-style illustration of a parent holding a child, with a
 * second child standing alongside — decorative accent for the hero's
 * bottom-left corner. Swap for a licensed illustration asset any time by
 * replacing this component's contents with an <Image> tag.
 */
export default function HeroFamily({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 260" className={className} aria-hidden="true">
      {/* ground shadow */}
      <ellipse cx="110" cy="252" rx="90" ry="8" fill="#0f172a" opacity="0.06" />

      {/* dad legs */}
      <rect x="72" y="180" width="18" height="65" rx="8" fill="#1e293b" />
      <rect x="98" y="180" width="18" height="65" rx="8" fill="#334155" />
      {/* dad shoes */}
      <rect x="68" y="238" width="26" height="12" rx="6" fill="#7c2d12" />
      <rect x="96" y="238" width="26" height="12" rx="6" fill="#7c2d12" />

      {/* dad body */}
      <rect x="55" y="110" width="80" height="85" rx="28" fill="#f59e0b" />
      {/* dad arm holding child */}
      <rect x="118" y="120" width="20" height="60" rx="10" fill="#f59e0b" />

      {/* dad head */}
      <circle cx="95" cy="85" r="30" fill="#fcd9b8" />
      {/* dad hair */}
      <path d="M65 80c0-22 18-38 30-38s30 16 30 38c-8-6-14-10-30-10s-22 4-30 10Z" fill="#4b2e1e" />
      {/* dad face */}
      <circle cx="86" cy="86" r="2.4" fill="#1e293b" />
      <circle cx="104" cy="86" r="2.4" fill="#1e293b" />
      <path d="M87 96q8 6 16 0" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* child on hip */}
      <g>
        <rect x="128" y="150" width="46" height="55" rx="20" fill="#38bdf8" />
        <circle cx="151" cy="132" r="20" fill="#fcd9b8" />
        <path d="M133 128c0-14 10-24 18-24s18 10 18 24c-6-4-11-6-18-6s-12 2-18 6Z" fill="#78350f" />
        <circle cx="145" cy="132" r="1.8" fill="#1e293b" />
        <circle cx="157" cy="132" r="1.8" fill="#1e293b" />
        <path d="M145 140q6 4 12 0" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </g>

      {/* second child standing, holding dad's hand */}
      <g>
        <rect x="18" y="150" width="20" height="80" rx="9" fill="#a78bfa" />
        <rect x="10" y="222" width="16" height="10" rx="5" fill="#7c2d12" />
        <rect x="30" y="222" width="16" height="10" rx="5" fill="#7c2d12" />
        <rect x="10" y="115" width="38" height="45" rx="16" fill="#f472b6" />
        <circle cx="29" cy="98" r="18" fill="#fcd9b8" />
        <path d="M12 96c0-12 8-20 17-20s17 8 17 20c-5-3-10-5-17-5s-12 2-17 5Z" fill="#4b2e1e" />
        <circle cx="24" cy="99" r="1.6" fill="#1e293b" />
        <circle cx="34" cy="99" r="1.6" fill="#1e293b" />
        <path d="M24 106q5 3 10 0" stroke="#1e293b" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        {/* holding hand arm */}
        <rect x="45" y="122" width="16" height="34" rx="8" fill="#f472b6" />
      </g>
    </svg>
  );
}