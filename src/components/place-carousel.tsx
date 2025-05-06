'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Rating from './rating';
import { AspectRatio } from './ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

const PlaceCarousel = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className='flex w-full flex-col'>
      <div className='mb-4 space-y-1.5'>
        <h2 className='text-xl font-bold tracking-tight'>{title}</h2>
        {description && (
          <p className='text-muted-foreground text-sm'>{description}</p>
        )}
      </div>
      <div className='w-full'>
        <Carousel
          plugins={[Autoplay({ delay: 8000 })]}
          opts={{ align: 'start' }}
          className='mx-auto'
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className='basis-1/2 md:basis-1/3 xl:basis-1/4'
              >
                <Link
                  href={'/'}
                  className='flex flex-col rounded-md p-0.5 hover:opacity-90'
                >
                  <AspectRatio ratio={1 / 1} className='relative'>
                    <Image
                      fill
                      priority
                      alt='Placeholder'
                      sizes='(max-width: 768px) 100vw, 50vw'
                      src='https://placehold.co/1000x1000/png'
                      className='h-full w-full rounded-md object-cover object-center'
                    />
                    <button
                      aria-label='Bookmark this place'
                      className='absolute top-1.5 right-1.5 inline-flex cursor-pointer items-center justify-center rounded-full bg-white p-1.5 hover:bg-neutral-50'
                    >
                      <Heart size={16} />
                    </button>
                  </AspectRatio>
                  <h3 className='mt-2 text-lg leading-snug font-semibold tracking-tight'>
                    Hoi An/ Da Nang - Ba Na Hills - Golden Bridge Deluxe Small
                    group
                  </h3>
                  <div className='mt-1 inline-flex items-center gap-1.5'>
                    <Rating rating={4.8} size='sm' />
                    <span className='text-muted-foreground text-sm'>
                      (1540)
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default PlaceCarousel;
