import React from 'react';

import CustomBreadcrumb from '@/components/custom-breadcrumb';
import HeroSection from '@/components/hero-section';
import MaxWidthContainer from '@/components/max-width-container';
import PlaceCarousel from '@/components/place-carousel';

const RestaurantsPage = () => {
  return (
    <React.Fragment>
      <HeroSection
        title='Discover the best dining experiences'
        description='From street food to fine dining, explore millions of restaurant reviews and photos shared by our global travel community.'
        buttonHref='#suggestions'
      />
      <CustomBreadcrumb
        links={[{ label: 'Restaurants', href: '/restaurants' }]}
      />
      <MaxWidthContainer
        id='suggestions'
        className='flex flex-col gap-12 md:gap-14 lg:gap-16'
      >
        <PlaceCarousel
          title='Best restaurants'
          description='Popular types of food & restaurants near you'
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

export default RestaurantsPage;
