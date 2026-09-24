import React from 'react';
import { services } from '../data/services';
import { ServicesWithAnimatedHoverModal, type ServiceHoverItem } from '@/components/ui/services-with-animated-hover-modal';

export const Services: React.FC = () => {
  const hoverItems: ServiceHoverItem[] = services.map((service) => ({
    title: service.title,
    subtitle: service.subtitle,
    category: `${service.number} / ${service.title}`,
    color: '#0E0E0E',
    src: service.id === 'branding'
      ? 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80'
      : service.id === 'digital'
      ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'
      : service.id === 'motion'
      ? 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80'
      : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    href: '/services',
  }));

  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-white/[0.07]">
      <ServicesWithAnimatedHoverModal
        items={hoverItems}
        label="WHAT WE DO"
        description="Four distinct creative practices engineered to operate synchronously, delivering monolithic brand authority from strategy to production code."
        badgeText="CAPABILITIES"
        actionText="Explore"
        className="py-0"
      />
    </section>
  );
};
