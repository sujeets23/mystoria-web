import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { processSteps } from '../data/process';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="relative py-28 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/[0.07]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
              METHODOLOGY
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-tight text-white">
            HOW WE WORK
          </h2>
        </div>

        <p className="max-w-md text-sm md:text-base text-neutral-400 font-light leading-relaxed">
          A rigorous 5-stage creative architecture engineered to eliminate ambiguity and produce iconic, market-defining outcomes.
        </p>
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="relative">
        {/* Continuous background vertical line */}
        <div 
          aria-hidden="true"
          className="absolute left-4 sm:left-8 top-4 bottom-4 w-[1px] bg-white/[0.08]"
        />

        <div className="space-y-12 md:space-y-16">
          {processSteps.map((step, idx) => {
            const isActive = activeStep === idx;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => setActiveStep(idx)}
                className={`relative pl-12 sm:pl-20 group transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {/* Timeline node with dynamic crimson indicator */}
                <div
                  className={`absolute left-4 sm:left-8 top-2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-crimson bg-[#050505] shadow-[0_0_12px_#DC2626] scale-125'
                      : 'border-white/20 bg-[#050505] group-hover:border-crimson/50'
                  }`}
                >
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-crimson mx-auto mt-[3px]" />
                  )}
                </div>

                {/* Content Box */}
                <div className="p-8 sm:p-10 rounded-2xl bg-[#0A0A0A]/60 border border-white/[0.06] hover:border-white/15 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Index & Title */}
                    <div className="lg:col-span-5 flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono text-3xl sm:text-5xl font-extrabold text-neutral-600 group-hover:text-crimson transition-colors duration-300">
                        {step.number}
                      </span>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-mono text-crimson uppercase tracking-wider mt-1">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description & Deliverables */}
                    <div className="lg:col-span-7 space-y-5">
                      <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                        {step.description}
                      </p>

                      <div className="pt-4 border-t border-white/[0.06]">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                          KEY DELIVERABLES
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {step.deliverables.map((item, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded text-xs font-mono text-neutral-300 bg-white/[0.04] border border-white/[0.06]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
