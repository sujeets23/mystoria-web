import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';

export const SelectedWork: React.FC = () => {
  // Highlight top 4 curated projects for the editorial asymmetric grid
  const featuredProjects = projects.slice(0, 4);

  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/[0.07]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
              PORTFOLIO ARCHIVE
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold uppercase tracking-tight text-white">
            SELECTED WORK
          </h2>
        </div>

        <Link
          to="/work"
          className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
        >
          <span>VIEW ALL 18 ARCHIVED WORKS</span>
          <ArrowRight className="w-4 h-4 text-crimson transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="space-y-12 md:space-y-16">
        {/* Project 1: Monolithic Full-Width Showcase */}
        {featuredProjects[0] && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to={`/work/${featuredProjects[0].slug}`}
              data-cursor="view"
              className="group block relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/[0.08] hover:border-crimson/50 transition-all duration-500"
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
                <img
                  src={featuredProjects[0].heroImage}
                  alt={featuredProjects[0].title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[35%] contrast-[110%] group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
                
                {/* Floating Category Badge */}
                <div className="absolute top-6 left-6 md:top-8 md:left-8">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-black/70 backdrop-blur-md border border-white/10">
                    {featuredProjects[0].category} — {featuredProjects[0].year}
                  </span>
                </div>

                {/* Bottom Metadata Reveal */}
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="max-w-xl">
                    <span className="text-xs font-mono text-crimson uppercase tracking-widest block mb-1">
                      FEATURED CASE STUDY
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white group-hover:text-white transition-colors">
                      {featuredProjects[0].title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-neutral-300 font-light line-clamp-2">
                      {featuredProjects[0].tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-xs font-mono tracking-widest text-neutral-400 group-hover:text-crimson uppercase transition-colors">
                      EXPLORE CASE STUDY
                    </span>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-crimson group-hover:shadow-[0_0_20px_#DC2626] transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* 2-Column Offset Row: Projects 2 and 3 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {featuredProjects[1] && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="md:col-span-7"
            >
              <Link
                to={`/work/${featuredProjects[1].slug}`}
                data-cursor="view"
                className="group block relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/[0.08] hover:border-crimson/50 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={featuredProjects[1].heroImage}
                    alt={featuredProjects[1].title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[30%] contrast-[110%] group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-6 left-6">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-black/70 backdrop-blur-md border border-white/10">
                      {featuredProjects[1].category}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                        {featuredProjects[1].client}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                        {featuredProjects[1].title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-crimson transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {featuredProjects[2] && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-5 md:pt-12"
            >
              <Link
                to={`/work/${featuredProjects[2].slug}`}
                data-cursor="view"
                className="group block relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/[0.08] hover:border-crimson/50 transition-all duration-500"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={featuredProjects[2].heroImage}
                    alt={featuredProjects[2].title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[30%] contrast-[110%] group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />

                  <div className="absolute top-6 left-6">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-black/70 backdrop-blur-md border border-white/10">
                      {featuredProjects[2].category}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                        {featuredProjects[2].client}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                        {featuredProjects[2].title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-crimson transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Project 4: Wide Horizontal Layout */}
        {featuredProjects[3] && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to={`/work/${featuredProjects[3].slug}`}
              data-cursor="view"
              className="group block relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/[0.08] hover:border-crimson/50 transition-all duration-500"
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
                <img
                  src={featuredProjects[3].heroImage}
                  alt={featuredProjects[3].title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[35%] contrast-[110%] group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90" />

                <div className="absolute top-6 left-6">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-black/70 backdrop-blur-md border border-white/10">
                    {featuredProjects[3].category} — {featuredProjects[3].year}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="max-w-xl">
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                      {featuredProjects[3].client}
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white">
                      {featuredProjects[3].title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-neutral-300 font-light line-clamp-2">
                      {featuredProjects[3].tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-xs font-mono tracking-widest text-neutral-400 group-hover:text-crimson uppercase transition-colors">
                      VIEW CASE STUDY
                    </span>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-crimson transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
