import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonProfile() {
  return (
    <div className='flex-1'>
      {/* User Avatar and Name Section */}
      <div className='mb-3 flex items-center space-x-6'>
        <Skeleton className='h-28 w-28 rounded-full' />
        <div>
          <Skeleton className='h-6 w-48' />
        </div>
      </div>

      {/* Form Section */}
      <div className='max-w-4xl'>
        <div className='space-y-6 pb-4'>
          {/* Edit Button Skeleton */}
          <div className='mb-6 flex justify-end'>
            <Skeleton className='h-8 w-20' />
          </div>

          {/* Form Fields Grid */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Full Name Field */}
            <div className='space-y-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-10 w-full' />
            </div>
            {/* Email Field */}
            <div className='space-y-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-10 w-full' />
            </div>
            {/* Phone Number Field */}
            <div className='space-y-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-10 w-full' />
            </div>
            {/* Birthday Field */}
            <div className='space-y-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>
        </div>
      </div>

      {/* PlaceCarousel Skeleton */}
      <div className='mt-6'>
        <Skeleton className='mb-4 h-6 w-32' />
        <div className='flex space-x-4 overflow-hidden'>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className='h-48 w-64' />
          ))}
        </div>
      </div>
    </div>
  );
}
