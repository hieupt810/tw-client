'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import Loading from '@/components/loading';
import SectionTitle from '@/components/section-title';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useHotelStore } from '@/stores/hotel-store';

export default function HotelAdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '10');

  const { hotels, fetchHotels } = useStore(useHotelStore, (state) => state);

  useEffect(() => {
    fetchHotels(page, size);
  }, [fetchHotels, page, size]);

  if (hotels.isLoading) return <Loading />;

  return (
    <div className='py-5'>
      <div className='flex items-center justify-between'>
        <SectionTitle text='Manage Hotels' />
        <div className='flex items-center gap-2'>
          <span>Page size:</span>
          <Select
            value={String(size)}
            onValueChange={(newValue) => {
              const newSize = Number(newValue);
              router.push(`/admin/hotel?page=1&size=${newSize}`);
            }}
          >
            <SelectTrigger className='min-w-[70px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='5'>5</SelectItem>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='20'>20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='mt-6 grid gap-4'>
        {hotels.items.length === 0 && <div>No hotels found.</div>}
        {hotels.items.map((hotel) => (
          <Card
            key={hotel.elementId}
            className='flex flex-row items-center justify-between p-4'
          >
            <div>
              <div className='text-lg font-bold'>{hotel.name}</div>
              <div className='text-muted-foreground text-sm'>
                {hotel.city?.name} | {hotel.street}
              </div>
              <div className='text-muted-foreground text-xs'>{hotel.email}</div>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                onClick={() =>
                  router.push(`/admin/hotel/edit/${hotel.elementId}`)
                }
              >
                Edit
              </Button>
              <Button variant='destructive'>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
      <div className='mt-6 flex flex-row items-center justify-center gap-2 text-sm font-medium'>
        <Button
          variant='outline'
          disabled={page === 1}
          aria-disabled={page === 1}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', (page - 1).toString());
            router.push(`/admin/hotel?${params.toString()}`);
          }}
        >
          <span className='pr-1'>Previous</span>
        </Button>
        <span className='px-3'>
          Page {page} of {hotels.paging.pageCount}
        </span>
        <Button
          variant='outline'
          disabled={
            page === hotels.paging.pageCount || hotels.items.length < size
          }
          aria-disabled={
            page === hotels.paging.pageCount || hotels.items.length < size
          }
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', (page + 1).toString());
            router.push(`/admin/hotel?${params.toString()}`);
          }}
        >
          <span className='pl-1'>Next</span>
        </Button>
      </div>
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div>Are you sure you want to delete this hotel?</div>
          <DialogFooter>
            <Button variant='outline'>Cancel</Button>
            <Button variant='destructive'>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
