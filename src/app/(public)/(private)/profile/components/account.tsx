import { useEffect } from 'react';
import { useStore } from 'zustand';

import ImageWithFallback from '@/components/image-with-fallback';
import PlaceCarousel from '@/components/place-carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/auth-store';
import { useFavouriteStore } from '@/stores/favourite-store';

export default function AccountComponent() {
  const me = useStore(useAuthStore, (state) => state.me);
  const { favourites, reset, list } = useStore(
    useFavouriteStore,
    (state) => state,
  );

  useEffect(() => {
    list();
    return () => {
      reset();
    };
  }, [list, reset]);

  if (!me) return null;
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col'>
        <span className='text-lg font-bold tracking-tight md:text-xl lg:text-2xl'>
          Account
        </span>
        <div className='mt-5 grid grid-cols-3 gap-5'>
          <div
            className='border-primary mx-auto size-28 overflow-hidden rounded-full border select-none'
            aria-label='User Avatar'
          >
            <ImageWithFallback
              width={5000}
              height={5000}
              src={me.avatar || '/fallback-avatar.jpg'}
              alt={me.fullName}
            />
          </div>
          <div className='col-span-2 flex flex-col justify-center gap-3'>
            <div className='grid grid-cols-3 gap-4'>
              <Label htmlFor='userId'>User ID</Label>
              <span id='userId' className='col-span-2 text-sm'>
                {me.id}
              </span>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <Label htmlFor='fullName'>Full Name</Label>
              <Input
                disabled
                id='fullName'
                value={me.fullName}
                className='col-span-2'
              />
            </div>
          </div>
        </div>
      </div>
      <PlaceCarousel
        autoplay
        title='Favourites'
        items={favourites}
        autoplayDelay={5000}
      />
    </div>
  );
}
