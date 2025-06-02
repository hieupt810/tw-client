import { cn } from '@/lib/utils';

type HotelClassProps = {
  levelClass: string;
};

export const HotelClass = ({ levelClass }: HotelClassProps) => {
  const formattedClass = Math.round(Number(levelClass));
  return (
    <span
      className={cn(
        'px-2 py-1 text-sm font-semibold',
        formattedClass >= 5
          ? 'text-primary bg-primary-foreground'
          : formattedClass >= 3
            ? 'bg-green-50 text-green-500'
            : 'bg-yellow-50 text-yellow-500',
      )}
    >
      {formattedClass}-star Hotel
    </span>
  );
};
