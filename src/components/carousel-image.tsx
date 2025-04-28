'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { AspectRatio } from './ui/aspect-ratio';
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
  className?: React.ComponentProps<'div'>['className'];
};

export default function CarouselImage({
  images,
  delay = 8000,
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
    <div className={cn('relative w-full max-w-4xl', className)}>
      <Carousel
        setApi={setApi}
        opts={{ align: 'center', loop: true }}
        plugins={[Autoplay({ delay: delay })]}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className='max-h-[20rem] md:max-h-[30rem]'
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  fill
                  src={image}
                  alt='Image'
                  className='h-full w-full overflow-hidden rounded-xl object-cover object-center'
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className='absolute bottom-2 z-10 flex w-full items-center justify-center'>
        <div className='rounded-md bg-black/60 px-3 py-1.5 text-center text-xs text-white'>
          {current}/{count}
        </div>
      </div>
    </div>
  );
}
