import { Trash } from 'lucide-react';
import Image from 'next/image';

import MaxWidthContainer from '@/components/max-width-container';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  return (
    <>
      <MaxWidthContainer className='grow border-b'>
        <h2 className='mb-1 text-xl leading-relaxed font-semibold tracking-tight md:text-2xl md:leading-loose'>
          Profile
        </h2>
      </MaxWidthContainer>
      <MaxWidthContainer className='border-b'>
        <h2 className='mb-1 text-xl leading-relaxed font-semibold tracking-tight md:text-2xl md:leading-loose'>
          Favorites
        </h2>
        <div className='flex flex-row items-center gap-6 overflow-hidden rounded-md bg-violet-50 px-4 py-2.5'>
          <div className='w-20'>
            <AspectRatio ratio={1 / 1}>
              <Image
                fill
                src={'/home.jpg'}
                alt={'Image'}
                className='rounded-md object-cover object-center'
              />
            </AspectRatio>
          </div>
          <div className='flex grow flex-col gap-0.5'>
            <span className='text-lg font-semibold'>Title</span>
            <span className='text-muted-foreground text-sm'>Address</span>
          </div>
          <Button variant='destructive' size='icon'>
            <Trash />
          </Button>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer className='border-b'>
        <h2 className='mb-1 text-xl leading-relaxed font-semibold tracking-tight md:text-2xl md:leading-loose'>
          Trips
        </h2>
      </MaxWidthContainer>
    </>
  );
}
