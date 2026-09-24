import React from 'react';
import { motion } from 'framer-motion';

export const Stats: React.FC = () => {
  const stats = [
    { value: '20+', label: 'COMPLETED PROJECTS', detail: 'Across North America, Europe, & Asia' },
    { value: '10+', label: 'GLOBAL BRANDS', detail: 'From seed-stage to luxury conglomerates' },
    { value: '05+', label: 'CORE INDUSTRIES', detail: 'Horology, AI, Architecture, Sound, Fashion' },
    { value: '∞', label: 'UNCOMPROMISED IDEAS', detail: 'Every commission designed bespoke' },
  ];

  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/[0.07]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col border-l border-white/[0.08] pl-6 md:pl-8 group hover:border-crimson transition-colors duration-300"
          >
            <span className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tighter group-hover:text-crimson transition-colors duration-300">
              {stat.value}
            </span>
            <span className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-neutral-300 uppercase">
              {stat.label}
            </span>
            <span className="mt-1 text-xs text-neutral-500 font-light hidden sm:block">
              {stat.detail}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
