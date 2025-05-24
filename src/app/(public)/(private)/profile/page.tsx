'use client';

import { Plane, UserRound } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { cn } from '@/lib/utils';

import AccountComponent from './components/account';
import TripsComponent from './components/trips';

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const ContentComponent = useCallback(() => {
    switch (tab) {
      case 'trips':
        return <TripsComponent />;
      default:
        return <AccountComponent />;
    }
  }, [tab]);

  return (
    <div className='grid min-h-[calc(100dvh-6.5rem)] grid-cols-5'>
      <div className='border-grid flex flex-col gap-1 rounded-l-md border-r py-5'>
        <button
          onClick={() => {
            router.push(`/profile`);
            router.refresh();
          }}
          className={cn(
            'hover:bg-primary/10 flex cursor-pointer flex-row gap-2 overflow-hidden rounded-l-md p-4',
            tab !== 'trips' && 'bg-muted',
          )}
        >
          <div>
            <UserRound className='stroke-primary' />
          </div>
          <span className='text-primary font-medium'>Account</span>
        </button>

        <button
          onClick={() => {
            router.push(`/profile?tab=trips`);
            router.refresh();
          }}
          className={cn(
            'hover:bg-primary/10 flex cursor-pointer flex-row gap-2 overflow-hidden rounded-l-md p-4',
            tab === 'trips' && 'bg-muted',
          )}
        >
          <div>
            <Plane className='stroke-primary' />
          </div>
          <span className='text-primary font-medium'>Trips</span>
        </button>
      </div>
      <div className='col-span-4 flex flex-col p-5 pr-0'>
        <ContentComponent />
      </div>
    </div>
  );
}
