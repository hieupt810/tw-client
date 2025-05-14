'use client';

import { Bot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import { Constant } from '@/constants';
import { useAuthStore } from '@/stores/auth';

import AppLogo from './app-logo';
import MaxWidthContainer from './max-width-container';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export default function AppNavbar() {
  const { me, isLoading, meAction } = useStore(useAuthStore, (state) => state);

  function logOut() {
    // Clear the user data from the store
    localStorage.removeItem(Constant.LOCAL_STORAGE_KEY.ACCESS_TOKEN_KEY);
    localStorage.removeItem(Constant.LOCAL_STORAGE_KEY.REFRESH_TOKEN_KEY);

    // Redirect to the home page
    window.location.href = '/';
  }

  useEffect(() => {
    meAction();
  }, [meAction]);

  return (
    <header className='bg-background border-grid sticky top-0 z-40 flex h-14 w-full border-b'>
      <MaxWidthContainer className='flex items-center justify-between gap-8 py-0'>
        <div className='flex items-center gap-2 md:gap-4 lg:gap-6'>
          <Link href='/' passHref>
            <AppLogo />
          </Link>
          <div className='text-muted-foreground hidden items-center gap-1 md:flex'>
            {Constant.NAVIGATION_MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='hover:text-primary p-1.5'
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className='hidden flex-row items-center justify-end gap-2 md:flex'>
          {isLoading && <Skeleton className='h-9 w-[9.5rem]' />}
          {!isLoading && me && (
            <>
              <Link href='/chat' aria-label='Chatbot' passHref>
                <Button
                  size='icon'
                  variant='ghost'
                  title='Chatbot'
                  aria-label='Chatbot'
                >
                  <Bot />
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className='border-primary size-8 overflow-hidden rounded-full border-2 shadow-md select-none'
                    aria-label='User Avatar'
                  >
                    <Image
                      width={5000}
                      height={5000}
                      src={me.avatar || '/fallback-avatar.jpg'}
                      alt={me.fullName}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-40'>
                  <DropdownMenuLabel>My account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href='/account' passHref>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      variant='destructive'
                      onClick={() => logOut()}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          {!isLoading && !me && (
            <>
              <Link href='/sign-in' passHref>
                <Button size='sm' variant='outline'>
                  Sign in
                </Button>
              </Link>
              <Link href='/sign-up' passHref>
                <Button size='sm'>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </MaxWidthContainer>
    </header>
  );
}
