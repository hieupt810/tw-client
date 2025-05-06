import React from 'react';

import CustomBreadcrumb from '@/components/custom-breadcrumb';
import HeroSection from '@/components/hero-section';
import MaxWidthContainer from '@/components/max-width-container';
import PlaceCarousel from '@/components/place-carousel';

const ThingsToDoPage = () => {
  return (
    <React.Fragment>
      <HeroSection
        title='Explore the best things to do in Vietnam'
        description='Discover unforgettable experiences and activities for your next adventure, whether you are traveling for leisure or business.'
        buttonHref='#suggestions'
      />
      <CustomBreadcrumb
        links={[{ label: 'Things to Do', href: '/things-to-do' }]}
      />
      <MaxWidthContainer
        id='suggestions'
        className='flex flex-col gap-12 md:gap-14 lg:gap-16'
      >
        <PlaceCarousel
          title='Top entertainment places in Vietnam'
          description="2025's Travelers' Choice Awards"
        />
        <PlaceCarousel title='Recently viewed' />
        <PlaceCarousel
          title='You might like these'
          description='More places to experience'
        />
      </MaxWidthContainer>
    </React.Fragment>
  );
};

export default ThingsToDoPage;
