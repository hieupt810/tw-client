'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

import AppLogo from '@/components/app-logo';
import MaxWidthContainer from '@/components/max-width-container';
import { Button } from '@/components/ui/button';

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.5 }}
        className='absolute top-0 left-0 flex h-full w-full flex-col p-10 md:max-w-1/2'
      >
        <div className='flex flex-row items-center justify-between'>
          <AppLogo />
          <Link href='/' passHref>
            <Button variant='ghost'>
              <ArrowLeft />
              Back to home
            </Button>
          </Link>
        </div>
        <MaxWidthContainer className='flex grow flex-col items-center justify-center'>
          {children}
        </MaxWidthContainer>
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
          loading='eager'
          src='/sign-in.jpg'
          alt='Hoi An Ancient Town'
          className='object-cover object-center'
          sizes='(max-width: 768px) 100vw, (min-width: 768px) 50vw'
        />
      </motion.div>
    </div>
  );
}
