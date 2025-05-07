import { cn } from '@/lib/utils';

import CircleRating from './icons/circle-rating';

const Rating = ({
  rating,
  size = 'md',
  totalRatings,
}: {
  rating: number;
  size?: 'sm' | 'md';
  totalRatings?: number;
}) => {
  const quotient = Math.floor(rating);
  const decimal = parseFloat((rating % 1).toFixed(1)) * 10;

  return (
    <div
      className={cn(
        'text-muted-foreground flex flex-row items-center gap-1.5 text-base',
        size === 'sm' && 'gap-1 text-sm',
      )}
    >
      <span className='w-6'>{rating}</span>
      <div className='flex flex-row items-center gap-0.5'>
        {Array.from({ length: quotient }).map((_, index) => (
          <CircleRating
            key={index}
            fillPercent={100}
            className={cn('size-4', size === 'sm' && 'size-3.5')}
          />
        ))}
        {decimal > 0 && (
          <CircleRating
            fillPercent={decimal * 10}
            className={cn('size-4', size === 'sm' && 'size-3.5')}
          />
        )}
      </div>
      {totalRatings && totalRatings > 0 && <span>({totalRatings})</span>}
    </div>
  );
};

export default Rating;
