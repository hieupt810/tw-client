import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type Props = {
  images: string[];
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

export default function ThumbnailsCarousel({ images, className }: Props) {
  return (
    <div className={className}>
      <Carousel
        opts={{ align: 'start' }}
        plugins={[Autoplay({ delay: 5000 })]}
        className='mx-auto h-full w-[calc(100%-6rem)] max-w-lg md:max-w-3xl'
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={1.8 / 1}>
                <Image
                  fill
                  priority
                  alt='Placeholder'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  src={image}
                  className='overflow-hidden rounded-lg object-cover object-center'
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
}
