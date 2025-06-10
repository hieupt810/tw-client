'use client';

import {
  CalendarCheck2,
  CircleAlert,
  Ellipsis,
  Hotel,
  Loader2,
  UtensilsCrossed,
} from 'lucide-react';
import * as moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import SectionTitle from '@/components/section-title';
import { DeleteTripDialog, TripDialog } from '@/components/trip-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn, formatDate } from '@/lib/utils';
import { useTripStore } from '@/stores/trip-store';
import { ITrip } from '@/types/ITrip';

export default function TripsComponent() {
  const { trips, reset, fetchTrips, createTrip } = useStore(
    useTripStore,
    (state) => state,
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [dividedTrips, setDividedTrips] = useState<{
    upComing: ITrip[];
    done: ITrip[];
  }>({
    upComing: [],
    done: [],
  });

  useEffect(() => {
    fetchTrips();
    return () => {
      reset();
    };
  }, [fetchTrips, reset]);

  useEffect(() => {
    if (trips.item && trips.item.length > 0) {
      const upComing: ITrip[] = [];
      const done: ITrip[] = [];
      // Divide trips into upcoming and done based on status
      trips.item.forEach((trip) => {
        if (trip.status) {
          done.push(trip);
        } else {
          upComing.push(trip);
        }
      });
      setDividedTrips({ upComing, done });
    }
  }, [trips]);

  const handleCreateTrip = async () => {
    setDialogOpen(true);
  };

  const handleDialogCreate = async (tripName: string) => {
    if (!tripName.trim()) return;
    setCreating(true);

    await createTrip(tripName.trim());

    setCreating(false);
    setDialogOpen(false);
  };

  if (trips.isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Loader2 className='stroke-primary animate-spin' size={36} />
      </div>
    );
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <SectionTitle text='Your Trips' />
        <Button
          className='bg-primary text-background flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-md shadow-md transition-all duration-200 ease-in-out select-none hover:shadow-lg'
          onClick={handleCreateTrip}
        >
          Create New
        </Button>
      </div>
      <div className='grid grid-cols-2 gap-x-5 gap-y-8'>
        {dividedTrips.upComing.length > 0 && (
          <div className='col-span-2 space-y-2'>
            <h4 className='text-lg font-semibold italic'>Upcoming Trips</h4>
            <div className='grid grid-cols-3 gap-2'>
              {dividedTrips.upComing.map((trip) => (
                <div key={trip.id} className='col-span-1'>
                  <TripCard trip={trip} />
                </div>
              ))}
            </div>
          </div>
        )}
        {dividedTrips.done.length > 0 && dividedTrips.upComing.length > 0 && (
          <hr className='col-span-full border-1' />
        )}
        {dividedTrips.upComing.length > 0 && (
          <div className='col-span-2 space-y-2'>
            <h4 className='text-lg font-semibold italic'>Traveled Trips</h4>
            <div className='grid grid-cols-3 gap-2'>
              {dividedTrips.done.map((trip) => (
                <div key={trip.id} className='col-span-1'>
                  <TripCard trip={trip} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <TripDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleDialogCreate}
        title='Create a New Trip'
        description='Enter a name for your new trip.'
        submitText='Create'
        isLoading={creating}
      />
    </>
  );
}

export const TripCard = ({ trip }: { trip: ITrip }) => {
  const { updateTrip, deleteTrip } = useStore(useTripStore, (state) => state);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMoveCard = () => {
    if (trip.status) {
      updateTrip(trip.id, { status: false });
    } else {
      updateTrip(trip.id, { status: true });
    }
  };

  const handleUpdateName = async (name: string) => {
    if (!name.trim()) return;
    setIsLoading(true);
    await updateTrip(trip.id, { name: name.trim() });
    setIsLoading(false);
    setOpenUpdateDialog(false);
  };

  const handleDeleteTrip = async () => {
    setIsLoading(true);
    await deleteTrip(trip.id);
    setIsLoading(false);
    setOpenDeleteDialog(false);
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between rounded-md p-2 transition-all duration-200 ease-in-out select-none hover:shadow-lg',
        trip.is_optimized
          ? 'bg-primary/5 shadow-primary shadow-sm drop-shadow-md'
          : 'border-muted border shadow-sm',
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            'hover:bg-muted invisible absolute right-1 flex items-center justify-center rounded-md p-2 opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100 data-[state=open]:visible data-[state=open]:opacity-100',
            trip.is_optimized ? 'top-8' : 'top-0',
          )}
        >
          <button>
            <Ellipsis />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='peer'>
          <DropdownMenuItem asChild>
            <Link href={`trip/${trip.id}`}>View details</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenUpdateDialog(true)}>
            <span>Edit name</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleMoveCard}>
            {trip.status ? (
              <span>Move to upcoming</span>
            ) : (
              <span>Move to finish</span>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-red-500'
            onClick={() => setOpenDeleteDialog(true)}
          >
            <span>Delete trip</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link
        key={trip.id}
        href={`/trip/${trip.id}`}
        className='space-y-5 overflow-hidden'
      >
        <div className='gap-5'>
          <span className='mb-4 grow truncate text-lg font-bold text-black capitalize'>
            {trip.name}
          </span>

          {trip.is_optimized && (
            <span className='bg-primary absolute top-2 -right-1 rounded-[2px] px-1.5 py-1 text-xs font-medium text-white'>
              Optimized
            </span>
          )}
        </div>
        <p className='text-primary flex gap-2 text-sm font-semibold italic'>
          Total place: {trip.place_count || 0}
          {trip.numberHotel > 2 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleAlert className='size-5 fill-amber-400 text-white' />
              </TooltipTrigger>
              <TooltipContent
                className='bg-amber-300 font-semibold text-white'
                arrowClassName='bg-amber-300 fill-amber-300'
              >
                <span>Your trip has over 2 hotels</span>
              </TooltipContent>
            </Tooltip>
          )}
        </p>
        <div className='flex flex-row justify-between text-sm'>
          <Tooltip>
            <TooltipTrigger>
              <div className='flex flex-row items-center gap-2'>
                <div className='rounded-sm bg-green-50 p-2'>
                  <Hotel size={16} className='text-green-500' />
                </div>
                <span className='text-start text-green-500'>
                  {trip?.numberHotel || 0}
                  <p className='text-[12px] italic'>hotels</p>
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <span>Hotels: {trip?.numberHotel || 0}</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <div className='flex flex-row items-center gap-2'>
                <div className='rounded-sm bg-blue-50 p-2'>
                  <UtensilsCrossed size={16} className='text-blue-500' />
                </div>
                <span className='text-start text-blue-500'>
                  {trip?.numberRestaurant || 0}
                  <p className='text-[12px] italic'>restaurants</p>
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <span>Restaurants: {trip?.numberRestaurant || 0}</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className='flex flex-row items-center gap-2'>
                <div className='rounded-sm bg-yellow-50 p-2 drop-shadow-none'>
                  <CalendarCheck2 size={16} className='text-yellow-500' />
                </div>
                <span className='text-start text-yellow-500'>
                  {trip?.numberThingtodo || 0}
                  <p className='text-[12px] italic'>attractions</p>
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <span>Attractions: {trip?.numberThingtodo || 0}</span>
            </TooltipContent>
          </Tooltip>
        </div>
        <span className='text-muted-foreground text-sm'>
          Last updated: {formatDate(moment.utc(trip.updated_at).toString())}
        </span>
      </Link>

      <TripDialog
        description='Enter a new name for your trip'
        initialName={trip.name}
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
        onSubmit={handleUpdateName}
        title='Update Trip Name'
        submitText='Update'
        isLoading={isLoading}
      />

      <DeleteTripDialog
        onDelete={handleDeleteTrip}
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        tripName={trip.name}
        isLoading={isLoading}
      />
    </div>
  );
};
