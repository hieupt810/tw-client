'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { IAttraction } from '@/types/IAttraction';

import CardItem from './card-item';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

type Props = {
  title: string;
  items: IAttraction[];
  autoplay?: boolean;
  description?: string;
  autoplayDelay?: number;
  isContentLoading?: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

export default function PlaceCarousel({
  title,
  items,
  className,
  description,
  autoplay = false,
  isContentLoading = false,
  autoplayDelay = 8000,
}: Props) {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className='mb-5 space-y-1'>
        <h2 className='text-lg font-bold tracking-tight md:text-xl lg:text-2xl'>
          {title}
        </h2>
        {description && <p className='text-muted-foreground'>{description}</p>}
      </div>
      <div className='w-full'>
        {isContentLoading ? (
          <div className='flex items-center justify-center'>
            <Loader2 size={40} className='stroke-primary animate-spin' />
          </div>
        ) : items && items.length > 0 ? (
          <Carousel
            plugins={autoplay ? [Autoplay({ delay: autoplayDelay })] : []}
            opts={{ align: 'start' }}
            className='mx-auto'
          >
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem key={index} className='max-w-2xs'>
                  <CardItem item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <p className='text-center text-sm text-gray-500 italic'>
            List is empty.
          </p>
        )}
      </div>
    </div>
  );
}
