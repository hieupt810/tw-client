'use client';

import { EllipsisVertical, Pen, Trash } from 'lucide-react';
import { useStore } from 'zustand';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { timeAgo } from '@/lib/utils';
import { useReviewStore } from '@/stores/review-store';
import { IReview } from '@/types/IReview';

import { InteractedRating } from './interacted-rating';
import {
  ConfirmDeleteDialog,
  DialogReviewInputs,
} from './review-dialog-inputs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const ReviewItem = ({
  review,
  hasOptions = false,
}: {
  review: IReview;
  hasOptions?: boolean;
}) => {
  const { updateReview, deleteReview } = useStore(
    useReviewStore,
    (state) => state,
  );

  const handleUpdateSubmit = async (
    inputs: Pick<IReview, 'review' | 'rating'>,
  ) => {
    await updateReview(review.place_id, {
      rating: inputs.rating,
      review: inputs.review.trim(),
    });
  };

  const handleDeleteReview = async () => {
    await deleteReview(review.place_id);
  };

  return (
    <Card className='border-0 py-2 shadow-none'>
      <CardContent className='p-0'>
        <div className='flex gap-4'>
          <Avatar className='h-12 w-12 border-2 border-gray-100'>
            <AvatarImage
              src={review?.user?.avatar || '/placeholder.svg'}
              alt={review?.user?.full_name}
            />
            <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-white'>
              {review?.user?.full_name}
            </AvatarFallback>
          </Avatar>

          <div className='flex-1 space-y-3'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {review?.user?.full_name}
                </h3>
                <div className='mt-1 flex items-center gap-2'>
                  <div className='flex items-center gap-1'>
                    <InteractedRating
                      value={review.rating}
                      interactive={false}
                      size='xs'
                    />
                  </div>
                  <span className='text-sm font-medium text-gray-700'>
                    {review.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              {hasOptions ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <button className='flex items-center justify-center'>
                      <EllipsisVertical className='text-primary size-8' />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='min-w-5'>
                    <DropdownMenuItem asChild>
                      <DialogReviewInputs
                        nodeTrigger={
                          <button className='text-primary hover:bg-primary-foreground flex w-full items-center gap-2 p-2'>
                            <Pen className='text-primary hover:bg-primary-foreground size-4' />
                            Update
                          </button>
                        }
                        rating={review.rating}
                        review={review.review}
                        onSubmit={handleUpdateSubmit}
                      />
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <ConfirmDeleteDialog
                        nodeTrigger={
                          <button className='flex w-full items-center gap-2 p-2 text-red-500 hover:bg-red-50'>
                            <Trash className='size-4 text-red-500 hover:bg-red-50' />
                            Delete
                          </button>
                        }
                        onSubmit={handleDeleteReview}
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <time className='text-sm font-medium text-gray-500'>
                  {timeAgo(review.created_at)}
                </time>
              )}
            </div>

            <p className='leading-relaxed text-gray-700'>{review.review}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
