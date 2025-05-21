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
          <TextSection
            title='Description'
            text={item.description || 'No description.'}
            className='border-t-0 border-b'
          />

          <div className='grid grid-cols-1 gap-6 p-10 md:grid-cols-2'>
            <div className='col-span-1 flex flex-col'>
              <SectionTitle text='Rating Distribution' />
              <RatingChart histogram={item.ratingHistogram} />
            </div>
            <div className='col-span-1 flex flex-col'>
              <SectionTitle text='Amenities' />
              <Feature features={item.features} />
            </div>
          </div>

          <div className='border-grid grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-10 truncate border-t p-10'>
            <div className='flex flex-col'>
              {item.cuisines.length > 0 && (
                <>
                  <SectionTitle text='Cuisines' />
                  <div className='text-muted-foreground flex flex-col gap-0.5'>
                    {item.cuisines.map((cuisine) => (
                      <span key={cuisine}>{cuisine}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className='flex flex-col'>
              {item.cuisines.length > 0 && (
                <>
                  <SectionTitle text='Dietary Restrictions' />
                  <div className='text-muted-foreground flex flex-col gap-0.5'>
                    {item.dietaryRestrictions.map((dietaryRestriction) => (
                      <span key={dietaryRestriction}>{dietaryRestriction}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className='flex flex-col'>
              <SectionTitle text='Price Levels' />
              <span className='text-muted-foreground'>
                {item.priceLevels.join(' - ')}
              </span>
            </div>
            <div className='flex flex-col'>
              {item.cuisines.length > 0 && (
                <>
                  <SectionTitle text='Dish' />
                  <div className='text-muted-foreground flex flex-col gap-0.5'>
                    {item.dishes.map((dish) => (
                      <span key={dish}>{dish}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

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
