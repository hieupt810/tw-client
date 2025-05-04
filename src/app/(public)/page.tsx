import { ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';

import MaxWidthContainer from '@/components/max-width-container';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      <section className='border-grid border-b'>
        <MaxWidthContainer className='flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12'>
          <Link
            href='/'
            className='group mb-2 inline-flex items-center justify-center gap-1 px-0.5 text-sm font-medium'
          >
            <Award className='size-4' />
            <span className='underline-offset-4 group-hover:underline'>
              2025&apos;s Travelers&apos; Choice Awards
            </span>
            <ArrowRight className='size-4' />
          </Link>
          <h1 className='text-2xl leading-tight font-bold tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]'>
            Explore Your Journey Awaits
          </h1>
          <p className='text-foreground max-w-2xl text-base font-light sm:text-lg'>
            Tailored to your preferences and designed to make every step of your
            adventure seamless and memorable.
          </p>
          <div className='pt-2'>
            <Button size='sm'>Get Started</Button>
          </div>
        </MaxWidthContainer>
      </section>
    </>
  );
}
