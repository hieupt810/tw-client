import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import { useDashboardStore } from '@/stores/dashboard-store';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Skeleton } from './ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function TopPlacesAddedToTrip() {
  const [selectIntoTrip, setSelectIntoTrip] = useState('all');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const { topPlaceIntoTrip, fetchTopPlaceIntoTrip } = useStore(
    useDashboardStore,
    (state) => state,
  );

  useEffect(() => {
    fetchTopPlaceIntoTrip(selectIntoTrip, order, page, 5);
  }, [selectIntoTrip, page, order]);
  const handleSelectIntoTrip = (value: string) => {
    setSelectIntoTrip(value);
    setPage(1);
  };

  const handleSelectOrderIntoTrip = (value: string) => {
    setOrder(value);
    setPage(1);
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) =>
      topPlaceIntoTrip.pageCount
        ? Math.min(prev + 1, topPlaceIntoTrip.pageCount)
        : prev + 1,
    );
  };
  return (
    <>
      {topPlaceIntoTrip.isLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className='mb-2 h-6 w-48' />
            <Skeleton className='h-4 w-64' />
            <div className='flex flex-row gap-5'>
              <Skeleton className='h-5 w-8' />
              <Skeleton className='h-5 w-8' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[...Array(5)].map((_, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-8 w-8 rounded-full' />
                    <Skeleton className='h-4 w-40' />
                  </div>
                  <Skeleton className='h-4 w-20' />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className='flex h-3 items-center justify-between border-t p-2'>
            <Skeleton className='h-4 w-20' />
            <div className='flex gap-1'>
              <Skeleton className='h-8 w-8' />
              <Skeleton className='h-8 w-8' />
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Top Places Added to Trips</CardTitle>
            <CardDescription>Most frequently added places</CardDescription>
            <div className='flex flex-row gap-5'>
              <Select
                onValueChange={handleSelectIntoTrip}
                value={selectIntoTrip}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value='all'>All</SelectItem>
                    <SelectItem value='restaurants'>Restaurant</SelectItem>
                    <SelectItem value='hotels'>Hotel</SelectItem>
                    <SelectItem value='things-to-do'>Attractions</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select onValueChange={handleSelectOrderIntoTrip} value={order}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value='desc'>DESC</SelectItem>
                    <SelectItem value='asc'>ASC</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {topPlaceIntoTrip.item.map((place, i) => (
                <div
                  key={place.element_id}
                  className='flex h-10 items-center justify-between'
                >
                  <div className='flex items-center gap-2'>
                    <div className='bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium'>
                      {(page - 1) * 5 + i + 1}
                    </div>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className='text-sm'>
                          {place.name.length > 30
                            ? `${place.name.substring(0, 27)}...`
                            : place.name}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>{place.name}</span>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className='font-medium'>{place.trip_count} trips</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className='flex h-3 items-center justify-between border-t p-2'>
            <div className='text-muted-foreground text-sm'>
              Page {page} of {topPlaceIntoTrip.pageCount || 1}
            </div>
            <div className='flex gap-1'>
              <Button
                variant='outline'
                size='icon'
                disabled={page === 1}
                onClick={handlePreviousPage}
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                disabled={
                  page === topPlaceIntoTrip.pageCount ||
                  !topPlaceIntoTrip.pageCount
                }
                onClick={handleNextPage}
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
