import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from '@/components/ui/cobe-globe';
import { 
  MapPin, 
  Sparkles, 
  Clock, 
  ArrowUpRight, 
  Globe2, 
  Compass, 
  ExternalLink,
  Layers
} from 'lucide-react';

interface CityHub {
  id: string;
  name: string;
  country: string;
  region: 'North America' | 'Europe' | 'Asia-Pacific' | 'Middle East' | 'Latin America';
  location: [number, number];
  flagship: string;
  clientType: string;
  year: string;
  status: string;
  image: string;
}

const GLOBAL_HUBS: CityHub[] = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    country: 'India',
    region: 'Asia-Pacific',
    location: [19.0760, 72.8777],
    flagship: 'Mystoria Global Headquarters & Studio',
    clientType: 'Growth Studio HQ & Operations',
    year: '2021 - Present',
    status: 'Global Headquarters',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'nyc',
    name: 'New York',
    country: 'United States',
    region: 'North America',
    location: [40.7128, -74.006],
    flagship: 'Aether Capital & Kroma Audio',
    clientType: 'Fintech & Spatial Sound',
    year: '2025 - 2026',
    status: 'Flagship Partner',
    image: 'https://images.unsplash.com/photo-1496868834840-5f4c98840aaa?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'sf',
    name: 'San Francisco',
    country: 'United States',
    region: 'North America',
    location: [37.7595, -122.4367],
    flagship: 'Synthetix AI & Veloce OS',
    clientType: 'Generative Intelligence',
    year: '2024 - 2026',
    status: 'Full Identity & Product',
    image: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    location: [51.5074, -0.1278],
    flagship: 'Lumina Haute Joaillerie',
    clientType: 'Luxury & E-Commerce',
    year: '2025',
    status: 'Award of the Day Winner',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    location: [48.8566, 2.3522],
    flagship: 'Maison Obsidian',
    clientType: 'Fashion & Archival Design',
    year: '2024',
    status: 'Digital Showcase',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'zurich',
    name: 'Zurich',
    country: 'Switzerland',
    region: 'Europe',
    location: [47.3769, 8.5417],
    flagship: 'Vanguard Horology & Vault',
    clientType: 'Independent Watchmaking',
    year: '2025',
    status: '3D Configurator',
    image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    region: 'Europe',
    location: [52.5200, 13.4050],
    flagship: 'Kollektiv Sound Architecture',
    clientType: 'Acoustic Engineering',
    year: '2025',
    status: 'Interactive WebGL',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    location: [25.2048, 55.2708],
    flagship: 'Oryx Sovereign Residences',
    clientType: 'Architectural Real Estate',
    year: '2025 - 2026',
    status: 'Global Launch',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia-Pacific',
    location: [35.6762, 139.6503],
    flagship: 'Mirai Robotics & Chrono-K',
    clientType: 'Hardware & Kinetic Arts',
    year: '2025',
    status: 'Brand & 3D Experience',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    region: 'Asia-Pacific',
    location: [1.3521, 103.8198],
    flagship: 'Apex Liquidity Protocol',
    clientType: 'Decentralized Finance',
    year: '2024 - 2025',
    status: 'Product Design',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    region: 'Asia-Pacific',
    location: [-33.8688, 151.2093],
    flagship: 'Solara Clean Mobility',
    clientType: 'EV Tech & Infrastructure',
    year: '2025',
    status: 'Digital Flagship',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'saopaulo',
    name: 'São Paulo',
    country: 'Brazil',
    region: 'Latin America',
    location: [-23.5505, -46.6333],
    flagship: 'Pulso Digital Commerce',
    clientType: 'Consumer Tech',
    year: '2024',
    status: 'Brand Refresh',
    image: 'https://images.unsplash.com/photo-1583275479278-795a28965f72?q=80&w=800&auto=format&fit=crop',
  },
];

const GLOBE_MARKERS = GLOBAL_HUBS.map(hub => ({
  id: hub.id,
  location: hub.location,
  label: hub.name,
}));

const GLOBE_ARCS = [
  { id: 'mumbai-london', from: [19.0760, 72.8777] as [number, number], to: [51.5074, -0.1278] as [number, number], label: 'Mumbai (HQ) ↔ London' },
  { id: 'mumbai-nyc', from: [19.0760, 72.8777] as [number, number], to: [40.7128, -74.006] as [number, number], label: 'Mumbai (HQ) ↔ NYC' },
  { id: 'mumbai-dubai', from: [19.0760, 72.8777] as [number, number], to: [25.2048, 55.2708] as [number, number], label: 'Mumbai (HQ) ↔ Dubai' },
  { id: 'mumbai-singapore', from: [19.0760, 72.8777] as [number, number], to: [1.3521, 103.8198] as [number, number], label: 'Mumbai (HQ) ↔ Singapore' },
  { id: 'nyc-london', from: [40.7128, -74.006] as [number, number], to: [51.5074, -0.1278] as [number, number], label: 'NYC ↔ London' },
  { id: 'london-zurich', from: [51.5074, -0.1278] as [number, number], to: [47.3769, 8.5417] as [number, number] },
  { id: 'sf-tokyo', from: [37.7595, -122.4367] as [number, number], to: [35.6762, 139.6503] as [number, number], label: 'SF ↔ Tokyo' },
  { id: 'dubai-singapore', from: [25.2048, 55.2708] as [number, number], to: [1.3521, 103.8198] as [number, number] },
  { id: 'singapore-tokyo', from: [1.3521, 103.8198] as [number, number], to: [35.6762, 139.6503] as [number, number] },
  { id: 'tokyo-sydney', from: [35.6762, 139.6503] as [number, number], to: [-33.8688, 151.2093] as [number, number] },
];

export const WhereWeWorked: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<CityHub>(GLOBAL_HUBS[0]);
  const [activeRegion, setActiveRegion] = useState<string>('All');

  const regions = ['All', 'North America', 'Europe', 'Asia-Pacific', 'Middle East', 'Latin America'];

  const filteredHubs = activeRegion === 'All' 
    ? GLOBAL_HUBS 
    : GLOBAL_HUBS.filter(h => h.region === activeRegion);

  return (
    <section 
      id="where-we-worked"
      className="relative py-28 md:py-36 px-6 md:px-12 border-t border-white/[0.08] bg-[#070707] overflow-hidden"
    >
      {/* Ambient background glow behind the globe */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.18) 0%, rgba(15, 15, 15, 0) 70%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-10 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/30">
              <Globe2 className="w-3.5 h-3.5 text-crimson" />
              <span className="text-xs font-mono tracking-[0.2em] text-crimson uppercase font-semibold">
                GLOBAL FOOTPRINT & REACH
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white">
              Where all we have <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson via-red-400 to-white">worked</span>
            </h2>
            <p className="mt-4 text-neutral-400 text-base sm:text-lg font-light leading-relaxed">
              From Manhattan to Shibuya, Zurich to Dubai. We partner with category leaders, luxury houses, and ambitious technology founders across four continents.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 pt-4 border-t md:border-t-0 border-white/[0.06]">
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">16+</div>
              <div className="text-xs font-mono text-neutral-400 uppercase mt-0.5 tracking-wider">Countries</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-crimson">42</div>
              <div className="text-xs font-mono text-neutral-400 uppercase mt-0.5 tracking-wider">Deployments</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">9</div>
              <div className="text-xs font-mono text-neutral-400 uppercase mt-0.5 tracking-wider">Timezones</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">100%</div>
              <div className="text-xs font-mono text-neutral-400 uppercase mt-0.5 tracking-wider">Remote Agility</div>
            </div>
          </div>
        </div>

        {/* Region Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest mr-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-crimson" />
            TERRITORIES:
          </span>
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setActiveRegion(reg)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                activeRegion === reg
                  ? 'bg-crimson text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] border border-crimson'
                  : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Main Section Body: 3D Interactive Globe + Interactive Hub Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Globe Canvas Container */}
          <div 
            data-lenis-prevent
            className="lg:col-span-7 relative flex flex-col items-center justify-center p-4 sm:p-8 rounded-3xl bg-[#090909] border border-white/[0.08] shadow-2xl overflow-hidden group"
          >
            {/* Top Badge Overlay */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
              <span>LIVE WEBGL SPHERE</span>
            </div>

            <div className="absolute top-6 right-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-neutral-400">
              <span>DRAG TO ROTATE</span>
            </div>

            {/* 3D Cobe Globe */}
            <div className="w-full max-w-[540px] aspect-square relative my-4">
              <Globe
                markers={GLOBE_MARKERS}
                arcs={GLOBE_ARCS}
                markerColor={[0.9, 0.15, 0.15]}
                baseColor={[0.3, 0.3, 0.35]}
                arcColor={[0.86, 0.15, 0.15]}
                glowColor={[0.18, 0.05, 0.05]}
                dark={1}
                mapBrightness={7}
                markerSize={0.032}
                markerElevation={0.015}
                arcWidth={0.6}
                arcHeight={0.28}
                speed={0.0035}
              />
            </div>

            {/* Bottom active marker status ribbon */}
            <div className="w-full flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-mono text-neutral-400 z-10">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{selectedHub.name}</span>
                <span className="text-neutral-400">•</span>
                <span>{selectedHub.country}</span>
              </div>
              <div className="text-crimson font-medium">
                {selectedHub.location[0].toFixed(2)}°N, {selectedHub.location[1].toFixed(2)}°E
              </div>
            </div>
          </div>

          {/* Right Spotlight Panel & Directory */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Active City Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHub.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl bg-[#0F0F0F] border border-white/[0.1] overflow-hidden p-6 shadow-xl"
              >
                {/* Background image preview with luxury gradient scrim */}
                <div className="relative h-44 -mx-6 -mt-6 mb-5 overflow-hidden">
                  <img
                    src={selectedHub.image}
                    alt={selectedHub.name}
                    className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/60 to-transparent" />
                  
                  <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-crimson text-white font-mono text-[10px] tracking-wider uppercase font-semibold">
                      {selectedHub.region}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-neutral-300 font-mono text-[10px] tracking-wider uppercase border border-white/10">
                      {selectedHub.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                      {selectedHub.name}
                      <span className="text-sm font-mono text-neutral-400 font-normal">
                        ({selectedHub.country})
                      </span>
                    </h3>
                    <p className="text-crimson font-mono text-xs mt-1 uppercase tracking-wider">
                      {selectedHub.clientType}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-white/[0.04] border border-white/[0.08]">
                    <Sparkles className="w-4 h-4 text-crimson" />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between items-center text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-neutral-400" /> Key Work:
                    </span>
                    <span className="text-white font-medium">{selectedHub.flagship}</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" /> Delivery:
                    </span>
                    <span className="text-neutral-300">{selectedHub.year}</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" /> Coordinates:
                    </span>
                    <span className="text-neutral-300">
                      {selectedHub.location[0]}°, {selectedHub.location[1]}°
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Hub Grid Selector */}
            <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                <span>SELECT CLIENT HUB ({filteredHubs.length})</span>
                <span className="text-[11px] text-neutral-400">Click to inspect</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1">
                {filteredHubs.map((hub) => {
                  const isSelected = selectedHub.id === hub.id;
                  return (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub)}
                      className={`text-left p-2.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-crimson/15 border-crimson text-white shadow-[0_0_15px_rgba(220,38,38,0.25)]'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.06] text-neutral-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-display text-sm font-semibold truncate">
                          {hub.name}
                        </span>
                        <ArrowUpRight className={`w-3 h-3 ${isSelected ? 'text-crimson' : 'text-neutral-400'}`} />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-tight mt-1 truncate">
                        {hub.country}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Partnership Callout */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-crimson/10 via-white/[0.02] to-transparent border border-crimson/20 text-xs font-mono">
              <span className="text-neutral-300">
                Operating globally across all UTC offsets.
              </span>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 text-crimson hover:text-white transition-colors font-semibold uppercase tracking-wider"
              >
                <span>INITIATE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhereWeWorked;
