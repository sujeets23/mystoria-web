import React from 'react';
import { Compass, Code, Eye, MapPin, Building2, Globe } from 'lucide-react';
import { CTA } from '../components/CTA';

export const About: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: 'VISION DEMANDS VELOCITY',
      desc: 'Ambitious ideas cannot survive sluggish execution. We move with extreme agility, rapid testing cycles, and data-backed speed to scale winners quickly.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'PERFORMANCE MEETS PRESTIGE',
      desc: 'Direct-response marketing should never look cheap. We fuse high-converting acquisition mechanics with cinematic, world-class production values.',
      icon: Eye,
    },
    {
      num: '03',
      title: 'PARTNERSHIP OVER VENDORS',
      desc: 'We refuse to act as passive ticket-takers. We embed as an elite growth studio, taking full ownership of our partners revenue acceleration and market dominance.',
      icon: Code,
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
            FOR COMPANIES WITH{' '}
            <span className="text-crimson">VISION.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed">
            Mystoria is a growth studio and a dedicated partner for every company with vision. Headquartered in Mumbai and scaling brands worldwide, we combine algorithmic search dominance, creator influence, data-obsessed performance marketing, cinematic ad production, and narrative social strategy to build category leaders.
          </p>
        </div>

        {/* Narrative & Origin */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 md:pb-32 border-b border-white/[0.08]">
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-4">
              <span className="text-xs font-mono tracking-[0.2em] text-crimson uppercase block">
                // THE REBRAND &amp; EVOLUTION
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase text-white">
                A GROWTH STUDIO FOR THE BOLD
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            <p>
              In an era where traditional marketing agencies are fragmented into sluggish silos and disconnected vendors, ambitious businesses are left stranded between pretty design that doesn't convert and performance tactics that tarnish brand prestige.
            </p>
            <p>
              We rebranded Mystoria into a dedicated growth studio to bridge that gap entirely. Located in Mumbai, we act as an integrated growth partner for visionary founders and market leaders — orchestrating technical SEO dominance, viral influencer campaigns, high-ROAS paid media, cinematic commercial film and direct response ads, and commanding social media management under one disciplined roof.
            </p>
            <div className="p-8 rounded-2xl bg-[#0E0E0E] border-l-2 border-crimson">
              <p className="text-white font-medium text-lg italic">
                "We don't measure success by vanity metrics or hours logged. We measure success by compound customer acquisition, ROAS velocity, and undeniable market gravity."
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

        {/* Mumbai Studio & Global Footprint */}
        <div className="py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
                  HEADQUARTERS &amp; BASE
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase text-white">
                LOCATED IN <span className="text-crimson">MUMBAI.</span>
              </h2>

              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                Mystoria is headquartered in Mumbai, India — the epicenter of commerce, culture, and bold ambition. From our Mumbai studio, we engineer and execute growth strategies, performance media, creator ecosystems, and cinematic ad production for companies across India and worldwide.
              </p>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#0E0E0E] border border-white/[0.08] space-y-4 font-mono text-xs">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.06]">
                  <span className="text-neutral-500 uppercase flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-crimson shrink-0" />
                    STUDIO BASE
                  </span>
                  <span className="text-white font-bold text-right">
                    MUMBAI, MAHARASHTRA, INDIA
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                  <span className="text-neutral-500 uppercase flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-crimson shrink-0" />
                    DISCIPLINE
                  </span>
                  <span className="text-white font-bold text-right">
                    GROWTH STUDIO &amp; AD PRODUCTION
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-500 uppercase flex items-center gap-2">
                    <Globe className="w-4 h-4 text-crimson shrink-0" />
                    OPERATING RADIUS
                  </span>
                  <span className="text-white font-bold text-right">
                    INDIA &amp; GLOBAL MARKETS
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/10] group">
                <img
                  src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80"
                  alt="Mumbai Skyline Studio Base"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <span className="text-white font-bold tracking-widest uppercase">
                    MUMBAI HQ // 19°04'33" N 72°52'39" E
                  </span>
                  <span className="px-3 py-1 rounded-full bg-crimson/20 border border-crimson/40 text-crimson font-bold uppercase tracking-wider text-[11px]">
                    ACTIVE STUDIO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTA />
    </main>
  );
};
