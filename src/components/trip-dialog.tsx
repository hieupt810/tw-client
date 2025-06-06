'use client';

import { capitalize, lowerCase, upperCase } from 'lodash';
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';
import { usePlaceStore } from '@/stores/place-store';
import { useTripStore } from '@/stores/trip-store';
import { IHotel } from '@/types/IHotel';
import { IRestaurant } from '@/types/IRestaurant';

import { Card, CardContent } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type TripDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (name: string) => void;
  initialName?: string;
  title?: string;
  description?: string;
  submitText?: string;
  isLoading?: boolean;
};

export const TripDialog = ({
  open = false,
  onOpenChange,
  onSubmit,
  initialName = '',
  title = 'Create a New Trip',
  description = 'Enter a name for your trip.',
  submitText = 'Create',
  isLoading = false,
}: TripDialogProps) => {
  const [tripName, setTripName] = useState<string>(initialName);

  const handleSubmit = () => {
    if (!tripName.trim()) return;
    onSubmit?.(tripName.trim());
    setTripName('');
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTripName(initialName);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Trip Name
          </Label>
          <Input
            autoFocus
            id='name'
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            className='col-span-3'
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoading && tripName.trim()) {
                handleSubmit();
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            disabled={isLoading}
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !tripName.trim()}
          >
            {isLoading ? `${submitText}...` : submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteTripDialog = ({
  onDelete,
  onOpenChange,
  open,
  tripName,
  isLoading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tripName: string;
  onDelete: () => void;
  isLoading?: boolean;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete trip</DialogTitle>
          <DialogDescription>Delete your trip permanently.</DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-4 items-center gap-4'></div>
        <DialogFooter>
          <Button
            variant='outline'
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={onDelete} disabled={isLoading || !tripName.trim()}>
            {isLoading ? 'Delete' : 'Deleting'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type SearchAndAddPlaceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tripId: string;
  isLoading?: boolean;
};

export const SearchAndAddPlaceDialog = ({
  onOpenChange,
  open,
  tripId,
}: SearchAndAddPlaceDialogProps) => {
  const { isLoading, items, searchPlaces } = usePlaceStore((state) => state);

  const { addPlaceToTrip } = useTripStore((state) => state);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<
    'all' | 'restaurant' | 'hotel' | 'thingtodo'
  >('all');
  const debouncedSearch = useDebounce(searchQuery.trim(), 500);

  useEffect(() => {
    if (debouncedSearch || debouncedSearch === '') {
      searchPlaces(
        debouncedSearch,
        selectedType === 'all' ? undefined : selectedType,
      );
    }
  }, [debouncedSearch, selectedType, searchPlaces]);

  const handleAddPlaceToTrip = async (placeId: string) => {
    await addPlaceToTrip(tripId, placeId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='min-w-3xl'>
        <DialogHeader>
          <DialogTitle>Add Place to Trip</DialogTitle>
          <DialogDescription>
            Search for a place to add to your trip.
          </DialogDescription>
        </DialogHeader>
        {/* Add search input and results here */}
        <div>
          <div className='flex items-center gap-2'>
            <Input
              placeholder='Search for a place...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              value={selectedType}
              onValueChange={(value) => {
                setSelectedType(
                  value as 'all' | 'restaurant' | 'hotel' | 'thingtodo',
                );
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder='Type' />
              </SelectTrigger>
              <SelectContent className='z-[10000]'>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='restaurant'>Restaurant</SelectItem>
                <SelectItem value='hotel'>Hotel</SelectItem>
                <SelectItem value='thingtodo'>Attraction</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='mt-2 h-[60vh] space-y-2 overflow-y-auto'>
            {isLoading ? (
              <TripDialogSkeleton />
            ) : items && items?.length > 0 ? (
              items.map((item) => (
                <SearchedPlaceItem
                  key={item.element_id}
                  item={item}
                  onAddPlace={handleAddPlaceToTrip}
                />
              ))
            ) : (
              <p className='py-12 text-center text-gray-500 italic'>
                There are no places matched your search.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const TripDialogSkeleton = () => {
  return (
    <div className='space-y-4 p-4'>
      <div className='h-10 w-1/2 animate-pulse rounded bg-gray-200'></div>
      <div className='h-10 w-full animate-pulse rounded bg-gray-200'></div>
      <div className='h-10 w-full animate-pulse rounded bg-gray-200'></div>
      <div className='h-10 w-full animate-pulse rounded bg-gray-200'></div>
    </div>
  );
};

export const SearchedPlaceItem = ({
  item,
  onAddPlace,
}: {
  item: IRestaurant | IHotel;
  onAddPlace: (placeId: string) => Promise<void>;
}) => {
  const { placesInTrip } = useTripStore((state) => state);
  const [isAdded, setIsAdded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const handleAdd = async () => {
    setIsLoading(true);
    await onAddPlace(item.element_id);
    setIsLoading(false);
    toast.success('Place added to trip successfully');
  };

  useEffect(() => {
    const added = placesInTrip.item.some(
      (place) => place.element_id === item.element_id,
    );
    setIsAdded(added);
  }, [placesInTrip.item, item.element_id]);

  return (
    <Card>
      <CardContent className='space-y-2'>
        <div className='flex items-start gap-2'>
          <Image
            loading='lazy'
            src={item.image}
            alt={item.name}
            width={120}
            height={120}
            className='size-28 rounded-sm'
          />
          <div>
            <h3 className='text-lg font-semibold'>
              {item.name}&nbsp;
              <i
                className={cn(
                  'rounded-md px-2 py-0.5 text-xs text-white',
                  upperCase(item.type) === 'HOTEL'
                    ? 'bg-orange-600'
                    : upperCase(item.type) === 'RESTAURANT'
                      ? 'bg-blue-600'
                      : 'bg-amber-600',
                )}
              >
                {capitalize(
                  item.type === 'HOTEL' || item.type === 'RESTAURANT'
                    ? item.type
                    : 'attraction',
                )}
              </i>
            </h3>
            <p className='text-sm text-gray-700 italic'>
              Address: {item.street}
            </p>
            <div className='flex items-center gap-4'>
              <Link
                target='_blank'
                href={`${upperCase(item.type) === 'HOTEL' || upperCase(item.type) === 'RESTAURANT' ? `/${lowerCase(item.type)}` : '/thing-to-do'}/${item.element_id}`}
                className='mt-2 flex items-center gap-1 text-sm text-blue-500 italic hover:text-blue-600 hover:underline'
              >
                Go details <SquareArrowOutUpRight className='size-3' />
              </Link>
              {item?.website && (
                <Link
                  target='_blank'
                  href={item?.website}
                  className='mt-2 flex items-center gap-1 text-sm text-blue-500 italic hover:text-blue-600 hover:underline'
                >
                  Visit website <SquareArrowOutUpRight className='size-3' />
                </Link>
              )}
            </div>
          </div>
        </div>
        <p className='line-clamp-4 text-sm text-gray-500'>{item.description}</p>
        <div className='gap- flex items-end justify-between'>
          <div className='flex items-center gap-1'>
            {item.photos &&
              item.photos.length > 0 &&
              item.photos
                .slice(0, 5)
                .map((photo, index) => (
                  <Image
                    key={index}
                    loading='lazy'
                    src={photo}
                    alt='image'
                    height={80}
                    width={80}
                    className=''
                  />
                ))}
          </div>

          <Button
            onClick={handleAdd}
            className={cn(
              'mt-2',
              isLoading || isAdded ? 'opacity-50' : 'opacity-100',
            )}
            disabled={isLoading || isAdded}
          >
            {isLoading ? 'Adding...' : isAdded ? 'Added' : 'Add to Trip'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
