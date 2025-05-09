import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { APP_DESCRIPTION, APP_NAME } from '@/constants';
import { cn } from '@/lib/utils';

import './globals.css';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter-sans',
});

const fontMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={cn(
          fontSans.variable,
          fontMono.variable,
          'min-h-svh font-sans antialiased',
        )}
        suppressHydrationWarning
      >
        <main className='bg-background relative flex min-h-svh flex-col'>
          <div className='border-grid flex grow flex-col'>{children}</div>
        </main>
        <Toaster
          richColors
          closeButton
          position='bottom-right'
          duration={2000}
        />
      </body>
    </html>
  );
}
