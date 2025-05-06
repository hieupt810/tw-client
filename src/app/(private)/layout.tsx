import React from 'react';

import AppFooter from '@/components/app-footer';
import AppNavbar from '@/components/app-navbar';

const PrivateLayout = ({ children }: { children: React.ReactNode }) => (
  <React.Fragment>
    <AppNavbar />
    <div className='grow'>{children}</div>
    <AppFooter />
  </React.Fragment>
);

export default PrivateLayout;
