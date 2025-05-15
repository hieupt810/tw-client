'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Heart, ListPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { IAttraction } from '@/types/IAttraction';

import Loading from './loading';
import Rating from './rating';
import { AspectRatio } from './ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

type Props = {
  title: string;
  items: IAttraction[];
  autoplay?: boolean;
  description?: string;
  autoplayDelay?: number;
};

export default function PlaceCarousel({
  title,
  items,
  autoplay = false,
  description,
  autoplayDelay = 8000,
}: Props) {
  if (!items || items.length === 0) {
    return <Loading />;
  }

  return (
    <div className='flex w-full flex-col'>
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
            {items.map((item) => (
              <CarouselItem
                key={item.elementId}
                className='max-w-3xs md:max-w-2xs'
              >
                <AspectRatio ratio={1 / 1} className='relative'>
                  <Image
                    fill
                    priority
                    src={item.image}
                    alt='Placeholder'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='h-full w-full rounded-xl object-cover object-center'
                  />
                  <div className='absolute top-1.5 right-1.5 flex items-center gap-1'>
                    <button
                      aria-label='Bookmark this place'
                      className='inline-flex cursor-pointer items-center justify-center rounded-full bg-white p-1.5 hover:bg-neutral-50'
                    >
                      <ListPlus size={16} />
                    </button>
                    <button
                      aria-label='Bookmark this place'
                      className='inline-flex cursor-pointer items-center justify-center rounded-full bg-white p-1.5'
                    >
                      <Heart size={16} />
                    </button>
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
