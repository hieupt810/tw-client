import CustomBreadcrumb from '@/components/custom-breadcrumb';
import HeroSection from '@/components/hero-section';
import MaxWidthContainer from '@/components/max-width-container';
import PlaceCarousel from '@/components/place-carousel';

const HotelsPage = () => {
  return (
    <>
      <HeroSection
        title='Stay at the best hotels in Vietnam'
        description='Discover the perfect place to stay for your next unforgettable trip, whether you are traveling for leisure or business.'
        buttonHref='#suggestions'
      />
      <CustomBreadcrumb links={[{ label: 'Hotels', href: '/hotels' }]} />
      <MaxWidthContainer id='suggestions'>
        <PlaceCarousel
          title="Stay at the Vietnam's top hotels"
          description="2025's Travelers's Choice Awards"
        />
        <PlaceCarousel title='Recently viewed' />
        <PlaceCarousel
          title='You might like these'
          description='More places to experience'
        />
      </MaxWidthContainer>
    </>
  );
};

export default HotelsPage;
