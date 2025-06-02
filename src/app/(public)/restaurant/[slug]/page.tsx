'use client';

import { Globe, Phone, SquareMenu } from 'lucide-react';
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
import { ReviewSection } from '@/components/review-section';
import SavePlaceButton from '@/components/save-place-button';
import SectionTitle from '@/components/section-title';
import ThumbnailsCarousel from '@/components/thumbnails-carousel';
import { cn } from '@/lib/utils';
import { useRestaurantStore } from '@/stores/restaurant-store';

const MarkerMap = dynamic(() => import('@/components/marker-map'), {
  ssr: false,
});

export default function RestaurantDetailsPage() {
  const { slug } = useParams();

  const { restaurant, reset, fetchRestaurant } = useStore(
    useRestaurantStore,
    (state) => state,
  );

  useEffect(() => {
    if (!slug || typeof slug !== 'string') return;
    fetchRestaurant(slug);
    return () => {
      reset();
    };
  }, [slug, fetchRestaurant, reset]);

  if (!restaurant.item) return <Loading />;

  return (
    <>
      <div className='border-grid flex flex-col gap-0.5 border-b py-10'>
        <div className='flex flex-row justify-between'>
          <span className='text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl'>
            {restaurant.item.name}
          </span>
          <div className='flex flex-row items-center gap-2'>
            <AddTripButton elementId={restaurant.item.element_id} />
            <SavePlaceButton
              elementId={restaurant.item.element_id}
              isFavorite={restaurant.item.is_favorite}
            />
          </div>
        </div>
        <Rating
          rating={restaurant.item.rating}
          ratingHistorgram={restaurant.item.rating_histogram}
        />
        <Address
          street={restaurant.item.street}
          city={restaurant.item.city.name}
        />
        <ThumbnailsCarousel images={restaurant.item.photos} className='mt-4' />
      </div>
      <div className='border-grid grid grid-cols-3 gap-10 border-b py-10 md:gap-20'>
        <div className='col-span-full flex flex-col gap-10 md:col-span-2'>
          <div className='flex flex-col'>
            <SectionTitle text='Opening Hours' />
            {restaurant.item.hours?.monday && restaurant.item.hours ? (
              <div className='grid grid-cols-2 gap-x-10 gap-y-4 md:grid-cols-3'>
                {
                  <div className='flex flex-col gap-0.5'>
                    <span className='font-semibold'>Monday</span>
                    <span>
                      {`${restaurant.item.hours?.monday?.open} - ${restaurant.item.hours?.monday?.close}`}
                    </span>
                  </div>
                }
                {restaurant.item.hours?.tuesday && (
                  <div className='flex flex-col gap-0.5'>
                    <span className='font-semibold'>Tuesday</span>
                    <span>
                      {`${restaurant.item.hours?.tuesday?.open} - ${restaurant.item.hours?.tuesday?.close}`}
                    </span>
                  </div>
                )}
                {restaurant.item.hours?.wednesday && (
                  <div className='flex flex-col gap-0.5'>
                    <span className='font-semibold'>Wednesday</span>
                    <span>
                      {`${restaurant.item.hours?.wednesday?.open} - ${restaurant.item.hours?.wednesday?.close}`}
                    </span>
                  </div>
                )}
                {restaurant.item.hours?.thursday && (
                  <div className='flex flex-col gap-0.5'>
                    <span className='font-semibold'>Thursday</span>
                    <span>
                      {`${restaurant.item.hours?.thursday?.open} - ${restaurant.item.hours?.thursday?.close}`}
                    </span>
                  </div>
                )}
                {restaurant.item.hours?.friday && (
                  <div className='flex flex-col gap-0.5'>
                    <span className='font-semibold'>Friday</span>
                    <span>
                      {`${restaurant.item.hours?.friday?.open} - ${restaurant.item.hours?.friday?.close}`}
                    </span>
                  </div>
                )}
                {restaurant.item.hours?.saturday && (
                  <div className='flex flex-col gap-0.5'>
                    <span className='font-semibold'>Saturday</span>
                    <span>
                      {`${restaurant.item.hours?.saturday?.open} - ${restaurant.item.hours?.saturday?.close}`}
                    </span>
                  </div>
                )}
                {restaurant.item.hours?.sunday && (
                  <div className='flex flex-col gap-0.5'>
                    <span className='font-semibold'>Sunday</span>
                    <span>
                      {`${restaurant.item.hours?.sunday?.open} - ${restaurant.item.hours?.sunday?.close}`}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <span>No information</span>
            )}
          </div>
          <TextSection
            title='Description'
            text={restaurant.item.description || 'No description.'}
          />
          <div className='flex flex-col'>
            <SectionTitle text='Dishes' />
            <div className='grid grid-flow-row grid-cols-3 gap-x-10 gap-y-1.5'>
              {restaurant.item.dishes.length > 0 ? (
                restaurant.item.dishes.map((dish) => (
                  <span key={dish}>{dish}</span>
                ))
              ) : (
                <span>No information</span>
              )}
            </div>
          </div>
          <div className='grid grid-cols-1 gap-10 md:grid-cols-3'>
            <div className='flex flex-col'>
              <SectionTitle text='Meal Types' />
              <div className='text-muted-foreground flex flex-col gap-1.5'>
                {restaurant.item.meal_types.length > 0 ? (
                  restaurant.item.meal_types.map((type) => (
                    <span key={type}>{type}</span>
                  ))
                ) : (
                  <span>No information</span>
                )}
              </div>
            </div>
            <div className='flex flex-col'>
              <SectionTitle text='Dietary Restrictions' />
              <div className='text-muted-foreground flex flex-col gap-1.5'>
                {restaurant.item.dietary_restrictions.length > 0 ? (
                  restaurant.item.dietary_restrictions.map((restriction) => (
                    <span key={restriction}>{restriction}</span>
                  ))
                ) : (
                  <span>No information</span>
                )}
              </div>
            </div>
            <div className='flex flex-col'>
              <SectionTitle text='Price' />
              <span className='text-muted-foreground'>
                {restaurant.item.price_levels.join(' - ')}
              </span>
            </div>
          </div>
          <div className='flex flex-col'>
            <SectionTitle text='Contact' />
            <div className='flex flex-col gap-2'>
              <div className='flex flex-row items-center gap-2'>
                <div>
                  <Phone size={20} className='stroke-primary' />
                </div>
                <span>
                  {restaurant.item.phone
                    ? restaurant.item.phone
                    : 'No information'}
                </span>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <div>
                  <Globe size={20} className='stroke-primary' />
                </div>
                {restaurant.item.website ? (
                  <Link
                    target='_blank'
                    href={restaurant.item.website}
                    className='hover:text-primary underline underline-offset-4'
                  >
                    {restaurant.item.website}
                  </Link>
                ) : (
                  <span>No information</span>
                )}
              </div>
              <div className='flex flex-row items-center gap-2'>
                <div>
                  <SquareMenu size={20} className='stroke-primary' />
                </div>
                {restaurant.item.menu_web_url ? (
                  <Link
                    target='_blank'
                    href={restaurant.item.menu_web_url}
                    className='hover:text-primary underline underline-offset-4'
                  >
                    {restaurant.item.menu_web_url}
                  </Link>
                ) : (
                  <span>No information</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-full grid grid-rows-2 gap-10 md:col-span-1'>
          <div className='col-span-1 flex flex-col'>
            <SectionTitle text='Rating Distribution' />
            <RatingChart histogram={restaurant.item.rating_histogram} />
          </div>
          <div className='col-span-1 flex flex-col'>
            <SectionTitle text='Amenities' />
            <Feature features={restaurant.item.features} />
          </div>
          <div className='flex flex-col'>
            <SectionTitle text='Cuisines' />
            <div className='text-muted-foreground flex flex-col gap-1.5'>
              {restaurant.item.cuisines.length > 0 ? (
                restaurant.item.cuisines.map((cuisine) => (
                  <span key={cuisine}>{cuisine}</span>
                ))
              ) : (
                <span>No information</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col py-10'>
        <SectionTitle text='Map' />
        <MarkerMap zoom={16} items={[restaurant.item]} />
      </div>
      <div className='border-grid border-t py-10'>
        <SectionTitle text='Reviews' />
        {slug && typeof slug === 'string' ? (
          <ReviewSection placeId={slug as string} />
        ) : (
          <p>There is no review.</p>
        )}
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
