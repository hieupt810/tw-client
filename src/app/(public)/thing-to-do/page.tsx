'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import CardItem from '@/components/card-item';
import HeroSection from '@/components/hero-section';
import Loading from '@/components/loading';
import { useThingToDoStore } from '@/stores/thing-to-do-store';

export default function ThingsToDoPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '10');

  const { thingsToDo, reset, fetchThingsToDo } = useStore(
    useThingToDoStore,
    (state) => state,
  );

  useEffect(() => {
    fetchThingsToDo(page, size);
    return () => {
      reset();
    };
  }, [page, size, fetchThingsToDo, reset]);

  if (thingsToDo.items.length === 0) return <Loading />;
  return (
    <>
      <HeroSection
        image='/thing-to-do-1.jpeg'
        title='Plan, go - we make it easy'
        description='Discover family activities, adventures, tours, museums, and top attractions to plan your next trip.'
      />
      <div className='my-10 grid grid-cols-5 gap-6'>
        {thingsToDo.items.map((thing) => (
          <CardItem key={thing.elementId} item={thing} />
        ))}
      </div>
      <HeroSection
        title='Backed by travelers'
        image='/thing-to-do-2.jpeg'
        description="See what people loved (or didn't love) with real reviews on almost everything."
      />
    </>
  );
}
