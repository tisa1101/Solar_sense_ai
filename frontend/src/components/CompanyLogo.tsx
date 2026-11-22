import React from 'react';

interface CompanyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtitle?: string;
  className?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  size = 'md',
  showText = true,
  subtitle = 'AI NEURAL GRID',
  className = ''
}) => {
  // Dimensions map
  const iconSize = {
    sm: { box: 30, svg: 18, text: 'text-sm', sub: 'text-[8px]', gap: 'gap-2' },
    md: { box: 38, svg: 22, text: 'text-base', sub: 'text-[9px]', gap: 'gap-2.5' },
    lg: { box: 48, svg: 28, text: 'text-xl', sub: 'text-[10px]', gap: 'gap-3' },
    xl: { box: 56, svg: 34, text: 'text-2xl', sub: 'text-[11px]', gap: 'gap-3.5' }
  }[size];

  return (
    <div className={`inline-flex items-center ${iconSize.gap} group select-none ${className}`}>
      {/* Bespoke GTA VI Vice City Solar Crest Icon */}
      <div
        className="relative flex items-center justify-center rounded-2xl shadow-[0_0_25px_rgba(255,46,147,0.45)] group-hover:scale-105 group-hover:shadow-[0_0_35px_rgba(255,122,0,0.6)] transition-all duration-300"
        style={{
          width: iconSize.box,
          height: iconSize.box,
          background: 'linear-gradient(135deg, #FF2E93 0%, #FF7A00 50%, #FFD166 100%)',
          padding: '2px'
        }}
      >
        {/* Inner Dark Core */}
        <div className="w-full h-full rounded-[14px] bg-[#0A0514]/90 flex items-center justify-center relative overflow-hidden backdrop-blur-md">
          {/* Subtle Ambient Radial Ray Flare */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,46,147,0.35)_0%,transparent_70%)]" />

          {/* Precision Geometric Solar Ray Vector */}
          <svg
            width={iconSize.svg}
            height={iconSize.svg}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 transition-transform duration-500 group-hover:rotate-45"
          >
            <defs>
              <linearGradient id="viceSunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF2E93" />
                <stop offset="50%" stopColor="#FF7A00" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>
              <linearGradient id="viceCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FFD166" />
              </linearGradient>
            </defs>

            {/* Concentric Solar Orbit Ring */}
            <circle cx="16" cy="16" r="14" stroke="url(#viceSunGrad)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />

            {/* 8 Cardinal & Diagonal Solar Blades (Vice City Sunburst) */}
            <path d="M16 2L18.5 10L16 12L13.5 10L16 2Z" fill="url(#viceSunGrad)" />
            <path d="M16 30L13.5 22L16 20L18.5 22L16 30Z" fill="url(#viceSunGrad)" />
            <path d="M2 16L10 13.5L12 16L10 18.5L2 16Z" fill="url(#viceSunGrad)" />
            <path d="M30 16L22 18.5L20 16L22 13.5L30 16Z" fill="url(#viceSunGrad)" />

            <path d="M6.1 6.1L12.5 9.5L13.5 12.5L10.5 13.5L6.1 6.1Z" fill="#FF2E93" opacity="0.85" />
            <path d="M25.9 25.9L19.5 22.5L18.5 19.5L21.5 18.5L25.9 25.9Z" fill="#FF7A00" opacity="0.85" />
            <path d="M25.9 6.1L22.5 12.5L19.5 13.5L18.5 10.5L25.9 6.1Z" fill="#00F0FF" opacity="0.85" />
            <path d="M6.1 25.9L9.5 19.5L12.5 18.5L13.5 21.5L6.1 25.9Z" fill="#FFD166" opacity="0.85" />

            {/* Central Photon Nuclear Core */}
            <circle cx="16" cy="16" r="4.5" fill="url(#viceCoreGrad)" />
            <circle cx="16" cy="16" r="2" fill="#0A0514" />
          </svg>
        </div>
      </div>

      {/* Brand Typography (Rockstar Editorial Style) */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-black tracking-wider text-white uppercase font-['Plus_Jakarta_Sans',sans-serif] ${iconSize.text}`}
            >
              SOLARSENSE
            </span>
            <span className="text-[#FF2E93] text-xs leading-none">✦</span>
          </div>
          {subtitle && (
            <span
              className={`font-mono font-bold tracking-[0.2em] text-[#FF7A00] uppercase mt-0.5 leading-none ${iconSize.sub}`}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
