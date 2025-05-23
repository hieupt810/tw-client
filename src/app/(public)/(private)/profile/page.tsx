'use client';

import { Plane, UserRound } from 'lucide-react';

import TripsComponent from './components/trips';

export default function ProfilePage() {
  return (
    <div className='grid min-h-[calc(100dvh-6.5rem)] grid-cols-5'>
      <div className='border-grid flex flex-col rounded-l-md border-r py-5'>
        <div className='flex cursor-pointer flex-row gap-2 overflow-hidden rounded-l-md p-4'>
          <div>
            <UserRound className='stroke-primary' />
          </div>
          <span className='text-primary font-medium'>Account</span>
        </div>

        <div className='flex cursor-pointer flex-row gap-2 overflow-hidden rounded-l-md p-4'>
          <div>
            <Plane className='stroke-primary' />
          </div>
          <span className='text-primary font-medium'>Trips</span>
        </div>
      </div>
      <div className='col-span-4 flex flex-col p-5 pr-0'>
        <TripsComponent />
      </div>
    </div>
  );
}
