import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/[0.07]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
              REPUTATION
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-tight text-white">
            WHAT PEOPLE SAY
          </h2>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-12 h-12 rounded-full border border-white/10 hover:border-crimson hover:bg-crimson/10 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono text-neutral-500 px-2">
            0{currentIndex + 1} / 0{testimonials.length}
          </span>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-12 h-12 rounded-full border border-white/10 hover:border-crimson hover:bg-crimson/10 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Testimonial Display Area */}
      <div className="relative min-h-[320px] md:min-h-[280px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-1 hidden lg:block text-crimson/40">
              <Quote className="w-12 h-12" />
            </div>

            <div className="lg:col-span-8">
              <blockquote className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white leading-relaxed">
                "{current.quote}"
              </blockquote>
            </div>

            <div className="lg:col-span-3 flex items-center gap-4 lg:border-l lg:border-white/10 lg:pl-8">
              <img
                src={current.avatar}
                alt={current.author}
                className="w-14 h-14 rounded-full object-cover border border-white/10 grayscale"
              />
              <div>
                <div className="text-base font-display font-bold text-white uppercase tracking-tight">
                  {current.author}
                </div>
                <div className="text-xs text-neutral-400 font-mono">
                  {current.role}
                </div>
                <div className="text-xs text-crimson font-mono">
                  {current.company}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
