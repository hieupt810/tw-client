import { cn } from '@/lib/utils';

import CircleRating from './icons/circle-rating';

type Props = {
  rating: number;
  size?: 'sm' | 'md';
};

export default function Rating({ rating, size = 'md' }: Props) {
  const quotient = Math.floor(rating);
  const decimal = parseFloat((rating % 1).toFixed(1)) * 10;

  return (
    <div className='text-muted-foreground flex flex-row items-center gap-1.5'>
      <span className={cn('text-base', size === 'sm' && 'text-sm')}>
        {rating}
      </span>
      <div className='flex flex-row items-center gap-0.5'>
        {Array.from({ length: quotient }).map((_, index) => (
          <CircleRating
            key={index}
            fillPercent={100}
            className={cn('size-4', size === 'sm' && 'size-3')}
          />
        ))}
        {decimal > 0 && (
          <CircleRating
            fillPercent={decimal * 10}
            className={cn('size-4', size === 'sm' && 'size-3')}
          />
        )}
      </div>
    </div>
  );
}
