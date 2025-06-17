import { ChevronDown, Filter, Layers2, Star, Tag } from 'lucide-react';
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
import { useThingToDoStore } from '@/stores/thing-to-do-store';
import { IPagingMeta } from '@/types/IPaging';
import { IThingToDoFilter } from '@/types/IThingToDo';

import { Slider } from '../ui/slider';

type Props = {
  filters: IThingToDoFilter;
  onUpdateFilters: (
    filters: IThingToDoFilter & Pick<IPagingMeta, 'page' | 'size'>,
  ) => void;
};

export const ThingToDoFilter = memo(({ filters, onUpdateFilters }: Props) => {
  const { subcategories, subtypes } = useThingToDoStore(
    (state) => state.thingsToDo,
  );

  const [localFilters, setLocalFilters] = useState<IThingToDoFilter>(filters);

  const [activeFiltersCountLocal, setActiveFiltersCountLocal] = useState(0);

  useEffect(() => {
    let count = 0;
    if (localFilters.rating) count++;
    if (localFilters.subcategories.length > 0) count++;
    if (localFilters.subtypes.length > 0) count++;
    if (localFilters.search) count++;

    setActiveFiltersCountLocal(count);
  }, [localFilters]);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof IThingToDoFilter, value: string) => {
    setLocalFilters((prev) => {
      let updatedValue;
      if (key !== 'search' && key !== 'rating') {
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
      subcategories: [],
      subtypes: [],
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
                    <Tag className='mr-2 h-4 w-4' />
                    Categories
                    <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Subcategories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {subcategories?.map((subcategory, idx) => (
                    <DropdownMenuCheckboxItem
                      key={idx}
                      onClick={() =>
                        handleFilterChange('subcategories', subcategory)
                      }
                      checked={
                        localFilters.subcategories?.includes(subcategory) ||
                        false
                      }
                    >
                      <span className='ml-2'>{subcategory}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='h-9'>
                    <Layers2 className='mr-2 h-4 w-4' />
                    Types
                    <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Subtypes</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {subtypes?.map((subtype, idx) => (
                    <DropdownMenuCheckboxItem
                      key={idx}
                      onClick={() => handleFilterChange('subtypes', subtype)}
                      checked={
                        localFilters.subtypes?.includes(subtype) || false
                      }
                    >
                      <span className='ml-2'>{subtype}</span>
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
              {localFilters.subcategories?.length > 0 &&
                localFilters.subcategories.map((subcategory, idx) => (
                  <Badge key={idx} className='bg-purple-100 text-purple-700'>
                    {subcategory}
                  </Badge>
                ))}
              {localFilters.subtypes?.length > 0 &&
                localFilters.subtypes.map((subtype, idx) => (
                  <Badge key={idx} className='bg-purple-100 text-purple-700'>
                    {subtype}
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

ThingToDoFilter.displayName = 'ThingToDoFilter';
