import {
  Camera,
  Hotel,
  House,
  Search as SearchIcon,
  UtensilsCrossed,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';
import { usePlaceStore } from '@/stores/place-store';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';

interface ISearchItem {
  icon: React.ReactNode;
  type: string;
  title: string;
  placeholder: string;
  description: string;
}

const searchItems: ISearchItem[] = [
  {
    icon: <House size={20} />,
    type: 'all',
    title: 'Where to?',
    placeholder: 'Enter a destination',
    description: 'Search All',
  },
  {
    icon: <Hotel size={20} />,
    type: 'hotel',
    title: 'Stay somewhere great',
    placeholder: 'Hotel name or destination',
    description: 'Hotels',
  },
  {
    icon: <UtensilsCrossed size={20} />,
    type: 'restaurant',
    title: 'Find places to eat',
    placeholder: 'Restaurant or destination',
    description: 'Restaurants',
  },
  {
    icon: <Camera size={20} />,
    type: 'thing-to-do',
    title: 'Do something fun',
    placeholder: 'Attraction, activity or destination',
    description: 'Attractions',
  },
];

export default function Search() {
  const [selectedItem, setSelectedItem] = useState<ISearchItem>(searchItems[0]);
  const [search, setSearch] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const { searchPlaces, items } = useStore(usePlaceStore, (state) => state);
  const debouncedSearchTerm = useDebounce<string>(search, 1000);

  useEffect(() => {
    const getPlaceType = (
      type: string,
    ): 'hotel' | 'restaurant' | 'thingtodo' | undefined => {
      if (type === 'all') return undefined;
      if (type === 'hotel' || type === 'restaurant' || type === 'thingtodo')
        return type;
      return undefined;
    };

    searchPlaces(search, getPlaceType(selectedItem.type), 10);
  }, [debouncedSearchTerm, selectedItem.type]);

  return (
    <div className='mt-16 flex flex-col items-center justify-center md:mt-24 md:mb-12'>
      <span className='text-3xl font-black tracking-tight lg:text-5xl'>
        {selectedItem.title}
      </span>
      <div className='my-4 mt-8 flex items-center justify-between gap-8'>
        {searchItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedItem(item)}
            className={cn(
              'border-foreground flex cursor-pointer flex-row items-center justify-center gap-2 p-2',
              selectedItem.type === item.type && 'border-b-2',
            )}
          >
            <div>{item.icon}</div>
            <span className='text-xs font-medium md:text-sm lg:text-base'>
              {item.description}
            </span>
          </button>
        ))}
      </div>
      <Command className='relative max-w-3xl overflow-visible rounded-md border px-2.5 py-1.5 shadow-md'>
        <div className='itemsthingtodo-center flex w-full gap-2'>
          <SearchIcon />
          <CommandInput
            value={search}
            className='max-h-[24px] grow pl-2 outline-none xl:w-2xl'
            placeholder={selectedItem.placeholder}
            onValueChange={setSearch}
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              setTimeout(() => setIsFocus(false), 200);
            }}
          />
        </div>
        {isFocus && (
          <CommandList className='absolute top-full right-0 left-0 z-[1000] mt-2 max-h-[400px] overflow-y-auto rounded-md border bg-white shadow-lg'>
            {items && items.length > 0 ? (
              <CommandGroup>
                {items.map((place) => (
                  <Link
                    href={`/${place.type}/${place.element_id}`}
                    key={place.element_id}
                  >
                    <CommandItem
                      key={place.element_id}
                      value={place.name}
                      onSelect={() => {
                        console.log('Selected:', place.name);
                        setSearch(place.name);
                        setIsFocus(false);
                      }}
                      className='hover:bg-muted/50 flex cursor-pointer items-center gap-3 px-4 py-3'
                    >
                      <div className='flex flex-row items-center gap-2'>
                        <img
                          src={place.image}
                          alt={place.name}
                          className='h-8 w-8 rounded-md object-cover'
                        />
                        <span className='text-sm font-medium'>
                          {place.name}
                        </span>
                      </div>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ) : (
              <CommandGroup>
                <CommandItem>
                  <span>No results found</span>
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
}
