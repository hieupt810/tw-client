import Image from 'next/image';

import { cn } from '@/lib/utils';

import Rating from './rating';
import { AspectRatio } from './ui/aspect-ratio';

interface Props {
  className?: React.HTMLProps<HTMLDivElement>['className'];
}

export default function VerticalRecommend({ className }: Props) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-1 lg:gap-10',
        className,
      )}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className='flex cursor-pointer flex-col hover:opacity-80'
        >
          <div className='mx-auto w-full max-w-full'>
            <AspectRatio ratio={1 / 1}>
              <Image
                fill
                priority
                alt='Placeholder'
                quality={100}
                src={'/fallback-avatar.jpg'}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='overflow-hidden rounded-md object-cover object-center'
              />
            </AspectRatio>
          </div>
          <span className='mt-1.5 max-w-full truncate text-sm font-medium md:text-base'>
            Recommend Attraction Name
          </span>
          <Rating rating={5} ratingHistorgram={[1, 1, 1, 1, 1]} />
        </div>
      ))}
    </div>
  );
}
