import CustomBreadcrumb from '@/components/custom-breadcrumb';
import HeroSection from '@/components/hero-section';
import MaxWidthContainer from '@/components/max-width-container';
import PlaceCarousel from '@/components/place-carousel';

const HERO_TITLE = 'Explore the best hotels in Vietnam';
const HERO_DESCRIPTION =
  'Discover the perfect place to stay for your next unforgettable trip, whether you are traveling for leisure or business.';

export default function HotelsPage() {
  return (
    <>
      <HeroSection title={HERO_TITLE} description={HERO_DESCRIPTION} />
      <CustomBreadcrumb links={[{ label: 'Hotels', href: '/hotels' }]} />
      <MaxWidthContainer
        id='suggestions'
        className='flex flex-col gap-12 md:gap-14 lg:gap-16'
      >
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
}
