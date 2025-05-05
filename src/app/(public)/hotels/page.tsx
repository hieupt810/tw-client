import HeroSection from '@/components/hero-section';
import MaxWidthContainer from '@/components/max-width-container';
import PlaceCarousel from '@/components/place-carousel';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function HotelsPage() {
  return (
    <>
      <HeroSection
        title='Stay at the best hotels in Vietnam'
        description='Discover the perfect place to stay for your next unforgettable trip, whether you are traveling for leisure or business.'
        buttonHref='#suggestions'
      />
      <div className='border-grid border-b'>
        <MaxWidthContainer className='py-4'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>Hotels</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </MaxWidthContainer>
      </div>
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
}
