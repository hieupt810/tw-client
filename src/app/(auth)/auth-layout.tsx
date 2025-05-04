'use client';

import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import AppLogo from '@/components/app-logo';
import MaxWidthContainer from '@/components/max-width-container';
import { Button } from '@/components/ui/button';

type Props = {
  children: React.ReactNode;
  image: string;
};

export default function AuthLayout({ children, image }: Props) {
  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.5 }}
        className='absolute top-0 left-0 flex h-full w-full flex-col px-8 md:max-w-1/2 md:px-10 lg:px-12'
      >
        <div className='border-grid h-14 border-b'>
          <MaxWidthContainer className='flex h-full items-center justify-between'>
            <AppLogo />
            <Link href='/' passHref>
              <Button variant='ghost'>
                <ArrowLeft />
                Back to home
              </Button>
            </Link>
          </MaxWidthContainer>
        </div>
        <MaxWidthContainer className='border-grid h-full w-full overflow-y-auto'>
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
          src={image}
          alt='Image'
          className='object-cover object-center'
          sizes='(max-width: 768px) 100vw, (min-width: 768px) 50vw'
        />
      </motion.div>
    </div>
  );
}
