import type { ProcessStep } from '../types';

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    subtitle: 'Interrogating the foundations.',
    description: 'We deconstruct your market reality, audience psychology, and latent competitive advantages. No assumptions; only sharp diagnostic inquiry.',
    deliverables: ['Cultural Landscape Audit', 'Stakeholder Interviews', 'Audience Mental Models', 'Strategic Opportunity Matrix']
  },
  {
    number: '02',
    title: 'DEFINE',
    subtitle: 'Formulating the strategic stance.',
    description: 'We crystallize your brand positioning into an unmistakable point of view. This establishes the thesis that governs all visual and interactive decisions.',
    deliverables: ['Core Brand Manifesto', 'Creative Direction Brief', 'Information Architecture', 'Technical Architecture Stack']
  },
  {
    number: '03',
    title: 'DESIGN',
    subtitle: 'Sculpting the visual system.',
    description: 'We materialize the strategy into arresting typography, custom layouts, color physics, and spatial interactions that refuse to look like anyone else.',
    deliverables: ['High-Fidelity Component Prototypes', 'Design Tokens & Typography Rules', 'Motion Choreography Specs', 'Responsive Breakpoint Matrices']
  },
  {
    number: '04',
    title: 'BUILD',
    subtitle: 'Precision engineering in code.',
    description: 'We translate designs into razor-sharp, production-grade software with 60fps frame rates, accessible semantic structures, and obsessive micro-interactions.',
    deliverables: ['Custom React / Modern Frontend', 'Smooth GPU Shaders & Transitions', 'Accessible WCAG Compliance', 'Sub-second Edge Deployment']
  },
  {
    number: '05',
    title: 'LAUNCH',
    subtitle: 'Delivering the artifact to the world.',
    description: 'Rigorous cross-device stress testing, SEO optimization, and an orchestrated rollout strategy to ensure immediate cultural impact.',
    deliverables: ['Full SEO & Performance Audit', 'Asset Handover & Toolkits', 'Ongoing Evolution Support', 'Performance Analytics Dashboard']
  }
];
