import { MapPin } from 'lucide-react';

import CarouselImage from '@/components/carousel-image';
import MaxWidthContainer from '@/components/max-width-container';
import StarRating from '@/components/star-rating';

export default function PlaceDetailsPage() {
  return (
    <MaxWidthContainer className='mt-10'>
      <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight transition-colors md:text-3xl'>
        Muong Thanh Luxury Song Han Hotel
      </h1>
      <div className='mt-2 flex flex-col gap-1.5'>
        <StarRating rating={4.3} />
        <div className='text-muted-foreground flex flex-row items-center gap-1'>
          <MapPin size={20} />
          <p>115 Nguyen Van Linh, Da Nang</p>
        </div>
      </div>
      <CarouselImage
        images={['/home.jpg', '/sign-in.jpg', '/sign-up.jpg']}
        className='my-6'
      />
    </MaxWidthContainer>
  );
}
