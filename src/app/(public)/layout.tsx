import React, { Suspense } from 'react';

import AppFooter from '@/components/app-footer';
import AppNavbar from '@/components/app-navbar';
import Loading from '@/components/loading';

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <AppNavbar />
      <div className='bg-background container mx-auto flex h-full max-w-7xl grow flex-col overflow-hidden px-5'>
        {children}
      </div>
      <AppFooter />
    </Suspense>
  );
}
