'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useStore } from 'zustand';

import CardItem from '@/components/card-item';
import { ThingToDoFilter } from '@/components/filters/thingtodo-filter';
import HeroSection from '@/components/hero-section';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { useThingToDoParams } from '@/hooks/use-thingtodo-params';
import { useThingToDoStore } from '@/stores/thing-to-do-store';
import { IPagingMeta } from '@/types/IPaging';
import { IThingToDoFilter } from '@/types/IThingToDo';

const getFilterUrl = (
  page: number,
  size: number,
  filters: IThingToDoFilter,
) => {
  let url = `/thing-to-do?page=${page}&size=${size}`;
  if (filters.search) url += `&search=${encodeURIComponent(filters.search)}`;
  if (filters.subcategories.length > 0) {
    url += `&subcategories=${encodeURIComponent(filters.subcategories.join(','))}`;
  }
  if (filters.subtypes.length > 0) {
    url += `&subtypes=${encodeURIComponent(filters.subtypes.join(','))}`;
  }
  if (filters.rating) url += `&rating=${encodeURIComponent(filters.rating)}`;

  return url;
};

export default function ThingsToDoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { params } = useThingToDoParams(searchParams);
  const { page, size, ...paramsWithoutPage } = params;

  const {
    thingsToDo,
    reset,
    fetchThingsToDo,
    fetchSubcategories,
    fetchSubtypes,
  } = useStore(useThingToDoStore, (state) => state);

  const handleNextPage = useCallback(() => {
    const nextPage = page + 1;
    router.push(getFilterUrl(nextPage, size, paramsWithoutPage));
  }, [page, router, size]);

  const handlePreviousPage = useCallback(() => {
    const previousPage = page - 1;
    router.push(getFilterUrl(previousPage, size, paramsWithoutPage));
  }, [page, router, size]);

  useEffect(() => {
    fetchThingsToDo(page, size, paramsWithoutPage);
    return () => {
      reset();
    };
  }, [fetchThingsToDo, page, size, reset, searchParams]);

  useEffect(() => {
    fetchSubcategories();
    fetchSubtypes();
  }, []);

  const handleUpdateFilters = useCallback(
    (newFilters: IThingToDoFilter & Pick<IPagingMeta, 'page' | 'size'>) => {
      router.push(getFilterUrl(newFilters.page, newFilters.size, newFilters));
    },
    [router],
  );

  if (thingsToDo.isLoading) return <Loading />;
  return (
    <>
      <HeroSection
        image='/thing-to-do-1.jpeg'
        title='Plan, go - we make it easy'
        description='Discover family activities, adventures, tours, museums, and top attractions to plan your next trip.'
      />
      <ThingToDoFilter
        filters={paramsWithoutPage}
        onUpdateFilters={handleUpdateFilters}
      />
      <div className='my-10 grid grid-cols-2 gap-6 md:grid-cols-4'>
        {thingsToDo.items.map((thing) => (
          <CardItem key={thing.element_id} item={thing} />
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
