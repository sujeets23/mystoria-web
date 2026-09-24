import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

export const CTA: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@mystoria.agency');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
      {/* Dramatic Atmospheric Crimson Flare */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[400px] md:h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.22) 0%, rgba(139, 0, 0, 0.1) 45%, rgba(5, 5, 5, 0) 75%)',
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
          <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
            NEXT STEPS
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-extrabold uppercase tracking-tighter text-white">
            HAVE AN IDEA?
          </h2>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-extrabold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-crimson via-red-500 to-white">
            LET'S MAKE IT REAL.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 md:mt-8 max-w-xl text-base sm:text-lg text-neutral-300 font-light leading-relaxed"
        >
          Tell us what you're building. We'll figure out the rest. Currently booking commissions for Q2 & Q3 2026.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            to="/contact"
            data-cursor="cta"
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-crimson hover:bg-crimson-bright text-white font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.45)] hover:shadow-[0_0_45px_rgba(220,38,38,0.7)]"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#111111] hover:bg-[#161616] border border-white/10 hover:border-crimson/50 text-neutral-300 hover:text-white font-mono text-xs tracking-wider uppercase transition-all duration-300"
          >
            <span>hello@mystoria.agency</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-crimson" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
            )}
          </button>
        </motion.div>

        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-xs font-mono text-crimson uppercase tracking-widest"
          >
            ✓ EMAIL COPIED TO CLIPBOARD
          </motion.div>
        )}
      </div>
    </section>
  );
};
