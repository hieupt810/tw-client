import React from 'react';

import CustomBreadcrumb from '@/components/custom-breadcrumb';
import HeroSection from '@/components/hero-section';
import MaxWidthContainer from '@/components/max-width-container';
import PlaceCarousel from '@/components/place-carousel';

const HERO_TITLE = 'Explore the best things to do in Vietnam';
const HERO_DESCRIPTION =
  'Discover unforgettable experiences and activities for your next adventure, whether you are traveling for leisure or business.';

export default function ThingsToDoPage() {
  return (
    <React.Fragment>
      <HeroSection title={HERO_TITLE} description={HERO_DESCRIPTION} />
      <CustomBreadcrumb
        links={[{ label: 'Things to Do', href: '/things-to-do' }]}
      />
      <MaxWidthContainer className='flex flex-col gap-12 md:gap-14 lg:gap-16'>
        <PlaceCarousel
          items={[]}
          title='Top entertainment places in Vietnam'
          description="2025's Travelers' Choice Awards"
        />
        <PlaceCarousel items={[]} title='Recently viewed' />
        <PlaceCarousel
          items={[]}
          title='You might like these'
          description='More places to experience'
        />
      </MaxWidthContainer>
    </React.Fragment>
  );
}
