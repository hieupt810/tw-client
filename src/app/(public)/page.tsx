import Image from 'next/image';
import React from 'react';

import HeroSection from '@/components/hero-section';
import MaxWidthContainer from '@/components/max-width-container';
import PlaceCarousel from '@/components/place-carousel';

const HERO_TITLE = 'Explore Your Journey Awaits';
const HERO_DESCRIPTION =
  'Tailored to your preferences and designed to make every step of your adventure seamless and memorable.';

export default function HomePage() {
  return (
    <React.Fragment>
      <HeroSection title={HERO_TITLE} description={HERO_DESCRIPTION} />
      <MaxWidthContainer className='flex flex-col gap-12 md:gap-14 lg:gap-16'>
        <PlaceCarousel
          items={[]}
          title="Explore Vietnam's top destinations"
          description="2025's Travelers's Choice Awards"
        />
        <PlaceCarousel items={[]} title='Recently viewed' />
      </MaxWidthContainer>
      <MaxWidthContainer className='px-0 pb-0'>
        <Image
          width={4500}
          height={1503}
          loading='lazy'
          src='/home-banner.jpg'
          alt='Welcome to Vietnam'
        />
      </MaxWidthContainer>
      <MaxWidthContainer>
        <PlaceCarousel
          items={[]}
          title='You might like these'
          description='More places to experience'
        />
      </MaxWidthContainer>
    </React.Fragment>
  );
}
