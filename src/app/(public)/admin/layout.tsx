import type React from 'react';

import { AdminSidebar } from '@/components/admin-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className='flex-1'>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <div className='flex items-center gap-2'>
            <h1 className='text-lg font-semibold'>Admin Dashboard</h1>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>{children}</div>
      </main>
    </SidebarProvider>
  );
}
