import React from 'react';

import AppFooter from '@/components/app-footer';
import AppNavbar from '@/components/app-navbar';

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <React.Fragment>
    <AppNavbar />
    <div className='flex grow flex-col'>{children}</div>
    <AppFooter />
  </React.Fragment>
);

export default PublicLayout;
