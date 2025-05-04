'use client';

import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

type Props = {
  title: string;
  description?: string;
};

export default function PlaceCarousel({ title, description }: Props) {
  return (
    <div className='flex w-full flex-col py-6'>
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
          className='mx-auto w-[90%]'
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className='basis-1/2 md:basis-1/3 lg:basis-1/4'
              >
                <div className='p-1'>
                  <Card>
                    <CardContent className='flex aspect-square items-center justify-center p-6'>
                      <span className='text-3xl font-semibold'>
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>
    </div>
  );
}
