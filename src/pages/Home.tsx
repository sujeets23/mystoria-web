import React from 'react';
import { PrismaHero } from '@/components/ui/prisma-hero';
import { Marquee } from '../components/Marquee';
import { AboutSection } from '../components/AboutSection';
import { Services } from '../components/Services';
import { SelectedWork } from '../components/SelectedWork';
import { Process } from '../components/Process';
import { WhyMystoria } from '../components/WhyMystoria';
import { Stats } from '../components/Stats';
import { Testimonials } from '../components/Testimonials';
import { WhereWeWorked } from '../components/WhereWeWorked';
import { CTA } from '../components/CTA';

export const Home: React.FC = () => {
  return (
    <main className="relative">
      <PrismaHero />
      <Marquee />
      <AboutSection />
      <Services />
      <SelectedWork />
      <Process />
      <WhyMystoria />
      <Stats />
      <Testimonials />
      <CTA />
      <WhereWeWorked />
    </main>
  );
};

export default Home;
