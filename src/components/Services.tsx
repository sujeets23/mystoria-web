import React from 'react';
import { services } from '../data/services';
import { ServicesWithAnimatedHoverModal, type ServiceHoverItem } from '@/components/ui/services-with-animated-hover-modal';

export const Services: React.FC = () => {
  const hoverItems: ServiceHoverItem[] = services.map((service) => ({
    title: service.title,
    subtitle: service.subtitle,
    category: `${service.number} / ${service.title}`,
    color: '#0E0E0E',
    src: service.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    href: '/services',
  }));

  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/[0.07]">
      <ServicesWithAnimatedHoverModal
        items={hoverItems}
        label="WHAT WE DO"
        description="Five disciplined growth practices engineered to scale visionaries — from organic search dominance and data-driven performance media to creator partnerships, cinematic production, and viral social ecosystems."
        badgeText="GROWTH PRACTICES"
        actionText="Explore"
        className="py-0"
      />
    </section>
  );
};

