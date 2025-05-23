import Autoplay from 'embla-carousel-autoplay';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

import ImageWithFallback from './image-with-fallback';

type Props = {
  images: string[];
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

export default function ThumbnailsCarousel({ images, className }: Props) {
  return (
    <div className={cn('grid grid-cols-4 gap-2', className)}>
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 7000 })]}
        className='col-span-full md:col-span-3'
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className='bg-muted'>
              <AspectRatio ratio={16 / 9}>
                <ImageWithFallback
                  fill
                  priority
                  alt='Placeholder'
                  src={image}
                  quality={100}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='overflow-hidden object-contain'
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className='col-span-full flex flex-row gap-1 md:col-span-1 md:flex-col'>
        {images.splice(0, 3).map((image, idx) => (
          <AspectRatio
            key={image}
            ratio={16 / 9}
            className='bg-muted overflow-hidden rounded-md'
          >
            <ImageWithFallback
              fill
              priority
              alt={`Image ${idx + 1}`}
              src={image}
              quality={100}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='overflow-hidden object-cover object-center'
            />
          </AspectRatio>
        ))}
      </div>
    </div>
  );
}
