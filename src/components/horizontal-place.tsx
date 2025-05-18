'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { IAttraction } from '@/types/IAttraction';

import Address from './address';
import Rating from './rating';
import SavePlaceButton from './save-place-button';
import { AspectRatio } from './ui/aspect-ratio';
import { Button } from './ui/button';

interface Props {
  places: IAttraction[];
  totalPages: number;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export default function HorizontalPlace({
  places,
  totalPages,
  className,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  function handlePreviousPage() {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (page - 1).toString());
    router.push(`?${params.toString()}`);
  }

  function handleNextPage() {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (page + 1).toString());
    router.push(`?${params.toString()}`);
  }

  return (
    <div className={cn('grid grid-cols-1 gap-4', className)}>
      {places.map((place) => (
        <div
          key={place.elementId}
          className='grid grid-cols-3 gap-1 md:grid-cols-5'
        >
          <div className='col-span-1'>
            <AspectRatio ratio={1 / 1}>
              <Image
                fill
                alt={place.name}
                src={place.image}
                className='rounded-md object-cover object-center'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </AspectRatio>
          </div>

          <Link
            href={`/${place.type.toLowerCase()}/${place.elementId}`}
            className='group col-span-2 ml-4 flex flex-col justify-center md:col-span-3 md:justify-start md:py-8'
          >
            <span className='text-xl leading-snug font-bold tracking-tight underline-offset-2 group-hover:underline sm:text-2xl'>
              {place.name}
            </span>
            <Address
              street={place.street}
              city={place.city.name}
              postalCode={place.city.postalCode}
            />
            <Rating
              className='mt-1.5 sm:mt-2 md:mt-2.5'
              rating={place.rating}
              ratingHistorgram={place.ratingHistogram}
            />
          </Link>

          <div className='col-span-1 flex justify-end md:my-8'>
            <SavePlaceButton />
          </div>
        </div>
      ))}

      <div className='flex flex-row items-center justify-center gap-2 text-sm font-medium'>
        <Button
          variant='outline'
          disabled={page === 1}
          aria-disabled={page === 1}
          onClick={handlePreviousPage}
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </Button>
        <span className='px-3'>
          Page {page} of {totalPages}
        </span>
        <Button
          variant='outline'
          disabled={page === totalPages}
          aria-disabled={page === totalPages}
          onClick={handleNextPage}
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
