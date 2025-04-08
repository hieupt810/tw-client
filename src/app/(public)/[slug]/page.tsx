import { BadgeCheck, Heart, MapPin, MessageCircle, Share } from 'lucide-react';
import Image from 'next/image';

import CarouselImage from '@/components/carousel-image';
import MaxWidthContainer from '@/components/max-width-container';
import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LOREM_IPSUM } from '@/constants';

import InformationCard from './components/information-card';

export default function PlaceDetailsPage() {
  return (
    <MaxWidthContainer className='mt-6'>
      <div className='flex flex-col gap-1'>
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
        <div className='flex flex-row gap-10'>
          <div className='flex flex-row items-center gap-1.5'>
            <MapPin size={20} />
            <p>115 Nguyen Van Linh, Da Nang</p>
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
      <div className='mt-4 mb-8 flex flex-col gap-2 lg:flex-row'>
        <div className='grow'>
          <CarouselImage
            images={['/home.jpg', '/sign-in.jpg', '/sign-up.jpg']}
          />
        </div>
        <div className='flex grow flex-row gap-2'>
          {['/sign-in.jpg', '/sign-up.jpg'].map((image, index) => (
            <div
              key={index}
              className='h-full max-h-[35rem] grow overflow-hidden rounded-md'
            >
              <Image
                src={image}
                alt='Image'
                width={1000}
                height={1000}
                className='h-full w-full object-cover object-center'
              />
            </div>
          ))}
        </div>
      </div>
      <Tabs defaultValue='about' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='about'>About</TabsTrigger>
          <TabsTrigger value='reviews'>Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value='about'>
          <InformationCard title='About'>
            <p className='leading-7 [&:not(:first-child)]:mt-6'>
              {LOREM_IPSUM}
            </p>
          </InformationCard>
        </TabsContent>
        <TabsContent value='reviews'>
          <InformationCard title='Reviews'>
            <p className='text-muted-foreground'>No reviews yet</p>
          </InformationCard>
        </TabsContent>
      </Tabs>
    </MaxWidthContainer>
  );
}
