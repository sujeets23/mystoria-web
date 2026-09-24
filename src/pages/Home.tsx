import React from 'react';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { AboutSection } from '../components/AboutSection';
import { Services } from '../components/Services';
import { SelectedWork } from '../components/SelectedWork';
import { Process } from '../components/Process';
import { WhyMystoria } from '../components/WhyMystoria';
import { Stats } from '../components/Stats';
import { Testimonials } from '../components/Testimonials';
import { CTA } from '../components/CTA';

export const Home: React.FC = () => {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <AboutSection />
      <Services />
      <SelectedWork />
      <Process />
      <WhyMystoria />
      <Stats />
      <Testimonials />
      <CTA />
    </main>
  );
};
