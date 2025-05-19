'use client';

import { HTTPError } from 'ky';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import Address from '@/components/address';
import Feature from '@/components/feature';
import Loading from '@/components/loading';
import Rating from '@/components/rating';
import RatingChart from '@/components/rating-chart';
import SavePlaceButton from '@/components/save-place-button';
import SectionTitle from '@/components/section-title';
import ThumbnailsCarousel from '@/components/thumbnails-carousel';
import VerticalRecommend from '@/components/vertical-recommend';
import { cn, saveRecentlyViewed } from '@/lib/utils';
import { RestaurantService } from '@/services/restaurant';
import { IError } from '@/types/IError';
import { IRestaurant } from '@/types/IRestaurant';

const MarkerMap = dynamic(() => import('@/components/marker-map'), {
  ssr: false,
});

export default function HotelDetailsPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [item, setItem] = useState<IRestaurant | null>(null);

  const fetchItem = useCallback(
    async function (elementId: string) {
      try {
        const data = await RestaurantService.details(elementId);
        setItem(data);
        saveRecentlyViewed(elementId, data.type);
      } catch (error) {
        if (error instanceof HTTPError) {
          const data = await error.response.json<IError>();
          toast.error(data.error);
        } else toast.error('Something went wrong');
        router.push('/restaurant');
      }
    },
    [router],
  );

  useEffect(() => {
    if (!slug || typeof slug !== 'string') return;
    fetchItem(slug);
  }, [slug, fetchItem]);

  if (!item) return <Loading />;
  return (
    <>
      {/* Main */}
      <div className='border-grid border-b px-10 pb-10'>
        <div className='mb-1 flex flex-row justify-between'>
          <div className='flex grow flex-col gap-1'>
            <span className='text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl'>
              {item.name}
            </span>
            <Rating
              rating={item.rating}
              ratingHistorgram={item.ratingHistogram}
            />
          </div>
          <SavePlaceButton elementId={item.elementId} />
        </div>
        <Address
          street={item.street}
          city={item.city.name}
          postalCode={item.city.postalCode}
        />
        <ThumbnailsCarousel images={item.photos} className='mt-6' />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-4'>
        <div className='border-grid col-span-3 lg:border-r'>
          {/* <TextSection
            title='AI Review Summary'
            text={
              item.aiReviewsSummary ||
              'Do not have enough reviews for AI summary.'
            }
            className='border-t-0'
          /> */}
          <div className='border-grid grid grid-cols-1 border-t md:grid-cols-2'>
            {/* Rating Chart */}
            <div className='border-grid col-span-1 flex flex-col border-r p-10'>
              <SectionTitle text='Rating Distribution' />
              <RatingChart histogram={item.ratingHistogram} />
            </div>

            {/* Amenities */}
            <div className='border-grid col-span-1 flex flex-col border-t p-10 md:border-t-0'>
              <SectionTitle text='Amenities' />
              <Feature features={item.features} />
            </div>
          </div>

          {/* Description */}
          <TextSection
            title='Description'
            text={item.description || 'No description.'}
          />

          <div className='border-grid flex flex-col border-t p-10'>
            <SectionTitle text='Map' />
            <MarkerMap items={[item]} />
          </div>
        </div>

        {/* Popular */}
        <div className='border-grid col-span-1 flex flex-col border-t p-10 lg:border-t-0'>
          <SectionTitle text='Popular' />
          <VerticalRecommend />
        </div>
      </div>

      <div className='border-grid border-t p-10'>
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
