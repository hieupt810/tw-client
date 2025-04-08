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
  delay = 3000,
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
    <div className={cn('w-full md:px-12', className)}>
      <Carousel
        setApi={setApi}
        opts={{ align: 'center', loop: true }}
        plugins={[Autoplay({ delay: delay })]}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className='p-1'>
                <AspectRatio
                  ratio={ratio}
                  className='overflow-hidden rounded-md'
                >
                  <Image
                    fill
                    src={image}
                    alt='Image'
                    className='h-full w-full object-cover object-center'
                  />
                </AspectRatio>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='max-md:hidden' />
        <CarouselNext className='max-md:hidden' />
      </Carousel>
      <div className='text-muted-foreground py-2 text-center text-sm'>
        Image {current} of {count}
      </div>
    </div>
  );
}
