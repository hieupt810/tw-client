'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useStore } from 'zustand';

import CardItem from '@/components/card-item';
import HeroSection from '@/components/hero-section';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { useHotelStore } from '@/stores/hotel-store';

const HERO_TITLE = 'Stay at top hotels';
const HERO_DESCRIPTION =
  'Discover the perfect place to stay for your next unforgettable trip, whether you are traveling for leisure or business.';
// interface FilterState {
//   priceRange: number[];
//   starRating: string[];
//   amenities: string[];
//   location: string[];
//   sortBy: string;
//   minRating: number;
// }

export default function HotelsPage() {
  // const [filters, setFilters] = useState<FilterState>({
  //   priceRange: [50, 500],
  //   starRating: [],
  //   minRating: 0,
  //   amenities: [],
  //   location: [],
  //   sortBy: 'recommended',
  // });

  // const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // const updateFilter = (key: keyof FilterState, value: any) => {
  //   setFilters((prev) => ({ ...prev, [key]: value }));
  //   // Update active filters count
  //   const newFilters = { ...filters, [key]: value };
  //   const count =
  //     (newFilters.starRating.length > 0 ? 1 : 0) +
  //     (newFilters.amenities.length > 0 ? 1 : 0) +
  //     (newFilters.location.length > 0 ? 1 : 0) +
  //     (newFilters.minRating > 0 ? 1 : 0) + // Thêm dòng này
  //     (newFilters.priceRange[0] !== 50 || newFilters.priceRange[1] !== 500
  //       ? 1
  //       : 0);
  //   setActiveFiltersCount(count);
  // };

  // const clearAllFilters = () => {
  //   setFilters({
  //     priceRange: [50, 500],
  //     starRating: [],
  //     minRating: 0,
  //     amenities: [],
  //     location: [],
  //     sortBy: 'recommended',
  //   });
  //   setActiveFiltersCount(0);
  // };
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '8');

  const { hotels, reset, fetchHotels } = useStore(
    useHotelStore,
    (state) => state,
  );

  const handleNextPage = useCallback(() => {
    const nextPage = page + 1;
    router.push(`/hotel?page=${nextPage}&size=${size}`);
  }, [page, router, size]);

  const handlePreviousPage = useCallback(() => {
    const previousPage = page - 1;
    router.push(`/hotel?page=${previousPage}&size=${size}`);
  }, [page, router, size]);

  useEffect(() => {
    fetchHotels(page, size);
    return () => {
      reset();
    };
  }, [fetchHotels, page, size, reset]);

  if (hotels.items.length === 0) return <Loading />;
  return (
    <>
      <HeroSection
        title={HERO_TITLE}
        image='/hotel-1.jpeg'
        description={HERO_DESCRIPTION}
      />
      {/* <div className='sticky top-0 z-40 border-b border-gray-200 bg-white'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between py-4'>
            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-2'>
                <Filter className='h-4 w-4 text-gray-500' />
                <span className='text-sm font-medium text-gray-700'>
                  Filters
                </span>
                {activeFiltersCount > 0 && (
                  <Badge className='bg-purple-100 text-purple-700'>
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='h-9'>
                    Price
                    <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-80 p-4'>
                  <DropdownMenuLabel>Price per night (USD)</DropdownMenuLabel>
                  <div className='space-y-4'>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) =>
                        updateFilter('priceRange', value)
                      }
                      max={1000}
                      min={0}
                      step={10}
                      className='w-full'
                    />
                    <div className='flex justify-between text-sm text-gray-600'>
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}+</span>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='h-9'>
                    <Star className='mr-2 h-4 w-4' />
                    Rating {filters.minRating > 0 && `${filters.minRating}+`}
                    <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-80 p-4'>
                  <DropdownMenuLabel>Minimum Rating</DropdownMenuLabel>
                  <div className='space-y-4'>
                    <Slider
                      value={[filters.minRating]}
                      onValueChange={(value) =>
                        updateFilter('minRating', value[0])
                      }
                      max={5}
                      min={0}
                      step={0.1}
                      className='w-full'
                    />
                    <div className='flex justify-between text-sm text-gray-600'>
                      <span>Any rating</span>
                      <span>{filters.minRating.toFixed(1)}+ stars</span>
                    </div>
                    <div className='grid grid-cols-2 gap-2 pt-2'>
                      {[
                        { value: 4.5, label: '4.5+ Excellent' },
                        { value: 4.0, label: '4.0+ Very Good' },
                        { value: 3.5, label: '3.5+ Good' },
                        { value: 3.0, label: '3.0+ Average' },
                      ].map((preset) => (
                        <Button
                          key={preset.value}
                          variant={
                            filters.minRating === preset.value
                              ? 'default'
                              : 'outline'
                          }
                          size='sm'
                          onClick={() =>
                            updateFilter('minRating', preset.value)
                          }
                          className='text-xs'
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='h-9'>
                    <Star className='mr-2 h-4 w-4' />
                    Rating
                    <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Star Rating</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <DropdownMenuCheckboxItem
                      key={rating}
                      checked={filters.starRating.includes(rating.toString())}
                      onCheckedChange={(checked) => {
                        const newRatings = checked
                          ? [...filters.starRating, rating.toString()]
                          : filters.starRating.filter(
                              (r) => r !== rating.toString(),
                            );
                        updateFilter('starRating', newRatings);
                      }}
                    >
                      <div className='flex items-center'>
                        {Array.from({ length: rating }).map((_, i) => (
                          <Star
                            key={i}
                            className='h-3 w-3 fill-yellow-400 text-yellow-400'
                          />
                        ))}
                        <span className='ml-2'>
                          {rating} star{rating > 1 ? 's' : ''}
                        </span>
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {activeFiltersCount > 0 && (
                <Button
                  variant='ghost'
                  onClick={clearAllFilters}
                  className='h-9 text-purple-600 hover:text-purple-700'
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>
          {activeFiltersCount > 0 && (
            <div className='pb-4'>
              <div className='flex flex-wrap gap-2'>
                {filters.starRating.length > 0 && (
                  <Badge className='bg-purple-100 text-purple-700'>
                    {filters.starRating.length} star rating
                    {filters.starRating.length > 1 ? 's' : ''}
                  </Badge>
                )}
                {(filters.priceRange[0] !== 50 ||
                  filters.priceRange[1] !== 500) && (
                  <Badge className='bg-purple-100 text-purple-700'>
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </Badge>
                )}
                {filters.minRating > 0 && (
                  <Badge
                    variant='secondary'
                    className='bg-purple-100 text-purple-700'
                  >
                    {filters.minRating.toFixed(1)}+ stars
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </div> */}
      <div className='my-10 grid grid-cols-2 gap-6 md:grid-cols-4'>
        {hotels.items.map((hotel) => (
          <CardItem key={hotel.element_id} item={hotel} />
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
          <span className='text-center text-sm font-medium'>{`Page ${page} of ${hotels.paging.pageCount}`}</span>
          <Button
            variant='outline'
            onClick={handleNextPage}
            disabled={page >= hotels.paging.pageCount}
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
