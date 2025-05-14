'use client';

import React from 'react';

import CustomBreadcrumb from '@/components/custom-breadcrumb';
import HeroSection from '@/components/hero-section';

const HERO_TITLE = 'Discover amazing dining options';
const HERO_DESCRIPTION =
  'Discover the best restaurants, cafes, and bars in your area. Indulge in a variety of cuisines and dining experiences tailored to your taste.';

export default function RestaurantsPage() {
  return (
    <React.Fragment>
      <HeroSection title={HERO_TITLE} description={HERO_DESCRIPTION} />
      <CustomBreadcrumb
        links={[{ label: 'Restaurants', href: '/restaurants' }]}
      />
    </React.Fragment>
  );
}
