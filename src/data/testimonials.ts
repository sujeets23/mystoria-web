import type { Testimonial, TeamMember, Award } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: '01',
    quote: 'Mystoria understood the vision immediately and transformed it into something far beyond what we imagined. Their aesthetic discipline is unmatched in the digital space.',
    author: 'Elena Rostova',
    role: 'Chief Creative Officer',
    company: 'Kronos Haute Horlogerie',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    year: '2026'
  },
  {
    id: '02',
    quote: 'Working with Mystoria felt like commissioning an haute couture piece rather than hiring an agency. They eliminated 80% of our market competitors overnight through sheer design superiority.',
    author: 'Julian Vance',
    role: 'Founder & CEO',
    company: 'Aether Acoustic Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    year: '2025'
  },
  {
    id: '03',
    quote: 'They do not build templates. They build digital monuments. The response to our Paris digital runway broke every internal metric we had set for the year.',
    author: 'Marcella De Luca',
    role: 'Managing Director',
    company: 'Maison Neo Noir Paris',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    year: '2025'
  },
  {
    id: '04',
    quote: 'Our quantum computing interface required balancing extreme theoretical depth with pristine visual authority. Mystoria delivered a masterpiece.',
    author: 'Dr. Arthur Sterling',
    role: 'VP of Technology',
    company: 'Synapse Core Labs',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    year: '2025'
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: '01',
    name: 'Kaelen Thorne',
    role: 'Creative Director & Founder',
    bio: 'Former design lead at Pentagram and Studio Dumbar. Obsessed with Swiss typographic rigor, brutalist architecture, and spatial computing.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    socials: [
      { platform: 'Twitter', url: 'https://x.com' },
      { platform: 'LinkedIn', url: 'https://linkedin.com' }
    ]
  },
  {
    id: '02',
    name: 'Soren Vane',
    role: 'Head of Technology & Interaction',
    bio: 'Creative technologist with 12+ years pioneering WebGL, real-time shaders, and sensory browser experiences.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    socials: [
      { platform: 'GitHub', url: 'https://github.com' },
      { platform: 'Twitter', url: 'https://x.com' }
    ]
  },
  {
    id: '03',
    name: 'Astrid Lindholm',
    role: 'Design Director — Brand & Spatial',
    bio: 'Sculpting enduring visual identities and editorial systems across Stockholm, Tokyo, and New York.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    socials: [
      { platform: 'Behance', url: 'https://behance.net' },
      { platform: 'Instagram', url: 'https://instagram.com' }
    ]
  },
  {
    id: '04',
    name: 'Marcus Chen',
    role: 'Lead 3D & Motion Artist',
    bio: 'Specialist in cinematic CGI, photorealistic lighting, and kinetic choreography for global luxury maisons.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    socials: [
      { platform: 'ArtStation', url: 'https://artstation.com' },
      { platform: 'Instagram', url: 'https://instagram.com' }
    ]
  }
];

export const awards: Award[] = [
  { year: '2026', title: 'Site of the Year Nominee', project: 'Kronos Haute Horlogerie', organization: 'Awwwards' },
  { year: '2025', title: 'Site of the Month', project: 'Maison Neo Noir', organization: 'FWA Awards' },
  { year: '2025', title: 'Best of the Best — Brand Identity', project: 'Aether Spatial', organization: 'Red Dot Awards' },
  { year: '2025', title: 'Studio of the Year Finalist', project: 'Agency Portfolio', organization: 'CSS Design Awards' },
  { year: '2024', title: 'Digital Craft Gold', project: 'Vortex Mobility', organization: 'ADC Global' },
  { year: '2024', title: 'Best Innovation in UI', project: 'Synapse Core Labs', organization: 'The Webby Awards' },
];
