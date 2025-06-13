import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

export default function SkeletonDetailHotel() {
  return (
    <div className='h-[800px] min-w-4xl overflow-y-auto'>
      <div className='flex items-center gap-2 text-2xl font-bold'>
        <Skeleton className='h-8 w-48' />
        <div className='ml-2 flex items-center'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='ml-2 h-4 w-4 rounded-full' />
        </div>
      </div>
      <div className='md:col-span-2'>
        <div className='relative mb-4 h-64 w-full overflow-hidden rounded-lg'>
          <Skeleton className='h-full w-full' />
        </div>

        <div className='space-y-4'>
          <Card>
            <CardHeader className='mb-1'>
              <Skeleton className='h-6 w-40' />
            </CardHeader>
            <CardContent className='grid grid-cols-2'>
              <div className='flex flex-col gap-y-5'>
                <div className='flex items-start gap-3'>
                  <Skeleton className='mt-0.5 h-5 w-5' />
                  <div className='flex flex-row'>
                    <Skeleton className='h-5 w-64' />
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-5 w-5' />
                  <Skeleton className='h-5 w-32' />
                </div>
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-5 w-5' />
                  <Skeleton className='h-5 w-48' />
                </div>
              </div>

              <div className='flex flex-col gap-y-5'>
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-5 w-5' />
                  <Skeleton className='h-5 w-32' />
                </div>
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-5 w-5' />
                  <Skeleton className='h-5 w-40' />
                </div>
                <div className='flex items-center gap-3'>
                  <Skeleton className='h-5 w-5' />
                  <Skeleton className='h-5 w-24' />
                </div>
              </div>
            </CardContent>
          </Card>
          <Separator />
          <Card>
            <CardHeader className='mb-1'>
              <Skeleton className='h-6 w-32' />
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-4/5' />
                <Skeleton className='h-4 w-3/4' />
              </div>
            </CardContent>
          </Card>
          <Separator className='my-4' />
          <Card>
            <CardHeader className='mb-1'>
              <Skeleton className='h-6 w-36' />
            </CardHeader>
            <CardContent className='flex flex-wrap gap-2'>
              {Array(4).map((_, index) => (
                <Skeleton key={index} className='h-8 w-24' />
              ))}
            </CardContent>
          </Card>
          <Separator className='my-4' />
          <Card>
            <CardHeader className='mb-1'>
              <Skeleton className='h-6 w-40' />
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-4/5' />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
