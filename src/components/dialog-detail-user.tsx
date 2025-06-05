import { zodResolver } from '@hookform/resolvers/zod';
import {
  Edit,
  Eye,
  Heart,
  Loader2,
  MapPin,
  MessageSquare,
  Star,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useStore } from 'zustand';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useUserStore } from '@/stores/user.store';
import {
  UpdateProfileSchema,
  updateProfileSchema,
} from '@/types/IUpdateProfileSchema';

import Loading from './loading';

export function UserDetailsDialog(props: { id: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const { id } = props;
  const { user, fetchUser, fetchEditUser } = useStore(
    useUserStore,
    (state) => state,
  );

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      full_name: user.item?.full_name || '',
      email: user.item?.email || '',
      phone_number: user.item?.phone_number || '',
      birthday: user.item?.birthday ?? null,
    },
  });

  useEffect(() => {
    if (open) {
      fetchUser(id);
    }
  }, [open, id, fetchUser]);

  useEffect(() => {
    if (user.item) {
      form.reset({
        full_name: user.item.full_name || '',
        email: user.item.email || '',
        phone_number: user.item.phone_number || '',
        birthday: user.item.birthday || '',
      });
    }
  }, [user.item, form]);

  useEffect(() => {
    if (isSubmittingEdit && !user.isLoading) {
      if (!user.error) {
        toast.success('Update successful!');
        setOpen(false);
      } else {
        toast.error('Update failed!');
      }
      setIsSubmittingEdit(false);
    }
  }, [user.isLoading, user.error, isSubmittingEdit]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const onSubmit = async (data: UpdateProfileSchema) => {
    if (user.item?.id) {
      setIsSubmittingEdit(true);
      await fetchEditUser(user.item.id, data);
      await fetchUser(user.item.id);
      setIsEditing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Eye className='h-3 w-3 md:h-4 md:w-4' />
          <span className='hidden sm:inline'>Detail</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='h-[800px] overflow-y-auto sm:max-w-[600px]'>
        {user.isLoading ? (
          <Loading />
        ) : (
          <>
            {/* User Profile Section */}
            <div className='flex flex-col items-center gap-6 pb-2'>
              <div className='relative'>
                <Avatar className='border-background h-28 w-28 border-4 shadow-lg'>
                  <AvatarImage src={user.item?.avatar || ''} />
                  <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white'>
                    {getInitials(user.item?.full_name || 'Unknown User')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className='space-y-2 text-center'>
                <h2 className='text-foreground text-2xl font-bold'>
                  {user.item?.full_name || 'Unknown User'}
                </h2>
              </div>
            </div>

            <Separator className='my-6' />

            {/* Personal Information */}
            <div className='space-y-6'>
              <div>
                <div className='mb-4 flex items-center justify-between'>
                  <h3 className='flex items-center gap-2 text-lg font-semibold'>
                    <User className='h-5 w-5' />
                    Detail of User
                  </h3>
                  {!isEditing ? (
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className='h-4 w-4' />
                      Edit
                    </Button>
                  ) : (
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
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        onClick={form.handleSubmit(onSubmit)}
                      >
                        {form.formState.isSubmitting ? (
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        ) : null}
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                  >
                    <div className='grid gap-4'>
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
                                placeholder='Enter full name'
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
                                placeholder='Enter email'
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
                                placeholder='Enter phone number'
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

              {/* Statistics */}
              <div>
                <h3 className='mb-4 flex items-center gap-2 text-lg font-semibold'>
                  <Star className='h-5 w-5' />
                  Activity Statistics
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  <Card className='border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900'>
                    <CardContent className='flex flex-col items-center justify-center p-6 text-center'>
                      <MapPin className='mb-2 h-8 w-8 text-blue-600 dark:text-blue-400' />
                      <div className='text-3xl font-bold text-blue-700 dark:text-blue-300'>
                        {user.item?.statistics?.trips_count || 0}
                      </div>
                      <div className='text-sm font-medium text-blue-600 dark:text-blue-400'>
                        Trip
                      </div>
                    </CardContent>
                  </Card>

                  <Card className='border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900'>
                    <CardContent className='flex flex-col items-center justify-center p-6 text-center'>
                      <MessageSquare className='mb-2 h-8 w-8 text-green-600 dark:text-green-400' />
                      <div className='text-3xl font-bold text-green-700 dark:text-green-300'>
                        {user.item?.statistics?.reviews_count || 0}
                      </div>
                      <div className='text-sm font-medium text-green-600 dark:text-green-400'>
                        Evaluate
                      </div>
                    </CardContent>
                  </Card>

                  <Card className='border-0 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900'>
                    <CardContent className='flex flex-col items-center justify-center p-6 text-center'>
                      <Heart className='mb-2 h-8 w-8 text-pink-600 dark:text-pink-400' />
                      <div className='text-3xl font-bold text-pink-700 dark:text-pink-300'>
                        {user.item?.statistics?.favorites_count || 0}
                      </div>
                      <div className='text-sm font-medium text-pink-600 dark:text-pink-400'>
                        Favorite
                      </div>
                    </CardContent>
                  </Card>

                  <Card className='border-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900'>
                    <CardContent className='flex flex-col items-center justify-center p-6 text-center'>
                      <Star className='mb-2 h-8 w-8 text-amber-600 dark:text-amber-400' />
                      <div className='text-3xl font-bold text-amber-700 dark:text-amber-300'>
                        {user.item?.statistics?.average_rating_given.toFixed(
                          1,
                        ) || 0}
                      </div>
                      <div className='text-sm font-medium text-amber-600 dark:text-amber-400'>
                        Average
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
