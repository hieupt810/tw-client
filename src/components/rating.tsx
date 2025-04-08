import CircleRating from './icons/circle-rating';

type Props = {
  rating: number;
};

export default function Rating({ rating }: Props) {
  const quotient = Math.floor(rating);
  const decimal = parseFloat((rating % 1).toFixed(1)) * 10;

  return (
    <div className='text-muted-foreground flex flex-row items-center gap-2'>
      <span className='w-6'>{rating}</span>
      <div className='flex flex-row items-center gap-0.5'>
        {Array.from({ length: quotient }).map((_, index) => (
          <CircleRating key={index} fillPercent={100} className='size-4' />
        ))}
        {decimal > 0 && (
          <CircleRating fillPercent={decimal * 10} className='size-4' />
        )}
      </div>
    </div>
  );
}
