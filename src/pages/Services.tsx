import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import { Process } from '../components/Process';
import { CTA } from '../components/CTA';

export const ServicesPage: React.FC = () => {
  return (
    <main className="relative pt-32 md:pt-44">
      {/* Background Glow */}
      <div 
        aria-hidden="true"
        className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-crimson/10 blur-[150px] pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="border-b border-white/[0.08] pb-16 mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
              GROWTH STUDIO CAPABILITIES
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-display font-extrabold uppercase tracking-tight text-white max-w-5xl leading-[1.02]">
            FIVE DISCIPLINES.{' '}
            <span className="text-crimson">ONE VISION.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed">
            A partner for every company with vision. We combine algorithmic search dominance, creator-led virality, data-obsessed performance media, cinematic ad production, and narrative social strategy into an unrelenting growth engine.
          </p>
        </div>

        {/* Detailed Services Breakdown */}
        <div className="space-y-16 md:space-y-24 pb-24 border-b border-white/[0.08]">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 sm:p-12 md:p-16 rounded-3xl bg-[#0A0A0A] border border-white/[0.08] hover:border-crimson/40 transition-colors group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-3xl font-extrabold text-crimson">
                      {service.number}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                      {service.tag}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-neutral-300 font-medium mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {service.image && (
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 group-hover:border-crimson/30 transition-colors">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}
                </div>

                <div className="lg:col-span-7 pt-6 lg:pt-0 lg:border-l lg:border-white/[0.08] lg:pl-12">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-6">
                    CORE DELIVERABLES &amp; CAPABILITIES
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.capabilities.map((capability, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-crimson/30 transition-colors flex items-start gap-3"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson mt-2 shrink-0" />
                        <span className="text-sm text-neutral-300 font-light">
                          {capability}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Integrate the 5-step methodology */}
      <Process />

      <CTA />
    </main>
  );
};
