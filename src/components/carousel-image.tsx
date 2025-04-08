'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

type Props = {
  images: string[];
  delay?: number;
  ratio?: number;
  className?: React.ComponentProps<'div'>['className'];
};

export default function CarouselImage({
  images,
  delay = 5000,
  ratio = 16 / 9,
  className,
}: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      className={cn('relative w-full overflow-hidden rounded-md', className)}
    >
      <Carousel
        setApi={setApi}
        opts={{ align: 'center', loop: true }}
        plugins={[Autoplay({ delay: delay })]}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={ratio} className='overflow-hidden rounded-md'>
                <Image
                  fill
                  src={image}
                  alt='Image'
                  className='h-full w-full object-cover object-center'
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='max-md:hidden' />
        <CarouselNext className='max-md:hidden' />
      </Carousel>
      <div className='absolute bottom-2 z-10 flex w-full items-center justify-center'>
        <div className='rounded-md bg-black/60 px-3 py-1.5 text-center text-xs text-white'>
          {current}/{count}
        </div>
      </div>
    </div>
  );
}
