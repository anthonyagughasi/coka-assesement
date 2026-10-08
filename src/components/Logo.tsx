import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'stacked' | 'horizontal';
  color?: string; // e.g. '#2C2A29' or '#FBF9F5' or 'currentColor'
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'stacked',
  color = 'currentColor'
}) => {
  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-2 font-serif tracking-[0.14em] uppercase select-none ${className}`}>
        <span className="text-xl sm:text-2xl font-light text-[inherit]">CRYSTAL</span>
        <span className="text-xl sm:text-2xl font-normal text-[inherit]">KIZOR</span>
      </div>
    );
  }

  // The stacked editorial mark from the official identity
  return (
    <div className={`inline-flex flex-col items-center justify-center select-none leading-none ${className}`}>
      <svg
        viewBox="0 0 340 145"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain overflow-visible"
        aria-label="Crystal Kizor Logo"
        role="img"
      >
        <defs>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
            .ck-top {
              font-family: 'Cormorant Garamond', 'Didot', 'Bodoni MT', Georgia, serif;
              font-size: 68px;
              font-weight: 400;
              letter-spacing: 0.05em;
              text-anchor: middle;
            }
            .ck-bot {
              font-family: 'Cormorant Garamond', 'Didot', 'Bodoni MT', Georgia, serif;
              font-size: 68px;
              font-weight: 400;
              letter-spacing: 0.155em;
              text-anchor: middle;
            }
          `}</style>
        </defs>
        
        {/* Line 1: CRYSTAL */}
        <text
          x="170"
          y="62"
          className="ck-top"
          fill={color}
        >
          CRYSTAL
        </text>

        {/* Line 2: KIZOR (Wide letter spacing matching exact brand lockup) */}
        <text
          x="170"
          y="130"
          className="ck-bot"
          fill={color}
        >
          KIZOR
        </text>
      </svg>
    </div>
  );
};

export default Logo;
