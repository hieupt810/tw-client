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
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 7000 })]}
        className='mx-auto h-full w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl'
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
                  sizes='100vw'
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
