'use client';

import { Globe, Phone } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import AddTripButton from '@/components/add-trip-button';
import Address from '@/components/address';
import Loading from '@/components/loading';
import Rating from '@/components/rating';
import RatingChart from '@/components/rating-chart';
import { ReviewSection } from '@/components/review-section';
import SavePlaceButton from '@/components/save-place-button';
import SectionTitle from '@/components/section-title';
import ThumbnailsCarousel from '@/components/thumbnails-carousel';
import { cn } from '@/lib/utils';
import { useThingToDoStore } from '@/stores/thing-to-do-store';

const MarkerMap = dynamic(() => import('@/components/marker-map'), {
  ssr: false,
});

export default function ThingToDoDetailsPage() {
  const { slug } = useParams();

  const { thingToDo, reset, fetchThingToDo } = useStore(
    useThingToDoStore,
    (state) => state,
  );

  useEffect(() => {
    if (!slug || typeof slug !== 'string') return;
    fetchThingToDo(slug);
    return () => {
      reset();
    };
  }, [slug, fetchThingToDo, reset]);

  if (!thingToDo.item) return <Loading />;

  return (
    <>
      <div className='border-grid flex flex-col gap-0.5 border-b py-10'>
        <div className='flex flex-row justify-between'>
          <span className='text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl'>
            {thingToDo.item.name}
          </span>
          <div className='flex flex-row items-center gap-2'>
            <AddTripButton elementId={thingToDo.item.element_id} />
            <SavePlaceButton
              elementId={thingToDo.item.element_id}
              isFavorite={thingToDo.item.is_favorite}
            />
          </div>
        </div>
        <Rating
          rating={thingToDo.item.rating}
          ratingHistorgram={thingToDo.item.rating_histogram}
        />
        <Address
          street={thingToDo.item.street}
          city={thingToDo.item.city.name}
        />
        <ThumbnailsCarousel images={thingToDo.item.photos} className='mt-4' />
      </div>
      <div className='border-grid grid grid-cols-3 gap-10 border-b py-10 md:gap-20'>
        <div className='col-span-full flex flex-col gap-10 md:col-span-2'>
          <TextSection
            title='Description'
            text={thingToDo.item.description || 'No description.'}
          />
          <div className='grid grid-cols-2 gap-10 md:grid-cols-3'>
            <div className='flex flex-col'>
              <SectionTitle text='Sub-types' />
              <div className='text-muted-foreground flex flex-col gap-1.5'>
                {thingToDo.item.subtypes.length > 0 ? (
                  thingToDo.item.subtypes.map((subtype) => (
                    <span key={subtype}>{subtype}</span>
                  ))
                ) : (
                  <span>No information</span>
                )}
              </div>
            </div>
            <div className='flex flex-col'>
              <SectionTitle text='Sub-categories' />
              <div className='text-muted-foreground flex flex-col gap-1.5'>
                {thingToDo.item.subcategories.length > 0 ? (
                  thingToDo.item.subcategories.map((subcategory) => (
                    <span key={subcategory}>{subcategory}</span>
                  ))
                ) : (
                  <span>No information</span>
                )}
              </div>
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
                  {thingToDo.item.phone
                    ? thingToDo.item.phone
                    : 'No information'}
                </span>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <div>
                  <Globe size={20} className='stroke-primary' />
                </div>
                {thingToDo.item.website ? (
                  <Link
                    target='_blank'
                    href={thingToDo.item.website}
                    className='hover:text-primary underline underline-offset-4'
                  >
                    {thingToDo.item.website}
                  </Link>
                ) : (
                  <span>No information</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-full flex flex-col md:col-span-1'>
          <SectionTitle text='Rating Distribution' />
          <RatingChart histogram={thingToDo.item.rating_histogram} />
        </div>
      </div>
      <div className='flex flex-col py-10'>
        <SectionTitle text='Map' />
        <MarkerMap zoom={16} items={[thingToDo.item]} />
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
