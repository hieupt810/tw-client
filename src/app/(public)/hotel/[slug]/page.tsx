'use client';

import { Globe, Phone } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import AddTripButton from '@/components/add-trip-button';
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
  }, [slug, fetchHotel, reset]);

  if (!hotel.item) return <Loading />;

  return (
    <>
      <div className='border-grid flex flex-col gap-0.5 border-b py-10'>
        <div className='flex flex-row justify-between'>
          <span className='text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl'>
            {hotel.item.name}
          </span>
          <div className='flex flex-row items-center gap-2'>
            <AddTripButton elementId={hotel.item.element_id} />
            <SavePlaceButton
              elementId={hotel.item.element_id}
              isFavorite={hotel.item.is_favorite}
            />
          </div>
        </div>
        <Rating
          rating={hotel.item.rating}
          ratingHistorgram={hotel.item.rating_histogram}
        />
        <Address street={hotel.item.street} city={hotel.item.city.name} />
        <ThumbnailsCarousel images={hotel.item.photos} className='mt-4' />
      </div>
      <div className='border-grid grid grid-cols-3 gap-10 border-b py-10 md:gap-20'>
        <div className='col-span-full flex flex-col gap-10 md:col-span-2'>
          <TextSection
            title='AI Review Summary'
            text={
              hotel.item.ai_reviews_summary ||
              'Do not have enough reviews for AI summary.'
            }
          />
          <TextSection
            title='Description'
            text={hotel.item.description || 'No description.'}
          />
          <div className='flex flex-col'>
            <SectionTitle text='Contact' />
            <div className='flex flex-col gap-2'>
              <div className='flex flex-row items-center gap-2'>
                <div>
                  <Phone size={20} className='stroke-primary' />
                </div>
                <span>
                  {hotel.item.phone ? hotel.item.phone : 'No information'}
                </span>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <div>
                  <Globe size={20} className='stroke-primary' />
                </div>
                {hotel.item.website ? (
                  <Link
                    target='_blank'
                    href={hotel.item.website}
                    className='hover:text-primary truncate underline underline-offset-4'
                  >
                    {hotel.item.website}
                  </Link>
                ) : (
                  <span>No information</span>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <SectionTitle text='Additional Information' />
            <div className='text-muted-foreground flex flex-col gap-1.5'>
              <span>Price: {hotel.item.price_levels.join(' - ')}</span>
              <span>Hotel Class: {hotel.item.hotel_class}</span>
              <span>Number of Rooms: {hotel.item.number_of_rooms}</span>
            </div>
          </div>
        </div>
        <div className='col-span-full grid grid-rows-2 gap-10 md:col-span-1'>
          <div className='col-span-1 flex flex-col'>
            <SectionTitle text='Rating Distribution' />
            <RatingChart histogram={hotel.item.rating_histogram} />
          </div>
          <div className='col-span-1 flex flex-col'>
            <SectionTitle text='Amenities' />
            <Feature features={hotel.item.features} />
          </div>
        </div>
      </div>
      <div className='flex flex-col py-10'>
        <SectionTitle text='Map' />
        <MarkerMap zoom={16} items={[hotel.item]} />
      </div>
      <div className='border-grid border-t py-10'>
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
    <div className={cn('flex flex-col', className)}>
      <SectionTitle text={title} />
      <p className='text-justify leading-relaxed'>{text}</p>
    </div>
  );
}
