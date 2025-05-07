'use client';

import { Heart, Loader2, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useStore } from 'zustand';

import CustomBreadcrumb from '@/components/custom-breadcrumb';
import MaxWidthContainer from '@/components/max-width-container';
import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import { useHotelStore } from '@/stores/hotel';

import RatingChart from './components/rating-chart';
import ThumbnailsCarousel from './components/thumbnails-carousel';

const SingleMarkerMap = dynamic(
  () => import('@/components/single-marker-map'),
  {
    ssr: false,
  },
);

const PlaceDetailsPage = () => {
  const { slug } = useParams();
  const { hotel, resetAction, getHotelAction } = useStore(
    useHotelStore,
    (state) => state,
  );

  const totalRatings = useMemo(() => {
    if (!hotel) return 0;
    return Object.values(hotel.ratingHistogram).reduce(
      (acc, count) => acc + count,
      0,
    );
  }, [hotel]);

  useEffect(() => {
    if (!slug || typeof slug !== 'string') return;

    getHotelAction(slug);
    return () => {
      resetAction();
    };
  }, [slug, getHotelAction, resetAction]);

  if (!hotel) {
    return (
      <MaxWidthContainer className='flex grow items-center justify-center'>
        <Loader2 size={48} className='stroke-primary animate-spin' />
      </MaxWidthContainer>
    );
  }

  return (
    <>
      <CustomBreadcrumb
        links={[
          { label: 'Hotels', href: '/hotels' },
          { label: hotel.name, href: `/hotels` },
        ]}
      />

      <MaxWidthContainer className='flex flex-col gap-1 border-b'>
        <div className='flex flex-row items-center justify-between'>
          <h1 className='text-2xl leading-tight font-bold tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]'>
            {hotel.name}
          </h1>
          <Button variant='outline'>
            <Heart />
            Save
          </Button>
        </div>
        <div className='text-muted-foreground inline-flex items-center gap-2'>
          <Rating rating={hotel.rating} totalRatings={totalRatings} />
        </div>
        <div className='flex items-center gap-1'>
          <MapPin size={24} />
          <span className='text-base'>
            {`${hotel.address.street}, ${hotel.address.city.name} ${hotel.address.city.postalCode}`}
          </span>
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer className='grid grid-cols-2 border-b p-0 md:grid-cols-3'>
        <div className='col-span-2'>
          <ThumbnailsCarousel
            images={hotel.photos}
            className='border-grid border-b px-6 py-4'
          />
          <div className='grid grid-cols-1 lg:grid-cols-3'>
            <div className='flex items-center justify-center'>
              <RatingChart histogram={hotel.ratingHistogram} />
            </div>
            <div className='border-grid border-l px-6 py-4 md:col-span-2'>
              <h4 className='mb-1 text-xl leading-relaxed font-bold tracking-tight md:text-2xl md:leading-loose'>
                About
              </h4>
              <p className='text-justify leading-relaxed'>
                {hotel.description}
              </p>
            </div>
          </div>
        </div>

        <div className='border-grid col-span-2 border-t border-l px-6 py-4 md:col-span-1 md:border-t-0'>
          <h4 className='mb-1 text-xl leading-relaxed font-bold tracking-tight md:text-2xl md:leading-loose'>
            Amenties
          </h4>
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer className='border-b'>
        <h4 className='mb-1 text-xl leading-relaxed font-bold tracking-tight md:text-2xl md:leading-loose'>
          Map
        </h4>
        <SingleMarkerMap
          name={hotel.name}
          latitude={hotel.latitude}
          longitude={hotel.longitude}
        />
      </MaxWidthContainer>

      <MaxWidthContainer>
        <h4 className='mb-1 text-xl leading-relaxed font-bold tracking-tight md:text-2xl md:leading-loose'>
          Reviews
        </h4>
      </MaxWidthContainer>
    </>
  );
};

export default PlaceDetailsPage;
