import React, { Suspense } from 'react';

import AppFooter from '@/components/app-footer';
import AppNavbar from '@/components/app-navbar';
import Loading from '@/components/loading';
import MaxWidthContainer from '@/components/max-width-container';

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <AppNavbar />
      <MaxWidthContainer className='flex grow flex-col'>
        {children}
      </MaxWidthContainer>
      <AppFooter />
    </Suspense>
  );
}
