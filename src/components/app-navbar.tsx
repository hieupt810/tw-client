'use client';

import { Bot } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import { Constant } from '@/constants';
import { removeTokenPair } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth';

import AppLogo from './app-logo';
import ImageWithFallback from './image-with-fallback';
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
    removeTokenPair();
    window.location.href = '/';
  }

  useEffect(() => {
    meAction();
  }, [meAction]);

  return (
    <header className='bg-background border-grid sticky top-0 right-0 left-0 z-[999] flex h-14 w-full border-b'>
      <div className='mx-auto flex w-full max-w-7xl justify-between px-6'>
        <div className='flex items-center gap-2 md:gap-4 lg:gap-6'>
          <Link href='/' passHref>
            <AppLogo />
          </Link>
          <div className='text-muted-foreground hidden items-center gap-1 md:flex'>
            {Constant.NAVIGATION_MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='hover:text-primary p-2'
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
                    className='border-primary size-9 overflow-hidden rounded-full border select-none'
                    aria-label='User Avatar'
                  >
                    <ImageWithFallback
                      width={5000}
                      height={5000}
                      src={me.avatar || '/fallback-avatar.jpg'}
                      alt={me.fullName}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='z-[1000] w-52'>
                  <DropdownMenuLabel>Hi, {me.fullName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href='/favorites' passHref>
                      <DropdownMenuItem>Favorites</DropdownMenuItem>
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
                <Button variant='outline'>Sign in</Button>
              </Link>
              <Link href='/sign-up' passHref>
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
