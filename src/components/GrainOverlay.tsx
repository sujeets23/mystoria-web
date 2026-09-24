import React from 'react';

export const GrainOverlay: React.FC = () => {
  return (
    <div 
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{ opacity: 0.035 }}
    >
      <svg 
        className="w-full h-full object-cover" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="mystoria-noise">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#mystoria-noise)" />
      </svg>
    </div>
  );
};
