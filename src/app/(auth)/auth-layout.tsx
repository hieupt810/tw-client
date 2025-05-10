'use client';

import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import AppFooter from '@/components/app-footer';
import AppLogo from '@/components/app-logo';
import MaxWidthContainer from '@/components/max-width-container';
import { Button } from '@/components/ui/button';

type Props = {
  image: string;
  children: React.ReactNode;
};

export default function AuthLayout({ image, children }: Props) {
  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.5 }}
        className='absolute top-0 left-0 flex h-full w-full flex-col md:max-w-1/2'
      >
        <div className='border-grid border-b'>
          <MaxWidthContainer className='flex h-14 items-center justify-between'>
            <AppLogo />
            <Link href='/' passHref>
              <Button variant='ghost'>
                <ArrowLeft />
                Back to home
              </Button>
            </Link>
          </MaxWidthContainer>
        </div>
        <MaxWidthContainer className='border-grid flex w-full grow items-center justify-center overflow-y-auto'>
          {children}
        </MaxWidthContainer>
        <AppFooter />
      </motion.div>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.5 }}
        className='absolute top-0 right-0 hidden h-screen w-full max-w-1/2 md:block'
      >
        <Image
          fill
          priority
          alt='Image'
          src={image}
          loading='eager'
          className='object-cover object-center'
          sizes='(max-width: 768px) 100vw, (min-width: 768px) 50vw'
        />
      </motion.div>
    </div>
  );
}
