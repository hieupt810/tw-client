'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Heart, ListPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Rating from './rating';
import { AspectRatio } from './ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

type Props = {
  title: string;
  autoplay?: boolean;
  description?: string;
  autoplayDelay?: number;
};

export default function PlaceCarousel({
  title,
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
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className='max-w-3xs md:max-w-2xs'>
                <Link
                  href={'/hotels/1'}
                  className='flex flex-col hover:opacity-90'
                >
                  <AspectRatio ratio={1 / 1} className='relative'>
                    <Image
                      fill
                      priority
                      alt='Placeholder'
                      sizes='(max-width: 768px) 100vw, 50vw'
                      src={'/home.jpg'}
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
                  <h3 className='mt-2 text-base leading-snug font-semibold tracking-tight md:text-lg'>
                    Hoi An/ Da Nang - Ba Na Hills - Golden Bridge Deluxe Small
                    group
                  </h3>
                  <Rating rating={4.8} className='mt-0.5' />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
