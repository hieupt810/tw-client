'use client';

import {
  Building2,
  LayoutDashboard,
  MapPin,
  Users,
  Utensils,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const adminMenuItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'User Management',
    url: '/admin/user',
    icon: Users,
  },
  {
    title: 'Hotel Management',
    url: '/admin/hotel',
    icon: Building2,
  },
  {
    title: 'Restaurant Management',
    url: '/admin/restaurant',
    icon: Utensils,
  },
  {
    title: 'Attraction Management',
    url: '/admin/thing-to-do',
    icon: MapPin,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className='flex items-center gap-2 px-4 py-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white'>
            <Building2 className='h-4 w-4' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>Admin Panel</span>
            <span className='text-muted-foreground truncate text-xs'>
              Hotel Management System
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-y-3'>
              {adminMenuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        'h-14 gap-4 gap-y-3 transition-all duration-200 hover:scale-105 hover:bg-purple-100 hover:text-purple-700',
                        'h-14 gap-y-3 dark:hover:bg-purple-900/20 dark:hover:text-purple-300',
                        isActive &&
                          'h-14 scale-105 gap-y-3.5 bg-purple-600 font-semibold text-white shadow-md hover:bg-purple-700 hover:text-white',
                      )}
                    >
                      <Link href={item.url} className='flex items-center gap-2'>
                        <item.icon
                          className={cn('h-4 w-4', isActive && 'text-white')}
                        />
                        <span className={cn(isActive && 'font-semibold')}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
