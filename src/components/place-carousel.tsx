'use client';

import Autoplay from 'embla-carousel-autoplay';

import { cn } from '@/lib/utils';
import { IAttraction } from '@/types/IAttraction';

import CardItem from './card-item';
import Loading from './loading';
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
      <div className='mb-5 space-y-1'>
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
              <CarouselItem key={index} className='max-w-3xs'>
                <CardItem item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
