import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Filter } from 'lucide-react';
import { projects } from '../data/projects';
import { CTA } from '../components/CTA';

export const Work: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Branding', 'Digital', 'Motion', 'Experience'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <main className="relative pt-32 md:pt-44">
      {/* Background Glow */}
      <div 
        aria-hidden="true"
        className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-crimson/10 blur-[150px] pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="border-b border-white/[0.08] pb-12 mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
              SELECTED PORTFOLIO
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase tracking-tight text-white">
              ARCHIVED WORKS
            </h1>
            <p className="max-w-md text-sm md:text-base text-neutral-400 font-light leading-relaxed">
              Every commission represents a bespoke design and engineering effort. We do not recycle solutions across clients.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-12 flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5 mr-3 text-xs font-mono text-neutral-500 uppercase">
              <Filter className="w-3.5 h-3.5" />
              <span>FILTER:</span>
            </div>
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                    isSelected
                      ? 'bg-crimson text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                      : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.07] hover:border-white/20'
                  }`}
                >
                  {category}
                  <span className="ml-1.5 opacity-60 text-[10px]">
                    {category === 'All' 
                      ? projects.length 
                      : projects.filter((p) => p.category === category).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12 md:space-y-16 pb-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Link
                    to={`/work/${project.slug}`}
                    data-cursor="view"
                    className="group block relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/[0.08] hover:border-crimson/50 transition-all duration-500"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                      {/* Visual Container */}
                      <div className={`lg:col-span-8 overflow-hidden relative aspect-[16/10] ${!isEven ? 'lg:order-2' : ''}`}>
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale-[25%] contrast-[110%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                        
                        {/* Hover badge */}
                        <div className="absolute top-6 left-6">
                          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-black/70 backdrop-blur-md border border-white/10">
                            {project.category} — {project.year}
                          </span>
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="lg:col-span-4 p-8 sm:p-10 md:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/[0.08]">
                        <div>
                          <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
                            <span className="text-xs font-mono text-crimson uppercase tracking-widest">
                              // {project.id}
                            </span>
                            <span className="text-xs font-mono text-neutral-500 uppercase">
                              {project.client}
                            </span>
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white mb-4 group-hover:text-white transition-colors">
                            {project.title}
                          </h2>
                          <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                            {project.tagline}
                          </p>

                          {/* Services tags */}
                          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                            {project.services.slice(0, 3).map((s, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded text-[11px] font-mono text-neutral-300 bg-white/[0.03] border border-white/[0.06]"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card bottom action */}
                        <div className="pt-8 mt-8 border-t border-white/[0.06] flex items-center justify-between">
                          <span className="text-xs font-mono uppercase tracking-widest text-white group-hover:text-crimson transition-colors">
                            VIEW CASE STUDY
                          </span>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-crimson group-hover:shadow-[0_0_15px_#DC2626] transition-all duration-300">
                            <ArrowUpRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <CTA />
    </main>
  );
};
