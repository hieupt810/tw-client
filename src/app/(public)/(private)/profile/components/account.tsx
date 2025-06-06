import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from 'zustand';

import ImageWithFallback from '@/components/image-with-fallback';
import PlaceCarousel from '@/components/place-carousel';
import SkeletonProfile from '@/components/skeleton/skeleton-profile';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth-store';
import { useFavouriteStore } from '@/stores/favourite-store';
import { useUserStore } from '@/stores/user.store';
import {
  UpdateProfileSchema,
  updateProfileSchema,
} from '@/types/IUpdateProfileSchema';

export default function AccountComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const me = useStore(useAuthStore, (state) => state.me);
  const { fetchEditUser, fetchMe, user } = useStore(
    useUserStore,
    (state) => state,
  );
  const { favourites, reset, list, isLoading } = useStore(
    useFavouriteStore,
    (state) => state,
  );
  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      avatar: user.item?.avatar || '/fallback-avatar.jpg',
      full_name: user.item?.full_name || '',
      email: user.item?.email || '',
      phone_number: user.item?.phone_number || '',
      birthday: user.item?.birthday || '',
    },
  });

  useEffect(() => {
    if (user.item) {
      form.reset({
        avatar: user.item.avatar || '/fallback-avatar.jpg',
        full_name: user.item.full_name || '',
        email: user.item.email || '',
        phone_number: user.item.phone_number || '',
        birthday: user.item.birthday || '',
      });
    }
  }, [user.item, form]);

  useEffect(() => {
    fetchMe();
    list();
    return () => {
      reset();
    };
  }, [fetchMe, list, reset]);

  const onSubmit = async (data: UpdateProfileSchema) => {
    if (me) {
      await fetchEditUser(me.id, data);
      await fetchMe();
      setIsEditing(false);
    }
  };

  // if (!user.item) {
  //   return <Loading />;
  // }

  return isLoading ? (
    <SkeletonProfile />
  ) : (
    <div>
      <div className='flex-1'>
        <div className='mb-3 flex items-center space-x-6'>
          <div className='relative'>
            <div
              className='border-primary mx-auto size-28 overflow-hidden rounded-full border select-none'
              aria-label='User Avatar'
            >
              <ImageWithFallback
                width={5000}
                height={5000}
                src={user.item?.avatar || '/fallback-avatar.jpg'}
                alt={user.item?.full_name || 'User Avatar'}
              />
            </div>
          </div>
          <div>
            <h2 className='text-2xl font-semibold'>{user.item?.full_name}</h2>
          </div>
        </div>

        <div className='max-w-4xl'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              // onKeyDown={handleOnKeyDown}
              className='space-y-6 pb-4'
            >
              {/* Edit Button */}
              <div className='mb-6 flex justify-end'>
                {!isEditing ? (
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex items-center gap-1'
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className='h-4 w-4' />
                    Edit
                  </Button>
                ) : (
                  <div className='flex justify-end pt-4'>
                    <div className='space-x-3'>
                      <Button
                        variant='outline'
                        onClick={() => {
                          setIsEditing(false);
                          form.reset();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type='submit'
                        className='bg-purple-600 hover:bg-purple-700'
                        disabled={isLoading || form.formState.isSubmitting}
                        aria-disabled={isLoading || form.formState.isSubmitting}
                      >
                        {isLoading || form.formState.isSubmitting ? (
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        ) : null}
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='full_name'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel className='text-sm font-medium text-gray-700'>
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditing}
                          placeholder='Enter your full name'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel className='text-sm font-medium text-gray-700'>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='email'
                          disabled={true}
                          placeholder='Enter your email'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone_number'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel className='text-sm font-medium text-gray-700'>
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='tel'
                          disabled={!isEditing}
                          placeholder='Enter your phone number'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='birthday'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel className='text-sm font-medium text-gray-700'>
                        Birthday
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='date'
                          disabled={!isEditing}
                          placeholder='Enter birthday'
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value || null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
      <PlaceCarousel
        autoplay
        title='Favourites'
        items={favourites}
        // isContentLoading={isLoading}
        autoplayDelay={5000}
      />
    </div>
  );
}
