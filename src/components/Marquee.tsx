import React from 'react';
import { motion } from 'framer-motion';

export const Marquee: React.FC = () => {
  const items = [
    'GROWTH STUDIO',
    'SEO DOMINANCE',
    'INFLUENCER MARKETING',
    'PERFORMANCE MARKETING',
    'PRODUCTION AND ADS',
    'SOCIAL MEDIA MANAGEMENT',
    'PARTNER FOR COMPANIES WITH VISION',
    'DATA-DRIVEN SCALE',
  ];

  return (
    <section aria-label="Services ticker" className="relative py-6 bg-[#050505] overflow-hidden border-y border-crimson/40">
      {/* Subtle red ambient strip behind marquee */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-crimson/[0.03] pointer-events-none" 
      />

      <div className="flex select-none whitespace-nowrap overflow-hidden">
        {/* We duplicate the stream twice for smooth infinite loop */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          }}
          className="flex items-center gap-10 md:gap-14 whitespace-nowrap pr-10 md:pr-14 will-change-transform"
        >
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <div key={index} className="flex items-center gap-10 md:gap-14">
              <span className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-white/90 hover:text-crimson transition-colors duration-300">
                {item}
              </span>
              <span className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_8px_#DC2626]" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
