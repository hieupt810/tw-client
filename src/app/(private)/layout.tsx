import React from 'react';

import AppFooter from '@/components/app-footer';
import AppNavbar from '@/components/app-navbar';

type Props = {
  children: React.ReactNode;
};

export default function PrivateLayout({ children }: Props) {
  return (
    <>
      <AppNavbar />
      <div className='h-full grow'>{children}</div>
      <AppFooter />
    </>
  );
}
