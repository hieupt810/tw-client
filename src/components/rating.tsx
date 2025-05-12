import { cn } from '@/lib/utils';

import CircleRating from './icons/circle-rating';

type Props = {
  rating: number;
  totalRatings?: number;
  className?: React.ComponentProps<'div'>['className'];
};

export default function Rating({ rating, totalRatings, className }: Props) {
  const quotient = Math.floor(rating);
  const decimal = parseFloat((rating % 1).toFixed(1)) * 10;
  return (
    <div
      className={cn(
        'text-muted-foreground flex flex-row items-center gap-1 text-base',
        className,
      )}
    >
      <span className='w-6'>{rating.toFixed(1)}</span>
      <div className='flex flex-row items-center gap-0.5'>
        {Array.from({ length: quotient }).map((_, index) => (
          <CircleRating key={index} fillPercent={100} className='size-4' />
        ))}
        {decimal > 0 && (
          <CircleRating fillPercent={decimal * 10} className='size-4' />
        )}
      </div>
      {totalRatings && totalRatings > 0 && <span>({totalRatings})</span>}
    </div>
  );
}
