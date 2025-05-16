import {
  Camera,
  Hotel,
  House,
  Search as SearchIcon,
  UtensilsCrossed,
} from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

interface ISearchItem {
  icon: React.ReactNode;
  type: string;
  title: string;
  placeholder: string;
}

const searchItems: ISearchItem[] = [
  {
    icon: <House />,
    type: 'Search All',
    title: 'Where to?',
    placeholder: 'Enter a destination',
  },
  {
    icon: <Hotel />,
    type: 'Hotels',
    title: 'Stay somewhere great',
    placeholder: 'Hotel name or destination',
  },
  {
    icon: <Camera />,
    type: 'Things to Do',
    title: 'Do something fun',
    placeholder: 'Attraction, activity or destination',
  },
  {
    icon: <UtensilsCrossed />,
    type: 'Restaurants',
    title: 'Find places to eat',
    placeholder: 'Restaurant or destination',
  },
];

export default function Search() {
  const [input, setInput] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<ISearchItem>(searchItems[0]);

  return (
    <div className='mt-6 mb-12 flex flex-col items-center justify-center'>
      <span className='text-xl font-black tracking-tight sm:text-2xl md:text-3xl lg:text-5xl'>
        {selectedItem.title}
      </span>
      <div className='mt-8 mb-4 flex flex-row gap-6'>
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
            <span className='font-medium'>{item.type}</span>
          </button>
        ))}
      </div>
      <div className='flex w-full max-w-3xl flex-row items-center justify-center gap-2.5 rounded-lg border px-2.5 py-1.5 shadow-md'>
        <div>
          <SearchIcon />
        </div>
        <input
          value={input}
          className='grow outline-none'
          placeholder={selectedItem.placeholder}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='bg-primary text-background rounded-lg px-2.5 py-1.5 text-sm font-medium tracking-tight'>
          Search
        </button>
      </div>
    </div>
  );
}
