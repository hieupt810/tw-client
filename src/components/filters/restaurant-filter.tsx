import {
  ChevronDown,
  Cookie,
  Filter,
  OctagonMinus,
  Sandwich,
  Star,
  Utensils,
  Wifi,
} from 'lucide-react';
import { memo, useEffect, useState } from 'react';

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
import { useRestaurantStore } from '@/stores/restaurant-store';
import { IPagingMeta } from '@/types/IPaging';
import { IRestaurantFilter } from '@/types/IRestaurant';

type Props = {
  filters: IRestaurantFilter;
  onUpdateFilters: (
    filters: IRestaurantFilter & Pick<IPagingMeta, 'page' | 'size'>,
  ) => void;
};

export const RestaurantFilter = memo(({ filters, onUpdateFilters }: Props) => {
  const { cuisines, dietaryRestrictions, dishes, features, mealTypes } =
    useRestaurantStore((state) => state.restaurants);

  const [localFilters, setLocalFilters] = useState<IRestaurantFilter>(filters);

  const [activeFiltersCountLocal, setActiveFiltersCountLocal] = useState(0);

  useEffect(() => {
    let count = 0;
    if (localFilters.cuisines.length > 0) count++;
    if (localFilters.dishes.length > 0) count++;
    if (localFilters.mealTypes.length > 0) count++;
    if (localFilters.dietaryRestrictions.length > 0) count++;
    if (localFilters.features.length > 0) count++;
    if (localFilters.rating) count++;
    if (localFilters.search) count++;

    setActiveFiltersCountLocal(count);
  }, [localFilters]);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof IRestaurantFilter, value: string) => {
    setLocalFilters((prev) => {
      let updatedValue;
      if (key !== 'rating' && key !== 'search') {
        updatedValue = prev[key]?.includes(value)
          ? (prev[key] as string[]).filter((v) => v !== value)
          : [...(prev[key] as string[]), value];
      } else {
        updatedValue = value;
      }
      const newState = {
        ...prev,
        [key]: updatedValue,
      };

      return newState;
    });
  };

  const resetFilters = () => {
    onUpdateFilters({
      mealTypes: [],
      cuisines: [],
      dishes: [],
      dietaryRestrictions: [],
      features: [],
      page: 1,
      size: 8,
    });
  };
  const applyFilters = () => {
    onUpdateFilters({ ...localFilters, page: 1, size: 8 });
  };
  return (
    <div className='sticky top-0 z-40 border-b border-gray-200 bg-white'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex items-start justify-between py-4'>
          <div className='flex items-start space-x-2'>
            <div className='mt-2 flex items-center space-x-2'>
              <Filter className='h-4 w-4 text-gray-500' />
              <span className='text-sm font-medium text-gray-700'>Filters</span>
              {activeFiltersCountLocal > 0 && (
                <Badge className='bg-purple-100 text-purple-700'>
                  {activeFiltersCountLocal}
                </Badge>
              )}
            </div>

            <div className='flex flex-wrap items-center justify-start gap-2'>
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
                      value={[Number(localFilters.rating) || 0]}
                      onValueChange={(value) =>
                        handleFilterChange('rating', value[0].toString())
                      }
                      max={5}
                      min={0}
                      step={0.1}
                      className='w-full'
                    />
                    <div className='flex justify-between text-sm text-gray-600'>
                      <span>Any rating</span>
                      <span>
                        {Number(localFilters.rating)?.toFixed(1) || 0}+ stars
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
                            Number(localFilters.rating) === preset.value
                              ? 'default'
                              : 'outline'
                          }
                          size='sm'
                          onClick={() =>
                            handleFilterChange(
                              'rating',
                              preset.value.toString(),
                            )
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
                    <Cookie className='mr-2 h-4 w-4' />
                    Cuisines
                    <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Cuisines</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {cuisines?.map((cuisine, idx) => (
                    <DropdownMenuCheckboxItem
                      key={idx}
                      onClick={() => handleFilterChange('cuisines', cuisine)}
                      checked={
                        localFilters.cuisines?.includes(cuisine) || false
                      }
                    >
                      <span className='ml-2'>{cuisine}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='h-9'>
                    <Utensils className='mr-2 h-4 w-4' />
                    Meal types
                    <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Meal types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {mealTypes?.map((mealType, idx) => (
                    <DropdownMenuCheckboxItem
                      key={idx}
                      onClick={() => handleFilterChange('mealTypes', mealType)}
                      checked={
                        localFilters.mealTypes?.includes(mealType) || false
                      }
                    >
                      <span className='ml-2'>{mealType}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='h-9'>
                    <Sandwich className='mr-2 h-4 w-4' />
                    Dishes
                    <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Dishes</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {dishes?.map((dish, idx) => (
                    <DropdownMenuCheckboxItem
                      key={idx}
                      onClick={() => handleFilterChange('dishes', dish)}
                      checked={localFilters.dishes?.includes(dish) || false}
                    >
                      <span className='ml-2'>{dish}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='h-9'>
                    <Wifi className='mr-2 h-4 w-4' />
                    Amenities
                    <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Amenities</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {features?.map((feature, idx) => (
                    <DropdownMenuCheckboxItem
                      key={idx}
                      onClick={() => handleFilterChange('features', feature)}
                      checked={
                        localFilters.features?.includes(feature) || false
                      }
                    >
                      <span className='ml-2'>{feature}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='h-9'>
                    <OctagonMinus className='mr-2 h-4 w-4' />
                    Dietary restrictions
                    <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Dietary restrictions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {dietaryRestrictions?.map((dietaryRestriction, idx) => (
                    <DropdownMenuCheckboxItem
                      key={idx}
                      onClick={() =>
                        handleFilterChange(
                          'dietaryRestrictions',
                          dietaryRestriction,
                        )
                      }
                      checked={
                        localFilters.dietaryRestrictions?.includes(
                          dietaryRestriction,
                        ) || false
                      }
                    >
                      <span className='ml-2'>{dietaryRestriction}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

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
              {localFilters.cuisines?.length > 0 &&
                localFilters.cuisines.map((cuisine, idx) => (
                  <Badge key={idx} className='bg-purple-100 text-purple-700'>
                    {cuisine}
                  </Badge>
                ))}
              {localFilters.dishes?.length > 0 &&
                localFilters.dishes.map((dish, idx) => (
                  <Badge key={idx} className='bg-purple-100 text-purple-700'>
                    {dish}
                  </Badge>
                ))}
              {localFilters.mealTypes?.length > 0 &&
                localFilters.mealTypes.map((mealType, idx) => (
                  <Badge key={idx} className='bg-purple-100 text-purple-700'>
                    {mealType}
                  </Badge>
                ))}
              {localFilters.dietaryRestrictions?.length > 0 &&
                localFilters.dietaryRestrictions.map(
                  (dietaryRestriction, idx) => (
                    <Badge key={idx} className='bg-purple-100 text-purple-700'>
                      {dietaryRestriction}
                    </Badge>
                  ),
                )}
              {localFilters.features?.length > 0 &&
                localFilters.features.map((feature, idx) => (
                  <Badge key={idx} className='bg-purple-100 text-purple-700'>
                    {feature}
                  </Badge>
                ))}
              {localFilters.rating && Number(localFilters.rating) > 0 && (
                <Badge
                  variant='secondary'
                  className='bg-purple-100 text-purple-700'
                >
                  {Number(localFilters.rating).toFixed(1)}+ stars
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

RestaurantFilter.displayName = 'RestaurantFilter';
