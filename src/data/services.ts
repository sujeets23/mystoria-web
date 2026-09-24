import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'branding',
    number: '01',
    title: 'BRANDING',
    subtitle: 'Building identities people remember.',
    description: 'We carve distinctive brand positions and enduring visual systems for organizations that refuse to blend into market noise. Every identity is rooted in tension, discipline, and uncompromising craft.',
    capabilities: [
      'Brand Identity & Strategy',
      'Visual Systems & Design Systems',
      'Art Direction & Curated Imagery',
      'Brand Architecture & Positioning',
      'Custom Typography & Logotypes',
      'Editorial Guidelines & Toolkits'
    ],
    tag: 'STRATEGY × IDENTITY'
  },
  {
    id: 'digital',
    number: '02',
    title: 'DIGITAL',
    subtitle: 'Experiences engineered to mesmerize.',
    description: 'We design and code bespoke digital flagship platforms, web applications, and interactive products that redefine industry expectations through kinetic elegance and flawless speed.',
    capabilities: [
      'Bespoke Website Design & Architecture',
      'Full-Stack Frontend & WebGL Engineering',
      'High-Conversion UX/UI Architecture',
      'Interactive E-Commerce Flagships',
      'Headless CMS Implementation',
      'Micro-Interactions & Custom Motion'
    ],
    tag: 'CODE × INTERACTION'
  },
  {
    id: 'motion',
    number: '03',
    title: 'MOTION',
    subtitle: 'Kinetic gravity that commands attention.',
    description: 'Movement transforms static design into visceral emotion. We develop dimensional 3D CGI visuals, kinetic brand identities, and product animations that captivate discerning eyes.',
    capabilities: [
      '3D Product Animation & Rendering',
      'CGI Visual Effects & Simulation',
      'Kinetic Typography Systems',
      'Brand Launch Films & Teasers',
      'Spatial UI & Interface Animation',
      'Campaign Key Art & Visual Systems'
    ],
    tag: 'DIMENSION × SPEED'
  },
  {
    id: 'creative',
    number: '04',
    title: 'CREATIVE',
    subtitle: 'Provocative narratives with cultural resonance.',
    description: 'From provocative global campaign concepts to tactile editorial publishing, we formulate creative strategies that ignite conversation and command organic cultural attention.',
    capabilities: [
      'Global Campaign Concepts & Execution',
      'Editorial Direction & Publishing',
      'Cultural Strategy & Creative Audits',
      'Content Systems & Production',
      'Sonic Identity & Sound Architecture',
      'Spatial Installations & Digital Pop-ups'
    ],
    tag: 'CONCEPT × CULTURE'
  }
];
