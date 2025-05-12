'use client';

import { Heart, Loader2, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
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
  const router = useRouter();
  const { slug } = useParams();
  const { hotel, error, resetAction, getHotelAction } = useStore(
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

  useEffect(() => {
    if (error) {
      toast.error(error);
      router.push('/hotels');
    }
  }, [error]);

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
      <MaxWidthContainer className='grid grid-cols-1 p-0 md:grid-cols-3'>
        <div className='border-grid col-span-2 flex flex-col gap-4 border-r border-b p-6'>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-row items-center justify-between'>
              <h1 className='text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl'>
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
        <div className='border-grid hidden border-b p-6 md:block'>
          <h4 className='mb-1 text-lg font-semibold tracking-tight md:text-xl'>
            Popular
          </h4>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer className='grid grid-cols-3 grid-rows-2 p-0'>
        <div className='border-grid col-span-2 border-r border-b p-6'>
          <h4 className='mb-1 text-lg font-semibold tracking-tight md:text-xl'>
            Description
          </h4>
          <p className='text-justify leading-relaxed'>{hotel.description}</p>
        </div>

        {/* Rating */}
        <div className='border-grid flex flex-col border-b p-6'>
          <h4 className='mb-1 text-lg font-semibold tracking-tight md:text-xl'>
            Rating Distribution
          </h4>
          <RatingChart histogram={hotel.ratingHistogram} />
        </div>

        {/* AI Summary Review */}
        <div className='border-grid col-span-2 border-r border-b p-6'>
          <h4 className='mb-1 text-lg font-semibold tracking-tight md:text-xl'>
            AI Reviews Summary
          </h4>
          <p className='text-justify leading-relaxed'>
            {hotel.aiReviewsSummary}
          </p>
        </div>

        {/* Amenities */}
        <div className='border-grid border-b p-6'>
          <h4 className='mb-1 text-lg font-semibold tracking-tight md:text-xl'>
            Amenities
          </h4>
          <Amenity amenities={hotel.amenities} />
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer className='border-b'>
        <h4 className='mb-1 text-lg font-semibold tracking-tight md:text-xl'>
          Map
        </h4>
        <SingleMarkerMap
          name={hotel.name}
          latitude={hotel.latitude}
          longitude={hotel.longitude}
        />
      </MaxWidthContainer>
      <MaxWidthContainer>
        <h4 className='mb-1 text-lg font-semibold tracking-tight md:text-xl'>
          Reviews
        </h4>
      </MaxWidthContainer>
    </>
  );
}
