'use client';

import { HTTPError } from 'ky';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

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
import { HotelService } from '@/services/hotel';
import { IHotel } from '@/types/IHotel';

export default function HotelAdminPage() {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '10');

  const fetchHotels = useCallback(async () => {
    setLoading(true);
    try {
      const data = await HotelService.list(page, size);
      setHotels(data.data as IHotel[]);
      setTotalPages(data.paging.pageCount || 1);
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await HotelService.delete(deleteId);
      toast.success('Hotel deleted');
      setDeleteId(null);
      fetchHotels();
    } catch (error) {
      if (error instanceof HTTPError) {
        const data = await error.response.json();
        toast.error(data.error);
      } else toast.error('Something went wrong');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <div className='px-10'>
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
        {hotels.length === 0 && <div>No hotels found.</div>}
        {hotels.map((hotel) => (
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
              <Button
                variant='destructive'
                onClick={() => setDeleteId(hotel.elementId)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {/* Pagination Controls - HorizontalPlace style */}
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
          Page {page} of {totalPages}
        </span>
        <Button
          variant='outline'
          disabled={page === totalPages || hotels.length < size}
          aria-disabled={page === totalPages || hotels.length < size}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', (page + 1).toString());
            router.push(`/admin/hotel?${params.toString()}`);
          }}
        >
          <span className='pl-1'>Next</span>
        </Button>
      </div>
      <Dialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div>Are you sure you want to delete this hotel?</div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setDeleteId(null)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleDelete}
              disabled={deleting}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
