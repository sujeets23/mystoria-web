import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { CTA } from '../components/CTA';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  // Next project logic for infinite exploration
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="relative pt-28 md:pt-36">
      {/* Background Ambience */}
      <div 
        aria-hidden="true"
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-crimson/10 blur-[150px] pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1 text-crimson" />
            <span>BACK TO ARCHIVE</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="border-b border-white/[0.08] pb-12 mb-12 md:mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-white/[0.05] border border-white/10">
              {project.category}
            </span>
            <span className="text-xs font-mono text-neutral-500 uppercase">
              YEAR {project.year}
            </span>
            <span className="text-xs font-mono text-crimson uppercase">
              // CLIENT: {project.client}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-extrabold uppercase tracking-tight text-white leading-[0.95]">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed">
            {project.tagline}
          </p>

          {/* Project Quick Meta Grid */}
          <div className="mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
            <div>
              <span className="text-neutral-500 uppercase block mb-1">CLIENT</span>
              <span className="text-white">{project.client}</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase block mb-1">SECTOR</span>
              <span className="text-white">{project.category}</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase block mb-1">SERVICES</span>
              <span className="text-white">{project.services.join(' · ')}</span>
            </div>
            <div>
              <span className="text-neutral-500 uppercase block mb-1">TIMELINE</span>
              <span className="text-white">10 WEEKS COMMISSION</span>
            </div>
          </div>
        </div>

        {/* Hero Image Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden border border-white/[0.08] mb-20 md:mb-32 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          <div className="aspect-[16/9] md:aspect-[21/9] w-full">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover grayscale-[15%] contrast-[110%]"
            />
          </div>
        </motion.div>

        {/* Editorial Story Layout: Challenge, Approach & Execution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 md:pb-28 border-b border-white/[0.08]">
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">
              <span className="text-xs font-mono tracking-[0.2em] text-crimson uppercase block">
                // CASE STUDY OVERVIEW
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white">
                THE NARRATIVE &amp; ARCHITECTURE
              </h2>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-16">
            {/* The Challenge */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0E0E0E] border border-white/[0.07]">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                  PHASE 01
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white mb-4">
                THE CHALLENGE
              </h3>
              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* The Approach */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0E0E0E] border border-white/[0.07]">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                  PHASE 02
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white mb-4">
                THE APPROACH
              </h3>
              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                {project.approach}
              </p>
            </div>

            {/* The Execution */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0E0E0E] border border-white/[0.07]">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                  PHASE 03
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white mb-4">
                THE EXECUTION
              </h3>
              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                {project.execution}
              </p>
            </div>
          </div>
        </div>

        {/* Visual Gallery Section */}
        <div className="py-20 md:py-28 border-b border-white/[0.08]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono tracking-[0.2em] text-crimson uppercase block mb-2">
                // VISUAL SYSTEMS
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase text-white">
                PROJECT GALLERY
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500 uppercase">
              ART DIRECTION × COMPOSITION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((imgUrl, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A]"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`${project.title} detail ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Result & Key Impact Metrics */}
        <div className="py-20 md:py-28 border-b border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono tracking-[0.2em] text-crimson uppercase block mb-2">
                // MEASURABLE IMPACT
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase text-white mb-6">
                THE RESULT
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                {project.result}
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-[#0E0E0E] border border-white/[0.08] hover:border-crimson/50 transition-colors"
                >
                  <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight block text-glow">
                    {metric.value}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest mt-2 block">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Project Teaser */}
        <div className="py-20 md:py-28">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-4">
            NEXT CASE STUDY →
          </span>
          <Link
            to={`/work/${nextProject.slug}`}
            data-cursor="view"
            className="group block relative rounded-2xl p-8 sm:p-12 md:p-16 bg-[#0E0E0E] border border-white/[0.08] hover:border-crimson transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-crimson uppercase tracking-widest block mb-2">
                  0{projectIndex + 2 > projects.length ? 1 : projectIndex + 2} — {nextProject.category}
                </span>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold uppercase text-white group-hover:text-crimson transition-colors">
                  {nextProject.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-neutral-400 font-light max-w-xl">
                  {nextProject.tagline}
                </p>
              </div>

              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-crimson group-hover:shadow-[0_0_25px_#DC2626] transition-all duration-300">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <CTA />
    </main>
  );
};
