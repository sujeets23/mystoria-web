import React from 'react';
import { motion } from 'framer-motion';

export const WhyMystoria: React.FC = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/[0.07] overflow-hidden">
      {/* Dramatic Center Ambient Red Glow */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-crimson/15 blur-[140px] pointer-events-none"
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
          <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
            WHY MYSTORIA
          </span>
        </div>

        {/* Monolithic Typography Block */}
        <div className="space-y-2 sm:space-y-4 my-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-display font-extrabold uppercase tracking-tighter text-white"
          >
            NO TEMPLATES.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-display font-extrabold uppercase tracking-tighter text-crimson text-glow"
          >
            NO BORING.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-display font-extrabold uppercase tracking-tighter text-neutral-500"
          >
            NO SHORTCUTS.
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 sm:mt-14 max-w-2xl text-base sm:text-xl text-neutral-300 font-light leading-relaxed text-center"
        >
          We believe good digital work should have a point of view. Every project is designed around its own story, audience and ambition. When you work with us, you get our complete obsession.
        </motion.p>
      </div>
    </section>
  );
};
