'use client';

import {
  Calendar,
  Eye,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useUserStore } from '@/stores/user.store';

import Loading from './loading';

export function UserDetailsDialog(props: { id: string }) {
  const [open, setOpen] = useState(false);
  const id = props.id;
  const { user, fetchUser } = useStore(useUserStore, (state) => state);

  // Fetch user data only when the dialog is opened
  useEffect(() => {
    if (open) {
      // console.log('Fetching user details for ID:', id);
      fetchUser(id);
    }
  }, [open, id, fetchUser]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Show loading state when dialog is open and user data is not yet available
  if ((open && !user.item) || user.isLoading) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='flex items-center space-x-1'
          >
            <Eye className='h-3 w-3 md:h-4 md:w-4' />
            <span className='hidden sm:inline'>Detail</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='h-[550px] max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
          <Loading />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='flex items-center space-x-1'
        >
          <Eye className='h-3 w-3 md:h-4 md:w-4' />
          <span className='hidden sm:inline'>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
        <DialogHeader className='pb-6'>
          <DialogTitle className='text-center text-2xl font-bold'>
            User
          </DialogTitle>
        </DialogHeader>
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
            <h3 className='mb-4 flex items-center gap-2 text-lg font-semibold'>
              <User className='h-5 w-5' />
              Detail Of User
            </h3>
            <div className='grid gap-4'>
              <div className='bg-muted/30 flex items-center justify-between rounded-lg p-3'>
                <div className='flex items-center gap-3'>
                  <Mail className='text-muted-foreground h-4 w-4' />
                  <span className='font-medium'>Email</span>
                </div>
                <span className='text-muted-foreground text-sm'>
                  {user.item?.email || 'Unknown'}
                </span>
              </div>
              <div className='bg-muted/30 flex items-center justify-between rounded-lg p-3'>
                <div className='flex items-center gap-3'>
                  <Calendar className='text-muted-foreground h-4 w-4' />
                  <span className='font-medium'>Birth Of Date</span>
                </div>
                <span className='text-muted-foreground text-sm'>
                  {user.item?.birthday
                    ? formatDate(user.item.birthday)
                    : 'Unknown'}
                </span>
              </div>

              <div className='bg-muted/30 flex items-center justify-between rounded-lg p-3'>
                <div className='flex items-center gap-3'>
                  <Phone className='text-muted-foreground h-4 w-4' />
                  <span className='font-medium'>Phone</span>
                </div>
                <span className='text-muted-foreground text-sm'>
                  {user.item?.phone_number || 'Unknown'}
                </span>
              </div>
            </div>
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
                    {user.item?.statistics?.average_rating_given.toFixed(1) ||
                      0}
                  </div>
                  <div className='text-sm font-medium text-amber-600 dark:text-amber-400'>
                    Average
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
