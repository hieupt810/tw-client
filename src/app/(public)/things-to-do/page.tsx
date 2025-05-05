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

export default function ThingsToDoPage() {
  return (
    <>
      <HeroSection
        title='Explore the best things to do in Vietnam'
        description='Discover unforgettable experiences and activities for your next adventure, whether you are traveling for leisure or business.'
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
              <BreadcrumbPage>Things to Do</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </MaxWidthContainer>
      </div>
      <MaxWidthContainer id='suggestions'>
        <PlaceCarousel
          title='Top entertainment places in Vietnam'
          description="2025's Travelers' Choice Awards"
        />
        <PlaceCarousel title='Recently explored' />
        <PlaceCarousel
          title='You might enjoy these'
          description='More to experience'
        />
      </MaxWidthContainer>
    </>
  );
}
