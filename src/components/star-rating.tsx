import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';

type Props = {
  rating: number;
  size?: number;
};

export default function StarRating({ rating, size = 20 }: Props) {
  const quotient = Math.floor(rating);
  const decimal = parseFloat((rating % 1).toFixed(1)) * 10;

  return (
    <div className='text-muted-foreground flex flex-row items-center gap-1'>
      <span className='w-6'>{rating}</span>
      <div className='flex flex-row items-center'>
        {Array.from({ length: quotient }).map((_, index) => (
          <Circle
            key={index}
            size={size}
            strokeWidth={1}
            className='fill-primary stroke-primary'
          />
        ))}

        {decimal > 0 && (
          <div className='relative h-full'>
            <Circle
              size={size}
              strokeWidth={1}
              className='fill-primary stroke-primary'
            />
            <div
              className={cn(
                'bg-background absolute top-0 right-0 z-10 h-full overflow-hidden',
                {
                  'w-[10%]': decimal === 9,
                  'w-[20%]': decimal === 8,
                  'w-[30%]': decimal === 7,
                  'w-[40%]': decimal === 6,
                  'w-[50%]': decimal === 5,
                  'w-[60%]': decimal === 4,
                  'w-[70%]': decimal === 3,
                  'w-[80%]': decimal === 2,
                  'w-[90%]': decimal === 1,
                },
              )}
            />
          </div>
        )}
      </div>
      <span>(283 reviews)</span>
    </div>
  );
}
