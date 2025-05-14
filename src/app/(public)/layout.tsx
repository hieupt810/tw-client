import React from 'react';

import AppFooter from '@/components/app-footer';
import AppNavbar from '@/components/app-navbar';
import MaxWidthContainer from '@/components/max-width-container';

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <AppNavbar />
      <MaxWidthContainer className='grow'>{children}</MaxWidthContainer>
      <AppFooter />
    </>
  );
}
