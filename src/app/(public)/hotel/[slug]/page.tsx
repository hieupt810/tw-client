'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import Address from '@/components/address';
import Feature from '@/components/feature';
import Loading from '@/components/loading';
import Rating from '@/components/rating';
import RatingChart from '@/components/rating-chart';
import SavePlaceButton from '@/components/save-place-button';
import SectionTitle from '@/components/section-title';
import ThumbnailsCarousel from '@/components/thumbnails-carousel';
import { cn } from '@/lib/utils';
import { useHotelStore } from '@/stores/hotel-store';

const MarkerMap = dynamic(() => import('@/components/marker-map'), {
  ssr: false,
});

export default function HotelDetailsPage() {
  const { slug } = useParams();

  const { hotel, reset, fetchHotel } = useStore(
    useHotelStore,
    (state) => state,
  );

  useEffect(() => {
    if (!slug || typeof slug !== 'string') return;
    fetchHotel(slug);
    return () => {
      reset();
    };
  }, [slug, fetchHotel]);

  if (!hotel.item) return <Loading />;

  return (
    <>
      <div className='border-grid border-b px-10 pb-10'>
        <div className='mb-1 flex flex-row justify-between'>
          <div className='flex grow flex-col gap-1'>
            <span className='text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl'>
              {hotel.item.name}
            </span>
            <Rating
              rating={hotel.item.rating}
              ratingHistorgram={hotel.item.ratingHistogram}
            />
          </div>
          <SavePlaceButton elementId={hotel.item.elementId} />
        </div>
        <Address
          street={hotel.item.street}
          city={hotel.item.city.name}
          postalCode={hotel.item.city.postalCode}
        />
        <ThumbnailsCarousel images={hotel.item.photos} className='mt-6' />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-4'>
        <div className='border-grid col-span-3 lg:border-r'>
          <TextSection
            title='AI Review Summary'
            text={
              hotel.item.aiReviewsSummary ||
              'Do not have enough reviews for AI summary.'
            }
            className='border-t-0'
          />
          <div className='border-grid grid grid-cols-1 gap-6 border-t p-10 md:grid-cols-2'>
            <div className='col-span-1 flex flex-col'>
              <SectionTitle text='Rating Distribution' />
              <RatingChart histogram={hotel.item.ratingHistogram} />
            </div>
            <div className='col-span-1 flex flex-col'>
              <SectionTitle text='Amenities' />
              <Feature features={hotel.item.features} />
            </div>
          </div>
          <TextSection
            title='Description'
            text={hotel.item.description || 'No description.'}
          />
          <div className='border-grid flex flex-col border-t p-10'>
            <SectionTitle text='Map' />
            <MarkerMap items={[hotel.item]} />
          </div>
        </div>
      </div>
      <div className='border-grid border-t p-10 pb-0'>
        <SectionTitle text='Reviews' />
      </div>
    </>
  );
}

function TextSection({
  title,
  text,
  className,
}: {
  title: string;
  text: string;
  className?: React.HTMLProps<HTMLDivElement>['className'];
}) {
  return (
    <div className={cn('border-grid flex flex-col border-t p-10', className)}>
      <SectionTitle text={title} />
      <p className='text-justify leading-relaxed'>{text}</p>
    </div>
  );
}
