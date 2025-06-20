'use client';

import { useEffect } from 'react';
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
import TopPlacesAddedToTrip from '@/components/top-places-added-to-trip';
import TopRanking from '@/components/top-ranking';
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
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardStore } from '@/stores/dashboard-store';

export default function AdminPage() {
  const { summary, userRegister, fetchSummary, fetchChartUserRegister } =
    useStore(useDashboardStore, (state) => state);

  useEffect(() => {
    fetchSummary();
    fetchChartUserRegister();
  }, [fetchSummary]);
  const monthlyData = userRegister?.item
    ? Object.entries(userRegister.item)
        .filter(([key]) => key !== 'total_user')
        .map(([month, count]) => ({
          month: month.substring(0, 3),
          count,
        }))
    : [];

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

      <div className='grid gap-4 md:grid-cols-2'>
        <TopPlacesAddedToTrip />
        <TopRanking />
      </div>
    </div>
  );
}
