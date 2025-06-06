import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function SkeletonListRestaurant() {
  return (
    <>
      <div className='grid gap-5'>
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            className='flex h-24 flex-row items-center justify-between p-4'
            key={index}
          >
            <Skeleton className='h-15 w-full rounded-lg object-cover' />
          </Card>
        ))}
      </div>
    </>
  );
}
