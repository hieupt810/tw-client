'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStore } from '@/stores/user-store';

export default function ProfileCard() {
  const { error, profile, getProfile } = useUserStore();

  useEffect(() => {
    getProfile();
    console.log('getProfile');
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <CardHeader>
        <CardTitle className='capitalize'>My Profile</CardTitle>
        <CardDescription>
          Manage profile information to secure your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid items-center gap-2.5'>
          <div className='grid w-full grid-cols-4 items-center'>
            <Label htmlFor='email'>Email</Label>
            {profile ? (
              <Input
                id='email'
                type='email'
                className='col-span-3'
                defaultValue={profile.email}
              />
            ) : (
              <Skeleton className='col-span-3 h-9' />
            )}
          </div>
          <div className='grid w-full grid-cols-4 items-center'>
            <Label htmlFor='name'>Name</Label>
            {profile ? (
              <Input
                id='name'
                type='text'
                className='col-span-3'
                defaultValue={profile.name}
              />
            ) : (
              <Skeleton className='col-span-3 h-9' />
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>Footer</CardFooter>
    </>
  );
}
