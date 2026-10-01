export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: 'Branding' | 'Digital' | 'Motion' | 'Experience' | 'Web Design';
  year: string;
  tagline: string;
  description: string;
  heroImage: string;
  gallery: string[];
  challenge: string;
  approach: string;
  execution: string;
  result: string;
  metrics: { label: string; value: string }[];
  services: string[];
  featured: boolean;
  layoutStyle?: 'full' | 'wide' | 'tall';
}

export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  tag: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  year: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    platform: string;
    url: string;
  }[];
}

export interface Award {
  year: string;
  title: string;
  project: string;
  organization: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}
