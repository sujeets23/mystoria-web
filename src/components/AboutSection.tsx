import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/[0.07]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Label & Index */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="sticky top-28 flex flex-col gap-4"
          >
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
              <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
                WHO WE ARE
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-600 uppercase">
              // STUDIO ETHOS
            </span>
          </motion.div>
        </div>

        {/* Right Column: Statement & Supporting Copy */}
        <div className="lg:col-span-9 flex flex-col gap-10 md:gap-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-display font-bold uppercase tracking-tight text-white leading-[1.08]"
          >
            WE BUILD BRANDS AND DIGITAL EXPERIENCES THAT{' '}
            <span className="text-crimson underline decoration-crimson/40 underline-offset-8">
              REFUSE TO BLEND IN.
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4 border-t border-white/[0.08]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-8 text-lg sm:text-xl text-neutral-400 font-light leading-relaxed"
            >
              Mystoria is a creative studio focused on building distinctive identities, digital experiences and visual systems for brands with something worth saying. We eliminate the generic, the templated, and the derivative in favor of work with genuine gravity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:col-span-4 flex flex-col gap-6 md:items-end"
            >
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest leading-loose">
                <div>EST. 2021</div>
                <div>NEW YORK × TOKYO</div>
                <div>INDEPENDENT & PRIVATELY HELD</div>
              </div>

              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white hover:text-crimson transition-colors"
              >
                <span>READ MANIFESTO</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
