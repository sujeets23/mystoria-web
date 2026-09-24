import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
      {/* Abstract Red Atmospheric Glow & Graphic Elements */}
      <div 
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[750px] h-[550px] md:h-[750px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.16) 0%, rgba(139, 0, 0, 0.08) 35%, rgba(5, 5, 5, 0) 70%)',
        }}
      />

      {/* Floating Abstract Luminous Ring */}
      <motion.div
        aria-hidden="true"
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.35, 0.55, 0.35],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 right-[5%] md:right-[15%] w-72 md:w-96 h-72 md:h-96 rounded-full border border-crimson/20 pointer-events-none z-0 blur-[1px]"
      />

      {/* Top Meta Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400 border-b border-white/[0.08] pb-6"
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson" />
          </span>
          <span className="text-neutral-300 uppercase tracking-widest text-[11px]">
            AVAILABLE FOR SELECT COMMISSIONS — 2026
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-[11px] tracking-wider text-neutral-500 uppercase">
          <span>PARIS</span>
          <span className="text-crimson/50">•</span>
          <span>NEW YORK</span>
          <span className="text-crimson/50">•</span>
          <span>TOKYO</span>
        </div>
      </motion.div>

      {/* Main Hero Typography & Callouts */}
      <div className="relative z-10 my-auto py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4 inline-flex items-center gap-2"
        >
          <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-300 bg-white/[0.04] border border-white/[0.08]">
            INDEPENDENT CREATIVE STUDIO
          </span>
        </motion.div>

        {/* Oversized Headline with Mask Reveal */}
        <div className="space-y-1 md:space-y-2">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-display font-extrabold uppercase tracking-tighter text-white leading-[0.92]"
            >
              WE CREATE DIGITAL
            </motion.h1>
          </div>

          <div className="overflow-hidden flex flex-wrap items-baseline gap-3 md:gap-6">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-display font-extrabold uppercase tracking-tighter text-white leading-[0.92]"
            >
              EXPERIENCES
            </motion.h1>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hidden lg:inline-block text-crimson text-3xl lg:text-5xl font-mono"
            >
              [ 01 ]
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-display font-extrabold uppercase tracking-tighter leading-[0.92] text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500"
            >
              THAT MATTER.
            </motion.h1>
          </div>
        </div>

        {/* Subtitle & CTA Row */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="md:col-span-6 lg:col-span-5 text-base md:text-lg text-neutral-400 font-light leading-relaxed"
          >
            An independent creative studio building brands, digital experiences and visual systems for ambitious businesses that refuse to compromise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="md:col-span-6 lg:col-span-7 flex flex-wrap items-center gap-4 md:justify-end"
          >
            <Link
              to="/work"
              data-cursor="view"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-crimson hover:bg-crimson-bright text-white font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.6)]"
            >
              <span>View Our Work</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/contact"
              data-cursor="cta"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#111111] hover:bg-[#161616] text-white border border-white/10 hover:border-crimson/50 font-display font-semibold text-sm tracking-wider uppercase transition-all duration-300"
            >
              <span>Start a Project</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar: Scroll Indicator & Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative z-10 pt-8 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-500 font-mono"
      >
        <div className="flex items-center gap-2">
          <ArrowDown className="w-3.5 h-3.5 text-crimson animate-bounce" />
          <span className="tracking-widest uppercase">SCROLL TO EXPLORE</span>
        </div>

        <div className="hidden sm:flex items-center gap-8">
          <div>
            <span className="text-white font-display font-bold">AWWWARDS</span> SOTD × 4
          </div>
          <div>
            <span className="text-white font-display font-bold">FWA</span> OF THE MONTH × 2
          </div>
          <div>
            <span className="text-white font-display font-bold">RED DOT</span> BEST OF BEST
          </div>
        </div>
      </motion.div>
    </section>
  );
};
