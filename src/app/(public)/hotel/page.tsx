'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useStore } from 'zustand';

import CardItem from '@/components/card-item';
import { HotelFilter } from '@/components/filters/hotel-filter';
import HeroSection from '@/components/hero-section';
import { Button } from '@/components/ui/button';
import { useHotelStore } from '@/stores/hotel-store';
import { IFilterStateHotel } from '@/types/IHotel';

const HERO_TITLE = 'Stay at top hotels';
const HERO_DESCRIPTION =
  'Discover the perfect place to stay for your next unforgettable trip, whether you are traveling for leisure or business.';

export default function HotelsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '8');
  const price = searchParams.get('price');
  const starRating = searchParams.get('starRating');
  const minRating = searchParams.get('minRating');
  const features = searchParams.get('features');

  const { hotels, reset, fetchHotels, fetchFeatureHotels } = useStore(
    useHotelStore,
    (state) => state,
  );

  const [filters, setFilters] = useState<IFilterStateHotel>({
    starRating: starRating || undefined,
    features: features ? features.split(',') : undefined,
    minRating: minRating ? Number(minRating) : undefined,
    price: price ? Number(price) : undefined,
    sortBy: 'recommended',
  });
  const [paging, setPaging] = useState({
    page: page || 1,
    size: size || 8,
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const handleNextPage = useCallback(() => {
    setPaging((prev) => ({
      ...prev,
      page: Math.min(prev.page + 1, hotels.paging.pageCount),
    }));
  }, [hotels.paging.pageCount]);

  const handlePreviousPage = useCallback(() => {
    setPaging((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  }, [hotels.paging.pageCount]);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const updateFilter = (key: keyof IFilterStateHotel, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // Update active filters count
    const newFilters = { ...filters, [key]: value };
    const count =
      (newFilters.starRating ? 1 : 0) +
      (newFilters?.amenities && newFilters.amenities.length > 0 ? 1 : 0) +
      (newFilters?.location && newFilters.location.length > 0 ? 1 : 0) +
      (newFilters.minRating && newFilters.minRating > 0 ? 1 : 0) + // Thêm dòng này
      (newFilters.price ? 1 : 0 ? 1 : 0) +
      (newFilters.features && newFilters.features.length > 0 ? 1 : 0);
    setActiveFiltersCount(count);
    setPaging((prev) => ({
      ...prev,
      page: 1, // Reset to first page when filters change
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      sortBy: 'recommended',
    });
    setActiveFiltersCount(0);
  };

  useEffect(() => {
    router.push(
      `/hotel?page=${paging.page}&size=${paging.size}${
        filters.starRating ? `&starRating=${filters.starRating}` : ''
      }${filters.minRating ? `&minRating=${filters.minRating}` : ''}${
        filters.price ? `&price=${filters.price}` : ''
      }${filters.features ? `&features=${filters.features.join(',')}` : ''}`,
    );
  }, [paging, filters]);

  useEffect(() => {
    fetchHotels(paging.page, paging.size, '', filters);
    return () => {
      reset();
    };
  }, [searchParams]);

  useEffect(() => {
    fetchFeatureHotels();
  }, []);

  return (
    <>
      <HeroSection
        title={HERO_TITLE}
        image='/hotel-1.jpeg'
        description={HERO_DESCRIPTION}
      />
      <HotelFilter
        filters={filters}
        activeFiltersCount={activeFiltersCount}
        updateFilter={updateFilter}
        clearAllFilters={clearAllFilters}
        features={hotels.features || []}
      />
      <div className='my-10 grid grid-cols-2 gap-6 md:grid-cols-4'>
        {hotels.items.map((hotel) => (
          <CardItem key={hotel.element_id} item={hotel} />
        ))}
        {hotels.items.length === 0 && (
          <p className='col-span-2 mt-4 text-center text-lg font-medium md:col-span-4'>
            No hotels found
          </p>
        )}
      </div>
      <div className='flex items-center justify-center pb-10'>
        <div className='grid grid-cols-3 items-center gap-4'>
          <Button
            variant='outline'
            onClick={handlePreviousPage}
            disabled={paging.page <= 1}
          >
            <ArrowLeft />
            <span>Previous</span>
          </Button>
          <span className='text-center text-sm font-medium'>{`Page ${paging.page} of ${hotels.paging.pageCount}`}</span>
          <Button
            variant='outline'
            onClick={handleNextPage}
            disabled={paging.page >= hotels.paging.pageCount}
          >
            <span>Next</span>
            <ArrowRight />
          </Button>
        </div>
      </div>
      <HeroSection
        image='/hotel-2.jpeg'
        title='Backed by travelers'
        description="See what people loved (or didn't love) with real reviews on almost everything."
      />
    </>
  );
}
