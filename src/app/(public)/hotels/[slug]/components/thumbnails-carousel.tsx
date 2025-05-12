import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

type Props = {
  images: string[];
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

export default function ThumbnailsCarousel({ images, className }: Props) {
  return (
    <div className={className}>
      <Carousel
        plugins={[Autoplay({ delay: 7000 })]}
        className='mx-auto h-full w-full max-w-lg md:max-w-4xl'
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={1.8 / 1}>
                <Image
                  fill
                  priority
                  alt='Placeholder'
                  src={image}
                  quality={100}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='overflow-hidden rounded-lg object-cover object-center'
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
