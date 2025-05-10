import React from 'react';

import AppFooter from '@/components/app-footer';
import AppNavbar from '@/components/app-navbar';

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <AppNavbar />
      <div className='flex grow flex-col'>{children}</div>
      <AppFooter />
    </>
  );
}
