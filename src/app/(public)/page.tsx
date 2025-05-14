import Image from 'next/image';
import React from 'react';

import HeroSection from '@/components/hero-section';

const HERO_TITLE = 'Explore Your Journey Awaits';
const HERO_DESCRIPTION =
  'Tailored to your preferences and designed to make every step of your adventure seamless and memorable.';

export default function HomePage() {
  return (
    <React.Fragment>
      <HeroSection title={HERO_TITLE} description={HERO_DESCRIPTION} />
      <Image
        width={4500}
        height={1503}
        loading='lazy'
        className='rounded-lg'
        src='/home-banner.jpg'
        alt='Welcome to Vietnam'
      />
    </React.Fragment>
  );
}
