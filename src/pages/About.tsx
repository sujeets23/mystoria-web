import React from 'react';
import { Compass, Code, Eye } from 'lucide-react';
import { teamMembers, awards } from '../data/testimonials';
import { CTA } from '../components/CTA';

export const About: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: 'TENSION BREEDS MEMORY',
      desc: 'Harmony without friction is easily forgotten. We introduce intentional aesthetic tension between brutalist minimalism and kinetic warmth.',
      icon: Eye,
    },
    {
      num: '02',
      title: 'CODE AS SCULPTURAL MEDIUM',
      desc: 'We do not view code as passive implementation; code is an artistic medium capable of dynamic physics, sound synthesis, and spatial resonance.',
      icon: Code,
    },
    {
      num: '03',
      title: 'OBSESSION OVER VOLUME',
      desc: 'We limit our studio output to a maximum of 8 bespoke commissions per calendar year. Deep immersion produces work of historic calibre.',
      icon: Compass,
    },
  ];

  return (
    <main className="relative pt-32 md:pt-44">
      {/* Background Glow */}
      <div 
        aria-hidden="true"
        className="absolute top-24 left-1/3 w-[650px] h-[650px] bg-crimson/10 blur-[150px] pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* About Header */}
        <div className="border-b border-white/[0.08] pb-16 mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
              STUDIO MANIFESTO
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-display font-extrabold uppercase tracking-tight text-white max-w-5xl leading-[1.02]">
            FOR BRANDS WITH SOMETHING{' '}
            <span className="text-crimson">WORTH SAYING.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed">
            Mystoria was founded to eradicate the algorithmic mediocrity plaguing modern digital design. We believe great design creates cultural gravity.
          </p>
        </div>

        {/* Narrative & Origin */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 md:pb-32 border-b border-white/[0.08]">
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-4">
              <span className="text-xs font-mono tracking-[0.2em] text-crimson uppercase block">
                // THE ORIGIN
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase text-white">
                CRAFT OVER CONVENIENCE
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            <p>
              In an era where web design has been homogenized by generic SaaS design systems and drag-and-drop website builders, distinctive character has become the rarest and most valuable asset in business.
            </p>
            <p>
              Mystoria operates as an agile, hyper-disciplined studio bridging classical Swiss typography, editorial fashion direction, and cutting-edge browser interaction engineering. We work directly with founders, creative directors, and visionary teams to construct digital artifacts that command respect.
            </p>
            <div className="p-8 rounded-2xl bg-[#0E0E0E] border-l-2 border-crimson">
              <p className="text-white font-medium text-lg italic">
                "Our metric of success is simple: when someone visits a Mystoria-designed site, they immediately know they have arrived somewhere extraordinary."
              </p>
            </div>
          </div>
        </div>

        {/* Working Principles */}
        <div className="py-20 md:py-32 border-b border-white/[0.08]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono tracking-[0.2em] text-crimson uppercase block mb-2">
                // PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase text-white">
                CORE PRINCIPLES
              </h2>
            </div>
            <p className="max-w-md text-sm text-neutral-400 font-light">
              The convictions that guide our studio decisions on every single commission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.num}
                  className="p-8 sm:p-10 rounded-2xl bg-[#0E0E0E] border border-white/[0.08] hover:border-crimson/50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-8">
                      <span className="text-xs font-mono text-crimson font-bold">
                        {p.num}
                      </span>
                      <Icon className="w-5 h-5 text-neutral-400" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-white mb-4">
                      {p.title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Studio Leadership / Team */}
        <div className="py-20 md:py-32 border-b border-white/[0.08]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono tracking-[0.2em] text-crimson uppercase block mb-2">
                // LEADERSHIP
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase text-white">
                THE COLLECTIVE
              </h2>
            </div>
            <p className="max-w-md text-sm text-neutral-400 font-light">
              Craftsmen, technologists, and art directors dedicated to uncompromised digital execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/[0.08] hover:border-crimson/50 transition-all duration-300"
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-6 border-t border-white/[0.08]">
                  <span className="text-[11px] font-mono text-crimson uppercase tracking-wider block mb-1">
                    {member.role}
                  </span>
                  <h3 className="text-xl font-display font-bold uppercase text-white">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition Wall */}
        <div className="py-20 md:py-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono tracking-[0.2em] text-crimson uppercase block mb-2">
                // RECOGNITION
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase text-white">
                AWARDS ARCHIVE
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500 uppercase">
              PEER-REVIEWED EXCELLENCE
            </span>
          </div>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {awards.map((award, i) => (
              <div
                key={i}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/[0.02] px-4 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <span className="text-xs font-mono text-crimson font-bold">
                    {award.year}
                  </span>
                  <span className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-crimson transition-colors">
                    {award.title}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-xs font-mono text-neutral-400">
                  <span className="text-neutral-300 uppercase">{award.project}</span>
                  <span className="text-neutral-500 hidden sm:inline-block">/</span>
                  <span className="text-white uppercase font-bold">{award.organization}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTA />
    </main>
  );
};
