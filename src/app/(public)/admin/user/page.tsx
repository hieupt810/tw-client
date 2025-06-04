'use client';

import { Calendar, Mail, Phone, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import { UserDetailsDialog } from '@/components/dialog-detail-user';
import Loading from '@/components/loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { useUserStore } from '@/stores/user.store';

export default function UserAdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const size = parseInt(searchParams.get('size') || '5');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { users, fetchUsers, fetchDeleteUser } = useStore(
    useUserStore,
    (state) => state,
  );
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000);

  useEffect(() => {
    fetchUsers(page, size, debouncedSearchTerm);
  }, [fetchUsers, page, size, debouncedSearchTerm]);

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      try {
        await fetchDeleteUser(selectedUserId);
        setIsDialogOpen(false);
        setSelectedUserId(null);
        fetchUsers(page, size, debouncedSearchTerm);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
    setSelectedUserId(null);
  };

  if (users.isLoading) return <Loading />;

  return (
    <div className='min-h-screen'>
      {/* Main Content */}
      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        {/* Page Header */}
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Manage Users</h1>
            <p className='mt-1 text-gray-600'>
              Manage and organize your user accounts
            </p>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='relative flex-1'>
              <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
              <Input
                placeholder='Search users by name '
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
        {/* User List */}
        <div className='space-y-4'>
          {users.items.map((user) => (
            <Card
              key={user.id}
              className='p-2 transition-shadow duration-200 hover:shadow-md'
            >
              <CardContent className='p-3 md:p-4'>
                <div className='flex flex-col space-y-2 lg:flex-row lg:items-center lg:justify-between lg:space-y-0'>
                  <div className='flex flex-1 items-start space-x-3 sm:items-center'>
                    <Avatar className='h-8 w-8 flex-shrink-0 md:h-10 md:w-10'>
                      <AvatarImage
                        src={user.avatar || '/placeholder.svg'}
                        alt={user.full_name}
                      />
                      <AvatarFallback className='bg-purple-100 text-xs font-semibold text-purple-600'>
                        {user.full_name}
                      </AvatarFallback>
                    </Avatar>

                    <div className='min-w-0 flex-1'>
                      <div className='mb-1 flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3'>
                        <h3 className='truncate text-base font-semibold text-gray-900 md:text-lg'>
                          {user.full_name}
                        </h3>
                        <div className='flex flex-wrap gap-1'></div>
                      </div>

                      <div className='space-y-1'>
                        <div className='flex items-center space-x-2'>
                          <Mail className='h-3 w-3 flex-shrink-0 text-gray-400' />
                          <p className='truncate text-xs text-gray-600 md:text-sm'>
                            {user.email}
                          </p>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Phone className='h-3 w-3 flex-shrink-0 text-gray-400' />
                          <p
                            className={`truncate text-xs text-gray-500 md:text-sm ${
                              user.phone_number ? '' : 'italic'
                            }`}
                          >
                            {user.phone_number || 'Unknown'}
                          </p>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Calendar className='h-3 w-3 flex-shrink-0 text-gray-400' />
                          <p className='text-xs text-gray-400'>
                            Birthday:{' '}
                            {new Date(user.birthday).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center justify-end space-x-2 lg:flex-shrink-0'>
                    <UserDetailsDialog id={user.id} />
                    <Button
                      variant='destructive'
                      onClick={() => handleDeleteClick(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
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
              router.push(`/admin/user?${params.toString()}`);
            }}
          >
            <span className='pr-1'>Previous</span>
          </Button>
          <span className='px-3'>
            Page {page} of {users.paging.pageCount}
          </span>
          <Button
            variant='outline'
            disabled={
              page === users.paging.pageCount || users.items.length < size
            }
            aria-disabled={
              page === users.paging.pageCount || users.items.length < size
            }
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('page', (page + 1).toString());
              router.push(`/admin/user?${params.toString()}`);
            }}
          >
            <span className='pl-1'>Next</span>
          </Button>
        </div>
      </main>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div>Are you sure you want to delete this user?</div>
          <DialogFooter>
            <Button variant='outline' onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
