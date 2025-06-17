'use client';

import { HTTPError } from 'ky';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { ThingToDoDetailDialog } from '@/components/dialog-detail-thing-to-do';
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
import { ThingToDoService } from '@/services/thing-to-do';
import { IThingToDo } from '@/types/IThingToDo';

export default function ThingToDoAdminPage() {
  const [things, setThings] = useState<IThingToDo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '5');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000);
  const fetchThings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ThingToDoService.list(page, size, {
        search: debouncedSearchTerm,
      });
      setThings(data.data as IThingToDo[]);
      setTotalPages(data.paging.pageCount || 1);
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [page, size, debouncedSearchTerm]);

  useEffect(() => {
    fetchThings();
  }, [fetchThings]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await ThingToDoService.delete(deleteId);
      toast.success('Attraction deleted');
      setDeleteId(null);
      fetchThings();
    } catch (error) {
      if (error instanceof HTTPError) {
        const data = await error.response.json();
        toast.error(data.error);
      } else toast.error('Something went wrong');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className='py-5'>
      <div className='flex items-center justify-between'>
        <SectionTitle text='Manage Attractions' />
        <div className='flex items-center space-x-4'>
          <div className='relative flex-1'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
            <Input
              placeholder='Search restaurant by name '
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>
          <span>Page size:</span>
          <Select
            value={String(size)}
            onValueChange={(newValue) => {
              const newSize = Number(newValue);
              router.push(`/admin/thing-to-do?page=1&size=${newSize}`);
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
        {loading ? (
          <SkeletonListRestaurant />
        ) : (
          <>
            {things.length === 0 && <div>No attractions found.</div>}
            {things.map((thing) => (
              <Card
                key={thing.element_id}
                className='flex flex-row items-center justify-between p-4'
              >
                <div>
                  <div className='text-lg font-bold'>
                    {thing.name ? (
                      thing.name
                    ) : (
                      <span className='text-gray-400 italic'>Unknown Name</span>
                    )}
                  </div>

                  <div className='text-muted-foreground text-sm'>
                    {thing.city?.name || thing.street ? (
                      <>
                        {thing.city?.name || (
                          <span className='text-gray-400 italic'>
                            Unknown City
                          </span>
                        )}{' '}
                        |{' '}
                        {thing.street || (
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
                    {thing.email ? (
                      thing.email
                    ) : (
                      <span className='text-gray-400 italic'>
                        Unknown Email
                      </span>
                    )}
                  </div>
                </div>

                <div className='flex gap-2'>
                  <ThingToDoDetailDialog id={thing.element_id} />
                  <Button
                    variant='destructive'
                    onClick={() => setDeleteId(thing.element_id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </>
        )}
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
            router.push(`/admin/thing-to-do?${params.toString()}`);
          }}
        >
          <span className='pr-1'>Previous</span>
        </Button>
        <span className='px-3'>
          Page {page} of {totalPages}
        </span>
        <Button
          variant='outline'
          disabled={page === totalPages || things.length < size}
          aria-disabled={page === totalPages || things.length < size}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', (page + 1).toString());
            router.push(`/admin/thing-to-do?${params.toString()}`);
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
          <div>Are you sure you want to delete this attraction?</div>
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
