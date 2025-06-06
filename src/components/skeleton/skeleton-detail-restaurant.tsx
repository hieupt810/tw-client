import { Skeleton } from '../ui/skeleton';

export default function SkeletonDetailRestaurant() {
  return (
    <>
      <div className='relative'>
        <Skeleton className='h-64 w-full rounded-lg object-cover' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-6 w-1/2 rounded-lg' />
      </div>
      <div className='mt-6 grid h-60 grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
          <Skeleton className='h-full w-full' />
        </div>
        <div>
          <Skeleton className='h-full w-full' />
        </div>
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
          <Skeleton className='h-full w-full' />
        </div>
        <div>
          <Skeleton className='h-full w-full' />
        </div>
      </div>
      <div className='mt-6'>
        <Skeleton className='h-full w-full' />
      </div>
    </>
  );
}
