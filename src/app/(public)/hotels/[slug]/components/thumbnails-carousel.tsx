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
  className,
}: {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}) => (
  <div className={className}>
    <Carousel
      plugins={[Autoplay({ delay: 8000 })]}
      opts={{ align: 'start' }}
      className='mx-auto h-full w-[calc(100%-6rem)]'
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className='p-1'>
              <AspectRatio ratio={1.8 / 1}>
                <Image
                  fill
                  alt='Placeholder'
                  src='https://placehold.co/1800x1000/png'
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
