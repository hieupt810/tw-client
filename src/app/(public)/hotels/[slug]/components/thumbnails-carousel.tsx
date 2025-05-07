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

const ThumbnailsCarousel = ({
  images,
  className,
}: {
  images: string[];
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}) => (
  <div className={className}>
    <Carousel
      plugins={[Autoplay({ delay: 5000 })]}
      opts={{ align: 'start' }}
      className='mx-auto h-full w-[calc(100%-6rem)]'
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className='p-1'>
              <AspectRatio ratio={1.8 / 1}>
                <Image
                  fill
                  priority
                  alt='Placeholder'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  src={image}
                  className='overflow-hidden rounded-md object-cover object-center'
                />
              </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  </div>
);

export default ThumbnailsCarousel;
