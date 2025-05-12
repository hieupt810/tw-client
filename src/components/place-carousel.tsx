'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Heart, ListPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { IBaseItem } from '@/types/IBaseItem';

import Rating from './rating';
import { AspectRatio } from './ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { Skeleton } from './ui/skeleton';

type Props = {
  title: string;
  items: IBaseItem[];
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
            {items.length === 0
              ? Array.from({ length: 10 }).map((_, index) => (
                  <CarouselItem key={index} className='max-w-3xs md:max-w-2xs'>
                    <Skeleton className='h-[15rem] w-[15rem] rounded-xl md:h-[17rem] md:w-[17rem]' />
                    <Skeleton className='mt-1.5 h-[4.6rem] w-full rounded-xl' />
                  </CarouselItem>
                ))
              : items.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className='max-w-3xs md:max-w-2xs'
                  >
                    <Link
                      href={`/hotels/${item.id}`}
                      className='flex flex-col hover:opacity-90'
                    >
                      <AspectRatio ratio={1 / 1} className='relative'>
                        <Image
                          fill
                          priority
                          src={item.image}
                          alt='Placeholder'
                          sizes='(max-width: 768px) 100vw, 50vw'
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
                            className='inline-flex cursor-pointer items-center justify-center rounded-full bg-white p-1.5 hover:bg-neutral-50'
                          >
                            <Heart size={16} />
                          </button>
                        </div>
                      </AspectRatio>
                      <h3 className='mt-1.5 text-base leading-snug font-semibold tracking-tight md:text-lg'>
                        {item.name}
                      </h3>
                      <Rating rating={item.rating} />
                    </Link>
                  </CarouselItem>
                ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
