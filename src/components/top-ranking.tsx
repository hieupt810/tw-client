import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
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

export default function TopRanking() {
  const [selectRanking, setSelectRanking] = useState('all');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const { topPlaceRanking, fetchTopPlaceRanking } = useStore(
    useDashboardStore,
    (state) => state,
  );

  useEffect(() => {
    fetchTopPlaceRanking(selectRanking, order, page, 5);
  }, [selectRanking, page, order]);
  const handleSelectRanking = (value: string) => {
    setSelectRanking(value);
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
      topPlaceRanking.pageCount
        ? Math.min(prev + 1, topPlaceRanking.pageCount)
        : prev + 1,
    );
  };
  return (
    <>
      {topPlaceRanking.isLoading ? (
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
            <CardTitle>Top Ranked Places</CardTitle>
            <CardDescription>Popular Places</CardDescription>
            <div className='flex flex-row gap-5'>
              <Select onValueChange={handleSelectRanking} value={selectRanking}>
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
              {topPlaceRanking.item.map((place, i) => (
                <div
                  key={place.element_id}
                  className='flex h-10 items-center justify-between'
                >
                  <div className='flex items-center gap-2'>
                    <div className='bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full'>
                      <span className='text-sm font-medium'>
                        {(page - 1) * 5 + i + 1}
                      </span>
                    </div>
                    <div>
                      <div className='text-sm'>
                        <Tooltip>
                          <TooltipTrigger>
                            <div>
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
                      <div className='text-muted-foreground text-sm'>
                        {place.raw_ranking ? (
                          <Tooltip>
                            <TooltipTrigger>
                              <span>
                                {place.raw_ranking > 4
                                  ? Number(place.raw_ranking).toFixed(3)
                                  : place.raw_ranking.toString().slice(0, 4)}
                                &nbsp;point
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>{place.raw_ranking}</TooltipContent>
                          </Tooltip>
                        ) : (
                          <span className='text-gray-400 italic'>Unknown</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-row gap-2 font-medium'>
                    {place.rating !== undefined
                      ? place.rating.toFixed(1)
                      : 'N/A'}{' '}
                    <Star className='h-5 w-5 fill-yellow-400 text-yellow-400' />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className='flex h-3 items-center justify-between border-t p-2'>
            <div className='text-muted-foreground text-sm'>
              Page {page} of {topPlaceRanking.pageCount || 1}
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
                  page === topPlaceRanking.pageCount ||
                  !topPlaceRanking.pageCount
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
