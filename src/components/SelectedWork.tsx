import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { WorksWheel, type WorksWheelItem } from '@/components/ui/works-wheel';

export const SelectedWork: React.FC = () => {
  // Map projects to WorksWheel items
  const wheelItems: WorksWheelItem[] = projects.map((project) => ({
    title: project.title,
    image: project.heroImage,
    href: `/work/${project.slug}`,
  }));

  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/[0.07]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
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
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
        >
          <span>VIEW FULL ARCHIVE</span>
          <ArrowRight className="w-4 h-4 text-crimson transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Interactive Hint */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-4 px-2">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
          SCROLL OR DRAG TO ROTATE 3D PORTFOLIO DRUM
        </span>
        <span className="hidden md:inline-block">
          ARROW UP / DOWN KEYS SUPPORTED
        </span>
      </div>

      {/* 3D WorksWheel Standalone Showcase */}
      <div className="h-[80vh] min-h-[550px] max-h-[800px] w-full rounded-2xl md:rounded-3xl border border-white/[0.08] overflow-hidden bg-[#0A0A0A]/80 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        <WorksWheel
          items={wheelItems}
          label="MYSTORIA '26"
          action="Explore"
          className="h-full w-full"
        />
      </div>
    </section>
  );
};
