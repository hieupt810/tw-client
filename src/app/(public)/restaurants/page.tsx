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

export default function RestaurantsPage() {
  return (
    <>
      <HeroSection
        title='Discover the Best Dining Experiences'
        description='From street food to fine dining, explore millions of restaurant reviews and photos shared by our global travel community.'
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
              <BreadcrumbPage>Restaurants</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </MaxWidthContainer>
      </div>
      <MaxWidthContainer id='suggestions'>
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
    </>
  );
}
