'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { IAttraction } from '@/types/IAttraction';

import AddTripButton from './add-trip-button';
import Loading from './loading';
import Rating from './rating';
import SavePlaceButton from './save-place-button';
import { AspectRatio } from './ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

type Props = {
  title: string;
  items: IAttraction[];
  autoplay?: boolean;
  description?: string;
  autoplayDelay?: number;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

export default function PlaceCarousel({
  title,
  items,
  className,
  description,
  autoplay = false,
  autoplayDelay = 8000,
}: Props) {
  if (!items || items.length === 0) return <Loading />;

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className='mb-4 space-y-1.5'>
        <h2 className='text-lg font-bold tracking-tight md:text-xl lg:text-2xl'>
          {title}
        </h2>
        {description && <p className='text-muted-foreground'>{description}</p>}
      </div>
      <div className='w-full'>
        <Carousel
          plugins={autoplay ? [Autoplay({ delay: autoplayDelay })] : []}
          opts={{ align: 'start' }}
          className='mx-auto'
        >
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={index} className='max-w-3xs md:max-w-2xs'>
                <AspectRatio ratio={1 / 1} className='relative'>
                  <Image
                    fill
                    priority
                    src={item.image}
                    alt='Placeholder'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='h-full w-full rounded-md object-cover object-center'
                  />
                  <div className='absolute top-2 right-2 flex items-center gap-1.5'>
                    <AddTripButton elementId={item.elementId} iconOnly />
                    <SavePlaceButton elementId={item.elementId} iconOnly />
                  </div>
                </AspectRatio>
                <Link
                  href={`/${item.type.toLowerCase()}/${item.elementId}`}
                  className='flex flex-col hover:opacity-90'
                >
                  <h3 className='mt-1.5 text-base leading-snug font-semibold tracking-tight underline-offset-4 hover:underline md:text-lg'>
                    {item.name}
                  </h3>
                  <Rating
                    rating={item.rating}
                    ratingHistorgram={item.ratingHistogram}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
