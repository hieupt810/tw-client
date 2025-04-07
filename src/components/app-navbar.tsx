import Link from 'next/link';

import { NAVIGATION_MENU_ITEMS } from '@/constants';

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
  return (
    <header className='absolute top-0 z-40 w-full bg-white shadow-md'>
      <MaxWidthContainer className='flex flex-row items-center justify-between space-x-4 py-3'>
        <AppLogo />
        <NavigationMenu>
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
        <div className='flex flex-row items-center gap-2'>
          <Link href='/sign-in' passHref>
            <Button variant='outline'>Sign in</Button>
          </Link>
          <Link href='/sign-up' passHref>
            <Button>Sign up</Button>
          </Link>
        </div>
      </MaxWidthContainer>
    </header>
  );
}
