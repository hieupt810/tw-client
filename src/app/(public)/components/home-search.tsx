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
      <div className='h-[45rem] w-full'>
        <Image
          fill
          quality={100}
          loading='eager'
          src='/home.jpg'
          alt='Vietnam Golden Bridge'
          className='z-0 h-full w-full object-cover object-center'
        />
      </div>
      <div className='absolute top-0 left-0 z-10 h-[45rem] w-full bg-black/50' />
      <MaxWidthContainer className='absolute inset-0 z-20 flex flex-col items-center justify-center gap-4'>
        <h1 className='scroll-m-20 text-center text-4xl/relaxed font-extrabold text-white lg:text-5xl/relaxed'>
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
          <Button size='lg'>
            <Search />
          </Button>
        </div>
      </MaxWidthContainer>
    </div>
  );
}
