'use client';

import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

import AppFooter from '@/components/app-footer';
import AppLogo from '@/components/app-logo';
import ImageWithFallback from '@/components/image-with-fallback';
import { Button } from '@/components/ui/button';

type Props = {
  image: string;
  children: React.ReactNode;
};

export default function AuthLayout({ image, children }: Props) {
  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <motion.div
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        initial={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.5 }}
        className='bg-background absolute top-0 left-0 flex h-full w-full flex-col md:max-w-1/2'
      >
        <div className='border-grid flex h-14 items-center justify-between border-b px-5'>
          <AppLogo />
          <Link href='/' passHref>
            <Button variant='ghost'>
              <ArrowLeft />
              Back to home
            </Button>
          </Link>
        </div>
        <div className='border-grid flex w-full grow items-center justify-center overflow-y-auto px-5'>
          {children}
        </div>
        <AppFooter />
      </motion.div>
      <motion.div
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        initial={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.5 }}
        className='absolute top-0 right-0 hidden h-screen w-full max-w-1/2 md:block'
      >
        <ImageWithFallback
          fill
          priority
          alt='Image'
          src={image}
          sizes='50rem'
          loading='eager'
          className='object-cover object-center'
        />
      </motion.div>
    </div>
  );
}
