'use client';

import { HTTPError } from 'ky';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import Address from '@/components/address';
import Loading from '@/components/loading';
import Rating from '@/components/rating';
import SavePlaceButton from '@/components/save-place-button';
import SectionTitle from '@/components/section-title';
import ThumbnailsCarousel from '@/components/thumbnails-carousel';
import { cn } from '@/lib/utils';
import { ThingToDoService } from '@/services/thing-to-do';
import { IError } from '@/types/IError';
import { IThingToDo } from '@/types/IThingToDo';

const MarkerMap = dynamic(() => import('@/components/marker-map'), {
  ssr: false,
});

export default function HotelDetailsPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [item, setItem] = useState<IThingToDo | null>(null);

  const fetchItem = useCallback(
    async function (elementId: string) {
      try {
        const data = await ThingToDoService.details(elementId);
        setItem(data);
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
      <div className='border-grid flex flex-col gap-1 border-b p-10 md:p-6'>
        <div className='flex flex-row justify-between'>
          <span className='text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl'>
            {item.name}
          </span>
          <SavePlaceButton elementId={item.elementId} />
        </div>
        <Rating rating={item.rating} ratingHistorgram={item.ratingHistogram} />
        <Address
          street={item.street}
          city={item.city.name}
          postalCode={item.city.postalCode}
        />
        <ThumbnailsCarousel images={item.photos} className='mt-2.5' />
      </div>
      <div className='border-grid my-6 grid grid-cols-5 gap-10'>
        <TextSection
          title='Description'
          text={item.description || 'No description.'}
          className='col-span-3'
        />
        <div className='flex flex-col'>
          {item.subcategories.length > 0 && (
            <>
              <SectionTitle text='Subcategories' />
              <div className='text-muted-foreground flex flex-col gap-0.5'>
                {item.subcategories.map((subcategory) => (
                  <span key={subcategory}>{subcategory}</span>
                ))}
              </div>
            </>
          )}
        </div>
        <div className='flex flex-col'>
          {item.subtypes.length > 0 && (
            <>
              <SectionTitle text='Subtypes' />
              <div className='text-muted-foreground flex flex-col gap-0.5'>
                {item.subtypes.map((subtype) => (
                  <span key={subtype}>{subtype}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className='border-grid flex flex-col border-t px-10 py-6 md:px-6'>
        <SectionTitle text='Map' />
        <MarkerMap zoom={15} items={[item]} />
      </div>
      <div className='border-grid border-t px-10 py-6 md:px-6'>
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
    <div className={cn('border-grid flex flex-col px-10 md:px-6', className)}>
      <SectionTitle text={title} />
      <p className='text-justify leading-relaxed'>{text}</p>
    </div>
  );
}
