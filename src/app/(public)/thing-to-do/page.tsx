'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useStore } from 'zustand';

import CardItem from '@/components/card-item';
import HeroSection from '@/components/hero-section';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { useThingToDoStore } from '@/stores/thing-to-do-store';

export default function ThingsToDoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '8');

  const { thingsToDo, reset, fetchThingsToDo } = useStore(
    useThingToDoStore,
    (state) => state,
  );

  const handleNextPage = useCallback(() => {
    const nextPage = page + 1;
    router.push(`/thing-to-do?page=${nextPage}&size=${size}`);
  }, [page, router, size]);

  const handlePreviousPage = useCallback(() => {
    const previousPage = page - 1;
    router.push(`/thing-to-do?page=${previousPage}&size=${size}`);
  }, [page, router, size]);

  useEffect(() => {
    fetchThingsToDo(page, size);
    return () => {
      reset();
    };
  }, [fetchThingsToDo, page, size, reset]);

  if (thingsToDo.items.length === 0) return <Loading />;
  return (
    <>
      <HeroSection
        image='/thing-to-do-1.jpeg'
        title='Plan, go - we make it easy'
        description='Discover family activities, adventures, tours, museums, and top attractions to plan your next trip.'
      />
      <div className='my-10 grid grid-cols-2 gap-6 md:grid-cols-4'>
        {thingsToDo.items.map((thing) => (
          <CardItem key={thing.elementId} item={thing} />
        ))}
      </div>
      <div className='flex items-center justify-center pb-10'>
        <div className='grid grid-cols-3 items-center gap-4'>
          <Button
            variant='outline'
            onClick={handlePreviousPage}
            disabled={page <= 1}
          >
            <ArrowLeft />
            <span>Previous</span>
          </Button>
          <span className='text-center text-sm font-medium'>{`Page ${page} of ${thingsToDo.paging.pageCount}`}</span>
          <Button
            variant='outline'
            onClick={handleNextPage}
            disabled={page >= thingsToDo.paging.pageCount}
          >
            <span>Next</span>
            <ArrowRight />
          </Button>
        </div>
      </div>
      <HeroSection
        title='Backed by travelers'
        image='/thing-to-do-2.jpeg'
        description="See what people loved (or didn't love) with real reviews on almost everything."
      />
    </>
  );
}
