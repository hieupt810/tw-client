import { BadgeCheck, Heart, MapPin, MessageCircle, Share } from 'lucide-react';

import CarouselImage from '@/components/carousel-image';
import MaxWidthContainer from '@/components/max-width-container';
import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';

export default function PlaceDetailsPage() {
  return (
    <MaxWidthContainer className='mt-6'>
      <div className='flex flex-col gap-1.5'>
        <div className='flex flex-row items-center justify-between'>
          <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight transition-colors md:text-3xl'>
            Muong Thanh Luxury Song Han Hotel
          </h1>
          <div className='flex flex-row items-center gap-3'>
            <Button size='icon' variant='ghost'>
              <Share />
            </Button>
            <Button variant='outline'>
              <Heart />
              Save
            </Button>
          </div>
        </div>
        <Rating rating={4.2} />
        <div className='grid grid-cols-2 gap-1'>
          <div className='flex flex-row items-center gap-1.5'>
            <MapPin size={20} />
            <p>115 Nguyen Van Linh, Da Nang 550000</p>
          </div>
          <div className='flex flex-row items-center gap-1.5'>
            <MessageCircle size={20} />
            <p>283 reviews</p>
          </div>
          <div className='flex flex-row items-center gap-1.5'>
            <BadgeCheck size={20} />
            <p>Travelers&apos; Choice</p>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className='mt-4 mb-8 flex items-center justify-center'>
        <CarouselImage images={['/home.jpg', '/sign-in.jpg', '/sign-up.jpg']} />
      </div>

      {/* Detail Container */}
      <div className='w-full rounded-md border border-slate-200 p-6'>
        <h2 className='border-b border-slate-200 pb-4 text-2xl font-semibold'>
          About
        </h2>
        <div className='grid grid-cols-2 gap-3'></div>
      </div>
    </MaxWidthContainer>
  );
}
