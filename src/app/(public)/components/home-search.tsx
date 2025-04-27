'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import MaxWidthContainer from '@/components/max-width-container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HomeSearch() {
  const [value, setValue] = useState<string>('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className='relative'>
      <div className='relative h-[35rem] w-full'>
        <Image
          fill
          priority
          quality={100}
          loading='eager'
          src='/home.jpg'
          alt='Vietnam Golden Bridge'
          className='z-0 h-full w-full object-cover object-center'
        />
      </div>
      <div className='absolute top-0 left-0 z-10 h-[35rem] w-full bg-black/50' />
      <MaxWidthContainer className='absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 md:gap-6'>
        <h1 className='text-center text-3xl font-bold tracking-tight text-white md:text-4xl'>
          Explore Your Journey Awaits
        </h1>
        <div className='flex w-full max-w-3xl flex-row items-center gap-2'>
          <Input
            type='text'
            name='search'
            placeholder='Places to go, things to do, hotels to stay...'
            className='bg-white'
            value={value}
            onChange={handleChange}
          />
          <Button size='lg' aria-label='Search'>
            <Search />
          </Button>
        </div>
      </MaxWidthContainer>
    </div>
  );
}
