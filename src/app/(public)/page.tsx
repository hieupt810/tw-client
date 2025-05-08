import React from 'react';

import HeroSection from '@/components/hero-section';
import MaxWidthContainer from '@/components/max-width-container';
import PlaceCarousel from '@/components/place-carousel';

export default function HomePage() {
  return (
    <React.Fragment>
      <HeroSection
        title='Explore Your Journey Awaits'
        description='Tailored to your preferences and designed to make every step of your
            adventure seamless and memorable.'
        buttonHref='#suggestions'
      />
      <MaxWidthContainer
        id='suggestions'
        className='flex flex-col gap-12 md:gap-14 lg:gap-16'
      >
        <PlaceCarousel
          title="Explore Vietnam's top destinations"
          description="2025's Travelers's Choice Awards"
        />
        <PlaceCarousel title='Recently viewed' />
        <PlaceCarousel
          title='You might like these'
          description='More places to experience'
        />
      </MaxWidthContainer>
    </React.Fragment>
  );
}
