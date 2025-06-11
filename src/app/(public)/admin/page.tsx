'use client';

import { SelectValue } from '@radix-ui/react-select';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { useStore } from 'zustand';

import SectionTitle from '@/components/section-title';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDashboardStore } from '@/stores/dashboard-store';

export default function AdminPage() {
  const [selectIntoTrip, setSelectIntoTrip] = useState('all');
  const [selectRanking, setSelectRanking] = useState('all');
  const {
    summary,
    userRegister,
    topPlaceIntoTrip,
    topPlaceRanking,
    fetchSummary,
    fetchChartUserRegister,
    fetchTopPlaceRanking,
    fetchTopPlaceIntoTrip,
  } = useStore(useDashboardStore, (state) => state);

  useEffect(() => {
    fetchSummary();
    fetchChartUserRegister();
    fetchTopPlaceIntoTrip(selectIntoTrip, 'desc', 1, 5);
    fetchTopPlaceRanking(selectRanking, 'desc', 1, 5);
  }, [fetchSummary, selectIntoTrip, selectRanking]);
  const monthlyData = userRegister?.item
    ? Object.entries(userRegister.item)
        .filter(([key]) => key !== 'total_user')
        .map(([month, count]) => ({
          month: month.substring(0, 3),
          count,
        }))
    : [];
  const handleSelectIntoTrip = (value: string) => {
    setSelectIntoTrip(value);
  };
  const handleSelectRanking = (value: string) => {
    setSelectRanking(value);
  };
  return (
    <div className='flex flex-col gap-4 p-4 md:p-8'>
      <SectionTitle text='Admin Dashboard' />
      {/* Summary Cards */}
      {summary.isLoading ? (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {[...Array(4)].map((_, index) => (
            <Card key={index}>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <Skeleton className='h-4 w-20' />
              </CardHeader>
              <CardContent>
                <Skeleton className='mb-2 h-8 w-24' />
                <Skeleton className='h-3 w-32' />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {summary.item?.total_users}
              </div>
              <p className='text-muted-foreground text-xs'>Registered users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium'>Total Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {summary.item?.total_trips}
              </div>
              <p className='text-muted-foreground text-xs'>Created by users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Optimized Trip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {summary.item?.total_optimized_trips}
              </div>
              <p className='text-muted-foreground text-xs'>Created by users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium'>
                Avg. Places Per Trip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {summary.item?.average_places_per_trip}
              </div>
              <p className='text-muted-foreground text-xs'>Places per trip</p>
            </CardContent>
          </Card>
        </div>
      )}
      {userRegister.isLoading ? (
        <div>
          <Card className='col-span-1'>
            <CardHeader>
              <Skeleton className='mb-2 h-6 w-40' />
              <Skeleton className='h-4 w-64' />
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-2'>
                <Skeleton className='h-[300px] w-full rounded' />
                <div className='flex justify-between px-4'>
                  {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} className='h-20 w-10 rounded' />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle>User Registrations</CardTitle>
              <CardDescription>
                Monthly user registration statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <ChartContainer
                  config={{
                    users: {
                      label: 'Users',
                      color: '#8b5cf6',
                    },
                  }}
                >
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray='3 3' vertical={false} />
                      <XAxis dataKey='month' />
                      <YAxis allowDecimals={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey='count'
                        name='users'
                        fill='var(--color-users)'
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top Places Tables */}
      <div className='grid gap-4 md:grid-cols-2'>
        {topPlaceIntoTrip.isLoading ? (
          <Card>
            <CardHeader>
              <Skeleton className='mb-2 h-6 w-48' />
              <Skeleton className='h-4 w-64' />
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-8 w-8 rounded-full' />
                      <Skeleton className='h-4 w-40' />
                    </div>
                    <Skeleton className='h-4 w-20' />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Top Places Added to Trips</CardTitle>
              <CardDescription>Most frequently added places</CardDescription>
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
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {topPlaceIntoTrip.item.map((place, i) => (
                  <div
                    key={place.element_id}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center gap-2'>
                      <div className='bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full'>
                        <span className='text-sm font-medium'>{i + 1}</span>
                      </div>
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
                    <div className='font-medium'>{place.trip_count} trips</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        {topPlaceRanking.isLoading ? (
          <Card>
            <CardHeader>
              <Skeleton className='mb-2 h-6 w-48' />
              <Skeleton className='h-4 w-64' />
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-8 w-8 rounded-full' />
                      <Skeleton className='h-4 w-40' />
                    </div>
                    <Skeleton className='h-4 w-20' />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Top Ranked Places</CardTitle>
              <CardDescription>Places with highest ratings</CardDescription>
              <Select onValueChange={handleSelectRanking} value={selectRanking}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value='all'>All Of Types</SelectItem>
                    <SelectItem value='restaurants'>Restaurant</SelectItem>
                    <SelectItem value='hotels'>Hotel</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {topPlaceRanking.item.map((place, i) => (
                  <div
                    key={place.element_id}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center gap-2'>
                      <div className='bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full'>
                        <span className='text-sm font-medium'>{i + 1}</span>
                      </div>
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
          </Card>
        )}
      </div>
    </div>
  );
}
