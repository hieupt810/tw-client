import { ChevronDown, CircleEllipsis, Filter, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { IFilterStateHotel } from '@/types/IHotel';

type Props = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  updateFilter: (key: keyof IFilterStateHotel, value: any) => void;
  clearAllFilters: () => void;
  filters: IFilterStateHotel;
  activeFiltersCount?: number;
  features: string[];
};

export const HotelFilter = ({
  clearAllFilters,
  filters,
  updateFilter,
  features,
  activeFiltersCount = 0,
}: Props) => {
  const [localFilters, setLocalFilters] = useState<IFilterStateHotel>(filters);
  const [activeFiltersCountLocal, setActiveFiltersCountLocal] =
    useState(activeFiltersCount);

  useEffect(() => {
    setLocalFilters(filters);
    setActiveFiltersCountLocal(activeFiltersCount);
  }, [filters, activeFiltersCount]);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const handleFilterChange = (key: keyof IFilterStateHotel, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
    // Update active filters count
    const newFilters = { ...localFilters, [key]: value };
    const count =
      (newFilters.starRating ? 1 : 0) +
      (newFilters?.amenities && newFilters.amenities.length > 0 ? 1 : 0) +
      (newFilters?.location && newFilters.location.length > 0 ? 1 : 0) +
      (newFilters.minRating && newFilters.minRating > 0 ? 1 : 0) + // Thêm dòng này
      (newFilters.price ? 1 : 0 ? 1 : 0) +
      (newFilters.features && newFilters.features.length > 0 ? 1 : 0);
    setActiveFiltersCountLocal(count);
  };

  const applyFilters = () => {
    updateFilter('price', localFilters.price);
    updateFilter('minRating', localFilters.minRating);
    updateFilter('starRating', localFilters.starRating);
    updateFilter('features', localFilters.features);
  };

  const resetFilters = () => {
    setLocalFilters({ sortBy: 'recommended' });
    setActiveFiltersCountLocal(0);
    clearAllFilters();
  };

  return (
    <div className='sticky top-0 z-40 border-b border-gray-200 bg-white'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between py-4'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <Filter className='h-4 w-4 text-gray-500' />
              <span className='text-sm font-medium text-gray-700'>Filters</span>
              {activeFiltersCountLocal > 0 && (
                <Badge className='bg-purple-100 text-purple-700'>
                  {activeFiltersCountLocal}
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
                    value={[localFilters.price || 0]}
                    onValueChange={(value) =>
                      handleFilterChange('price', value[0])
                    }
                    max={1000}
                    min={0}
                    step={10}
                    className='w-full'
                  />
                  <div className='flex justify-between text-sm text-gray-600'>
                    <span>${localFilters.price}</span>
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
              <DropdownMenuContent className='w-80 p-4'>
                <DropdownMenuLabel>Minimum Rating</DropdownMenuLabel>
                <div className='space-y-4'>
                  <Slider
                    value={[localFilters.minRating || 0]}
                    onValueChange={(value) =>
                      handleFilterChange('minRating', value[0])
                    }
                    max={5}
                    min={0}
                    step={0.1}
                    className='w-full'
                  />
                  <div className='flex justify-between text-sm text-gray-600'>
                    <span>Any rating</span>
                    <span>
                      {localFilters.minRating?.toFixed(1) || 0}+ stars
                    </span>
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
                          localFilters.minRating === preset.value
                            ? 'default'
                            : 'outline'
                        }
                        size='sm'
                        onClick={() =>
                          handleFilterChange('minRating', preset.value)
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
                  Hotel class
                  <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Hotel class</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[5, 4, 3, 2, 1].map((rating) => (
                  <DropdownMenuCheckboxItem
                    key={rating}
                    checked={
                      localFilters.starRating?.includes(rating.toString()) ||
                      false
                    }
                    onCheckedChange={() => {
                      handleFilterChange('starRating', rating.toString());
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='h-9'>
                  <CircleEllipsis className='mr-2 h-4 w-4' />
                  Amenities
                  <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Amenities</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {features.map((feature, idx) => (
                  <DropdownMenuCheckboxItem
                    key={idx}
                    checked={filters.features?.includes(feature) || false}
                    onCheckedChange={() => {
                      handleFilterChange('features', [
                        ...(localFilters.features || []),
                        feature,
                      ]);
                    }}
                  >
                    <span className='ml-2'>{feature}</span>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {activeFiltersCountLocal > 0 && (
              <Button
                variant='ghost'
                onClick={resetFilters}
                className='h-9 text-purple-600 hover:text-purple-700'
              >
                Clear all
              </Button>
            )}
          </div>
          <Button onClick={applyFilters}>Apply</Button>
        </div>
        {activeFiltersCountLocal > 0 && (
          <div className='pb-4'>
            <div className='flex flex-wrap gap-2'>
              {localFilters.starRating &&
                localFilters.starRating.length > 0 && (
                  <Badge className='bg-purple-100 text-purple-700'>
                    {localFilters.starRating}-star Hotel class
                    {Number(localFilters.starRating) > 1 ? 's' : ''}
                  </Badge>
                )}
              {localFilters.price && localFilters.price !== 0 && (
                <Badge className='bg-purple-100 text-purple-700'>
                  ${localFilters.price}
                </Badge>
              )}
              {localFilters.minRating && localFilters.minRating > 0 && (
                <Badge
                  variant='secondary'
                  className='bg-purple-100 text-purple-700'
                >
                  {localFilters.minRating.toFixed(1)}+ stars
                </Badge>
              )}
              {localFilters.features &&
                localFilters.features?.length > 0 &&
                localFilters.features?.map((feature, idx) => (
                  <Badge
                    key={idx}
                    variant='secondary'
                    className='bg-purple-100 text-purple-700'
                  >
                    {feature}
                  </Badge>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
