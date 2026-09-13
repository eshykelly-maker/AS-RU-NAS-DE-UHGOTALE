import React from 'react';

interface PixelFriskProps {
  direction?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  isWalking?: boolean;
  className?: string;
}

export const PixelFrisk: React.FC<PixelFriskProps> = ({
  direction = 'DOWN',
  isWalking = false,
  className = '',
}) => {
  return (
    <div className={`relative w-8 h-10 select-none ${isWalking ? 'animate-bounce' : ''} ${className}`}>
      <svg
        viewBox="0 0 16 20"
        className="w-full h-full pixelated"
        shapeRendering="crispEdges"
      >
        {/* Hair Base */}
        <rect x="3" y="1" width="10" height="7" fill="#3b200a" />
        
        {/* Face */}
        {direction !== 'UP' && (
          <>
            <rect x="4" y="5" width="8" height="4" fill="#fce0a6" />
            <rect x="5" y="6" width="2" height="1" fill="#000000" />
            <rect x="9" y="6" width="2" height="1" fill="#000000" />
            <rect x="7" y="8" width="2" height="1" fill="#8d5b4c" />
          </>
        )}

        {/* Torso Blue Shirt */}
        <rect x="3" y="9" width="10" height="6" fill="#2563eb" />
        
        {/* Pink Stripes */}
        <rect x="3" y="11" width="10" height="1" fill="#db2777" />
        <rect x="3" y="13" width="10" height="1" fill="#db2777" />

        {/* Pants & Shoes */}
        <rect x="4" y="15" width="3" height="4" fill="#1e3a8a" />
        <rect x="9" y="15" width="3" height="4" fill="#1e3a8a" />
        <rect x="4" y="18" width="3" height="1" fill="#831843" />
        <rect x="9" y="18" width="3" height="1" fill="#831843" />
      </svg>
    </div>
  );
};
