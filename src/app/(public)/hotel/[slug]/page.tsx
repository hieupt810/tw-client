'use client';

import { HTTPError } from 'ky';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import Address from '@/components/address';
import Feature from '@/components/feature';
import Loading from '@/components/loading';
import Rating from '@/components/rating';
import SavePlaceButton from '@/components/save-place-button';
import SectionTitle from '@/components/section-title';
import VerticalRecommend from '@/components/vertical-recommend';
import { cn } from '@/lib/utils';
import { HotelService } from '@/services/hotel';
import { IError } from '@/types/IError';
import { IHotel } from '@/types/IHotel';

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

  const [hotel, setHotel] = useState<IHotel | null>(null);

  async function fetchHotel(elementId: string) {
    try {
      const data = await HotelService.details(elementId);
      setHotel(data);
    } catch (error) {
      if (error instanceof HTTPError) {
        const data = await error.response.json<IError>();
        toast.error(data.error);
      } else toast.error('Something went wrong');
      router.push('/hotel');
    }
  }

  useEffect(() => {
    if (!slug || typeof slug !== 'string') return;
    fetchHotel(slug);
  }, [slug, router]);

  if (!hotel) {
    return <Loading />;
  }

  return (
    <>
      {/* Main */}
      <div className='border-grid border-b'>
        <div className='mb-1 flex flex-row justify-between px-6'>
          <div className='flex grow flex-col gap-1'>
            <span className='text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl'>
              {hotel.name}
            </span>
            <Rating
              rating={hotel.rating}
              ratingHistorgram={hotel.ratingHistogram}
            />
          </div>
          <SavePlaceButton />
        </div>
        <Address
          street={hotel.street}
          city={hotel.city.name}
          postalCode={hotel.city.postalCode}
          className='px-6'
        />
        <ThumbnailsCarousel images={hotel.photos} className='my-4 px-6' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4'>
        <div className='border-grid col-span-3 lg:border-r'>
          {/* AI Review Summary */}
          <TextSection
            title='AI Review Summary'
            text={hotel.aiReviewsSummary}
            className='border-t-0'
          />

          {/* Rating and Amenities */}
          <div className='border-grid grid grid-cols-2 border-t'>
            {/* Rating Chart */}
            <div className='border-grid col-span-1 flex flex-col border-r p-6'>
              <SectionTitle text='Rating Distribution' />
              <RatingChart histogram={hotel.ratingHistogram} />
            </div>

            {/* Amenities */}
            <div className='border-grid col-span-1 flex flex-col p-6'>
              <SectionTitle text='Amenities' />
              <Feature features={hotel.features} />
            </div>
          </div>

          {/* Description */}
          <TextSection title='Description' text={hotel.description} />

          <div className='border-grid flex flex-col border-t p-6'>
            <SectionTitle text='Map' />
            <SingleMarkerMap
              name={hotel.name}
              latitude={hotel.latitude}
              longitude={hotel.longitude}
            />
          </div>
        </div>

        {/* Popular */}
        <div className='border-grid col-span-1 flex flex-col border-t p-6 lg:border-t-0'>
          <SectionTitle text='Popular' />
          <VerticalRecommend />
        </div>
      </div>

      <div className='border-grid border-t p-6'>
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
    <div className={cn('border-grid flex flex-col border-t p-6', className)}>
      <SectionTitle text={title} />
      <p className='text-justify leading-relaxed'>{text}</p>
    </div>
  );
}
