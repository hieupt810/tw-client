'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { NAVIGATION_MENU_ITEMS } from '@/constants';
import { useAuthStore } from '@/stores/auth-store';

import AppLogo from './app-logo';
import MaxWidthContainer from './max-width-container';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

export default function AppNavbar() {
  const { isLoading, isAuthenticated, me } = useAuthStore();

  useEffect(() => {
    me();
  }, [me]);

  return (
    <header className='absolute top-0 z-40 w-full bg-white shadow-md'>
      <MaxWidthContainer className='flex flex-row items-center justify-between space-x-4 py-3'>
        <Link href='/' passHref>
          <AppLogo />
        </Link>
        <NavigationMenu className='hidden md:block'>
          <NavigationMenuList>
            {NAVIGATION_MENU_ITEMS.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className='hidden flex-row items-center gap-2 md:flex'>
          {!isLoading && !isAuthenticated && (
            <>
              <Link href='/sign-in' passHref>
                <Button variant='outline'>Sign in</Button>
              </Link>
              <Link href='/sign-up' passHref>
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </MaxWidthContainer>
    </header>
  );
}
