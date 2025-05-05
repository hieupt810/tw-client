'use client';

import { Bot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import { NAVIGATION_MENU_ITEMS } from '@/constants';
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
  const me = useStore(useAuthStore, (state) => state.me);
  const isLoadingMe = useStore(useAuthStore, (state) => state.isLoadingMe);
  const getMe = useStore(useAuthStore, (state) => state.getMe);
  const setLogOutState = useStore(
    useAuthStore,
    (state) => state.setLogOutState,
  );

  function logOut() {
    setLogOutState();
    window.location.href = '/';
  }

  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <header className='bg-background/95 border-grid supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 flex h-14 w-full border-b backdrop-blur-sm'>
      <MaxWidthContainer className='flex items-center justify-between gap-8'>
        <div className='flex items-center gap-4 lg:gap-6'>
          <Link href='/' passHref>
            <AppLogo />
          </Link>
          <div className='hidden items-center gap-4 text-sm md:flex xl:gap-6'>
            {NAVIGATION_MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='hover:text-foreground/50 text-foreground/80 transition-colors'
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className='hidden flex-row items-center justify-end gap-2 md:flex'>
          {isLoadingMe && <Skeleton className='h-9 w-[9.5rem]' />}
          {!isLoadingMe && me && (
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
                      width={1000}
                      height={1000}
                      alt={me.name}
                      src={me.avatar}
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
          {!isLoadingMe && !me && (
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
