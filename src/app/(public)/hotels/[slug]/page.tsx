'use client';

import { Heart, Loader2, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useStore } from 'zustand';

import Amenity from '@/components/amenity';
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

export default function PlaceDetailsPage() {
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
        links={[{ label: 'Hotels', href: '/hotels' }, { label: hotel.name }]}
      />
      <MaxWidthContainer className='grid grid-cols-1 p-0 md:grid-cols-4'>
        <div className='border-grid col-span-3 flex flex-col gap-4 border-r border-b px-6 py-4'>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-row items-center justify-between'>
              <h1 className='text-2xl leading-tight font-semibold tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]'>
                {hotel.name}
              </h1>
              <Button variant='outline'>
                <Heart />
                Save
              </Button>
            </div>
            <Rating rating={hotel.rating} totalRatings={totalRatings} />
            <div className='flex items-center gap-1'>
              <MapPin size={24} />
              <span className='text-base'>
                {`${hotel.address.street}, ${hotel.address.city.name} ${hotel.address.city.postalCode} Vietnam`}
              </span>
            </div>
          </div>
          <ThumbnailsCarousel images={hotel.photos} />
        </div>
        <div className='border-grid hidden border-b px-6 py-4 md:block'>
          <h4 className='mb-1 text-xl font-semibold tracking-tight md:text-2xl md:leading-loose'>
            Popular
          </h4>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer className='grid grid-cols-3 grid-rows-2 p-0'>
        <div className='border-grid col-span-2 border-r border-b px-6 py-4'>
          <h4 className='mb-1 text-xl font-semibold tracking-tight md:text-2xl md:leading-loose'>
            About
          </h4>
          <p className='text-justify'>{hotel.description}</p>
        </div>

        {/* Amenities */}
        <div className='border-grid border-b px-6 py-4'>
          <h4 className='mb-1 text-xl font-semibold tracking-tight md:text-2xl md:leading-loose'>
            Amenities
          </h4>
          <Amenity amenities={hotel.amenities} />
        </div>

        {/* AI Summary Review */}
        <div className='border-grid col-span-2 border-r border-b px-6 py-4'>
          <h4 className='mb-1 text-xl font-semibold tracking-tight md:text-2xl md:leading-loose'>
            AI Reviews Summary
          </h4>
          <p className='text-justify'>{hotel.aiReviewsSummary}</p>
        </div>

        {/* Rating */}
        <div className='border-grid flex flex-col justify-center border-b px-6 py-4'>
          <h4 className='mb-1 text-xl font-semibold tracking-tight md:text-2xl md:leading-loose'>
            Overall Rating
          </h4>
          <RatingChart histogram={hotel.ratingHistogram} />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer className='border-b'>
        <h4 className='mb-1 text-xl font-semibold tracking-tight md:text-2xl md:leading-loose'>
          Map
        </h4>
        <SingleMarkerMap
          name={hotel.name}
          latitude={hotel.latitude}
          longitude={hotel.longitude}
        />
      </MaxWidthContainer>
      <MaxWidthContainer>
        <h4 className='mb-1 text-xl font-semibold tracking-tight md:text-2xl md:leading-loose'>
          Reviews
        </h4>
      </MaxWidthContainer>
    </>
  );
}
