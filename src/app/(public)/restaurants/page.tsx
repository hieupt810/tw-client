import React from 'react';

import CustomBreadcrumb from '@/components/custom-breadcrumb';
import HeroSection from '@/components/hero-section';
import MaxWidthContainer from '@/components/max-width-container';
import PlaceCarousel from '@/components/place-carousel';

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
      <MaxWidthContainer className='flex flex-col gap-12 md:gap-14 lg:gap-16'>
        <PlaceCarousel
          items={[]}
          title='Best restaurants'
          description='Popular types of food & restaurants near you'
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
