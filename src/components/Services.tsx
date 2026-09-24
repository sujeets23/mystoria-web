import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';

export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/[0.07]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
              CAPABILITIES
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-tight text-white">
            WHAT WE DO
          </h2>
        </div>

        <p className="max-w-md text-sm md:text-base text-neutral-400 font-light leading-relaxed">
          Four distinct creative practices engineered to operate synchronously, delivering monolithic brand authority from strategy to production code.
        </p>
      </div>

      {/* Interactive Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {services.map((service, index) => {
          const isHovered = activeService === service.id;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
              className="group relative rounded-2xl bg-[#0E0E0E] p-8 sm:p-10 md:p-12 border border-white/[0.07] hover:border-crimson/60 transition-all duration-500 flex flex-col justify-between overflow-hidden"
              style={{
                transform: isHovered ? 'translateY(-6px)' : 'translateY(0px)',
              }}
            >
              {/* Subtle Red Radial Glow on Hover */}
              <div
                aria-hidden="true"
                className={`absolute top-0 right-0 w-96 h-96 rounded-full bg-crimson/10 blur-[100px] pointer-events-none transition-opacity duration-700 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Card Top: Number & Tag */}
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-8">
                  <span
                    className={`font-mono text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                      isHovered ? 'text-crimson' : 'text-neutral-500'
                    }`}
                  >
                    {service.number}
                  </span>
                  <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                    {service.tag}
                  </span>
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-base text-neutral-300 font-medium mb-4">
                  {service.subtitle}
                </p>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Capability Bullet Tags */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-6 border-t border-white/[0.06]">
                  {service.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                      <span className="w-1 h-1 rounded-full bg-crimson/60" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer: Action */}
              <div className="pt-8 mt-8 border-t border-white/[0.08] flex items-center justify-between">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white group-hover:text-crimson transition-colors"
                >
                  <span>EXPLORE SERVICE</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
                <span className="text-[10px] font-mono text-neutral-600 uppercase">
                  DELIVERY: 3–8 WEEKS
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
