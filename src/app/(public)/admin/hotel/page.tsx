'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import { DialogDetailHotel } from '@/components/dialog-detail-hotel';
import SectionTitle from '@/components/section-title';
import SkeletonListRestaurant from '@/components/skeleton/skeleton-list-restaurant';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDebounce } from '@/hooks/useDebounce';
import { useHotelStore } from '@/stores/hotel-store';

export default function HotelAdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '5');
  const [searchTerm, setSearchTerm] = useState('');
  const { hotels, fetchHotels } = useStore(useHotelStore, (state) => state);
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000);
  useEffect(() => {
    fetchHotels(page, size, debouncedSearchTerm);
  }, [fetchHotels, page, size, debouncedSearchTerm]);

  return (
    <div className='py-5'>
      <div className='flex items-center justify-between'>
        <SectionTitle text='Manage Hotels' />
        <div className='flex items-center space-x-4'>
          <div className='relative flex-1'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
            <Input
              placeholder='Search hotel by name '
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>
          <span className='text-sm text-gray-500'>Page size:</span>
          <Select
            value={String(size)}
            onValueChange={(newValue) => {
              const newSize = Number(newValue);
              router.push(`/admin/user?page=1&size=${newSize}`);
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
        {hotels.isLoading ? (
          <SkeletonListRestaurant />
        ) : (
          <>
            {hotels.items.length === 0 && <div>No hotels found.</div>}
            {hotels.items.map((hotel) => (
              <Card
                key={hotel.element_id}
                className='flex flex-row items-center justify-between p-4'
              >
                <div>
                  <div className='text-lg font-bold'>
                    {hotel.name ? (
                      hotel.name
                    ) : (
                      <span className='text-gray-400 italic'>Unknown Name</span>
                    )}
                  </div>

                  <div className='text-muted-foreground text-sm'>
                    {hotel.city?.name || hotel.street ? (
                      <>
                        {hotel.city?.name || (
                          <span className='text-gray-400 italic'>
                            Unknown City
                          </span>
                        )}{' '}
                        |{' '}
                        {hotel.street || (
                          <span className='text-gray-400 italic'>
                            Unknown Street
                          </span>
                        )}
                      </>
                    ) : (
                      <span className='text-gray-400 italic'>
                        Unknown Address
                      </span>
                    )}
                  </div>

                  <div className='text-muted-foreground text-xs'>
                    {hotel.email ? (
                      hotel.email
                    ) : (
                      <span className='text-gray-400 italic'>
                        Unknown Email
                      </span>
                    )}
                  </div>
                </div>
                <div className='flex gap-2'>
                  <DialogDetailHotel id={hotel.element_id} />
                  <Button variant='destructive'>Delete</Button>
                </div>
              </Card>
            ))}
          </>
        )}
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
