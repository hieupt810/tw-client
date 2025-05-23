'use client';

import { Globe, Phone, SquareMenu } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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
  }, [slug, fetchRestaurant]);

  if (!restaurant.item) return <Loading />;

  return (
    <>
      <div className='border-grid flex flex-col gap-0.5 border-b py-10'>
        <div className='flex flex-row justify-between'>
          <span className='text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl'>
            {restaurant.item.name}
          </span>
          <SavePlaceButton elementId={restaurant.item.elementId} />
        </div>
        <Rating
          rating={restaurant.item.rating}
          ratingHistorgram={restaurant.item.ratingHistogram}
        />
        <Address
          street={restaurant.item.street}
          city={restaurant.item.city.name}
        />
        <ThumbnailsCarousel images={restaurant.item.photos} className='mt-4' />
      </div>
      <div className='border-grid grid grid-cols-3 gap-20 border-b py-10'>
        <div className='col-span-2 flex flex-col gap-10'>
          <TextSection
            title='Description'
            text={restaurant.item.description || 'No description.'}
          />
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
                {restaurant.item.menuWebUrl ? (
                  <Link
                    target='_blank'
                    href={restaurant.item.menuWebUrl}
                    className='hover:text-primary underline underline-offset-4'
                  >
                    {restaurant.item.menuWebUrl}
                  </Link>
                ) : (
                  <span>No information</span>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <SectionTitle text='Opening Hours' />
            {restaurant.item.hours ? (
              <div className='flex flex-col gap-1.5'>
                <div className='grid grid-cols-3'>
                  <span className='font-medium'>Monday</span>
                  <div className='col-span-2'>
                    {`${restaurant.item.hours.monday.open} - ${restaurant.item.hours.monday.close}`}
                  </div>
                </div>
                <div className='grid grid-cols-3'>
                  <span className='font-medium'>Tuesday</span>
                  <div className='col-span-2'>
                    {`${restaurant.item.hours.tuesday.open} - ${restaurant.item.hours.tuesday.close}`}
                  </div>
                </div>
                <div className='grid grid-cols-3'>
                  <span className='font-medium'>Wednesday</span>
                  <div className='col-span-2'>
                    {`${restaurant.item.hours.wednesday.open} - ${restaurant.item.hours.wednesday.close}`}
                  </div>
                </div>
                <div className='grid grid-cols-3'>
                  <span className='font-medium'>Thursday</span>
                  <div className='col-span-2'>
                    {`${restaurant.item.hours.thursday.open} - ${restaurant.item.hours.thursday.close}`}
                  </div>
                </div>
                <div className='grid grid-cols-3'>
                  <span className='font-medium'>Friday</span>
                  <div className='col-span-2'>
                    {`${restaurant.item.hours.friday.open} - ${restaurant.item.hours.friday.close}`}
                  </div>
                </div>
                <div className='text-primary grid grid-cols-3'>
                  <span className='font-medium'>Saturday</span>
                  <div className='col-span-2'>
                    {`${restaurant.item.hours.saturday.open} - ${restaurant.item.hours.saturday.close}`}
                  </div>
                </div>
                <div className='text-primary grid grid-cols-3'>
                  <span className='font-medium'>Sunday</span>
                  <div className='col-span-2'>
                    {`${restaurant.item.hours.sunday.open} - ${restaurant.item.hours.sunday.close}`}
                  </div>
                </div>
              </div>
            ) : (
              <span>No information</span>
            )}
          </div>
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
          <div className='grid grid-cols-3 gap-10'>
            <div className='flex flex-col'>
              <SectionTitle text='Meal Types' />
              <div className='text-muted-foreground flex flex-col gap-1.5'>
                {restaurant.item.mealTypes.length > 0 ? (
                  restaurant.item.mealTypes.map((type) => (
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
                {restaurant.item.dietaryRestrictions.length > 0 ? (
                  restaurant.item.dietaryRestrictions.map((restriction) => (
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
                {restaurant.item.priceLevels.join(' - ')}
              </span>
            </div>
          </div>
        </div>
        <div className='grid grid-rows-2 gap-10'>
          <div className='col-span-1 flex flex-col'>
            <SectionTitle text='Rating Distribution' />
            <RatingChart histogram={restaurant.item.ratingHistogram} />
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
