import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

type StartRatingProps = {
  rate: number;
  maxRate?: number;
  className?: string;
};

export const StartRating = ({
  rate = 3,
  maxRate = 5,
  className,
}: StartRatingProps) => {
  return Array.from({ length: maxRate }, (_, index) => (
    <Star
      key={index}
      className={cn(
        'h-4 w-4',
        index < rate
          ? 'fill-yellow-400 text-yellow-400'
          : 'fill-gray-200 text-gray-200',
        className,
      )}
    />
  ));
};
