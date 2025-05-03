'use client';

import { Bot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { NAVIGATION_MENU_ITEMS } from '@/constants';
import { useAuthStore } from '@/stores/auth-store';

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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { Skeleton } from './ui/skeleton';

export default function AppNavbar() {
  const router = useRouter();
  const { isLoading, user, me, logOut } = useAuthStore();

  function handleLogOut(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    logOut();
    router.push('/');
    toast.success('Logged out successfully.');
  }

  useEffect(() => {
    if (!user) {
      me();
    }
  }, [user, me]);

  return (
    <header className='sticky top-0 z-40 w-full bg-white shadow-md'>
      <MaxWidthContainer className='grid grid-cols-5 p-2.5'>
        <Link href='/' passHref>
          <AppLogo />
        </Link>
        <NavigationMenu className='mx-auto hidden md:col-span-3 md:block'>
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
        <div className='hidden flex-row items-center justify-end gap-3 md:flex'>
          {isLoading ? (
            <Skeleton className='h-9 w-[11rem]' />
          ) : user ? (
            <>
              <Link href='/chat' aria-label='Chatbot' passHref>
                <Button
                  variant='ghost'
                  size='icon'
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
                      src={user && user.avatar}
                      alt={`${user.name} avatar`}
                      width={1000}
                      height={1000}
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
                      onClick={handleLogOut}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
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
