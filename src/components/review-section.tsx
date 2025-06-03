'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import { useReviewStore } from '@/stores/review-store';
import {
  IReview,
  IReviewQuery,
  ReviewSortBy,
  ReviewSortOrder,
} from '@/types/IReview';

import Loading from './loading';
import { DialogReviewInputs } from './review-dialog-inputs';
import { ReviewItem } from './review-item';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const filterOptions = [
  {
    label: 'Rating: High to Low',
    values: {
      sortBy: ReviewSortBy.RATING,
      sortOrder: ReviewSortOrder.DESC,
    },
  },
  {
    label: 'Rating: Low to High',
    values: {
      sortBy: ReviewSortBy.RATING,
      sortOrder: ReviewSortOrder.ASC,
    },
  },
  {
    label: 'Newest First',
    values: {
      sortBy: ReviewSortBy.CREATED_AT,
      sortOrder: ReviewSortOrder.DESC,
    },
  },
  {
    label: 'Oldest First',
    values: {
      sortBy: ReviewSortBy.CREATED_AT,
      sortOrder: ReviewSortOrder.ASC,
    },
  },
  {
    label: 'Updated Recently',
    values: {
      sortBy: ReviewSortBy.UPDATED_AT,
      sortOrder: ReviewSortOrder.DESC,
    },
  },
  {
    label: 'Updated Long Ago',
    values: {
      sortBy: ReviewSortBy.UPDATED_AT,
      sortOrder: ReviewSortOrder.ASC,
    },
  },
];

export const ReviewSection = ({ placeId }: { placeId: string }) => {
  const { me } = useAuthStore((state) => state);
  const { reviews, myReview, fetchReviews, createReview, fetchMyReview } =
    useStore(useReviewStore, (state) => state);

  const [query, setQuery] = useState<IReviewQuery>({
    page: 1,
    size: 5,
    sortBy: ReviewSortBy.CREATED_AT,
    sortOrder: ReviewSortOrder.DESC,
  });

  useEffect(() => {
    if (placeId) {
      fetchMyReview(placeId);
    }
  }, [placeId, fetchMyReview]);

  // fetch list of reviews
  useEffect(() => {
    if (placeId) {
      fetchReviews(placeId, query);
    }
  }, [placeId, query, fetchReviews]);

  const handlePreviousPage = () => {
    setQuery((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  };
  const handleNextPage = () => {
    setQuery((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handleFilterOptionChange = (
    sortBy: ReviewSortBy,
    sortOrder: ReviewSortOrder,
  ) => {
    setQuery((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
      page: 1, // Reset to first page on filter change
    }));
  };

  const handleCreateReviewSubmit = async (
    inputs: Pick<IReview, 'review' | 'rating'>,
  ) => {
    await createReview(placeId, {
      rating: inputs.rating,
      review: inputs.review.trim(),
    });
  };
  return (
    <div className='flex flex-col gap-4 pt-4'>
      {myReview && (
        <div>
          <p className='text-lg font-semibold'>My review</p>
          <ReviewItem review={myReview} hasOptions={true} />
          <Separator className='my-4 border-2' />
        </div>
      )}
      <div
        className={cn(
          'flex items-center',
          myReview ? 'justify-end' : 'justify-between',
        )}
      >
        {!myReview && (
          <DialogReviewInputs
            onSubmit={handleCreateReviewSubmit}
            nodeTrigger={
              me !== null ? (
                <Button
                  disabled={me === null}
                  className={cn(me === null && 'cursor-not-allowed opacity-50')}
                >
                  Write a Review
                </Button>
              ) : (
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      disabled={me === null}
                      className={cn(
                        me === null && 'cursor-not-allowed opacity-50',
                      )}
                    >
                      Write a Review
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {me === null
                      ? 'You must be logged in to write a review.'
                      : 'Share your experience with this place.'}
                  </TooltipContent>
                </Tooltip>
              )
            }
          />
        )}
        <Select
          onValueChange={(value: string) => {
            const [sortBy, sortOrder] = value.split('-');
            handleFilterOptionChange(
              sortBy as ReviewSortBy,
              sortOrder as ReviewSortOrder,
            );
          }}
        >
          <SelectTrigger>
            <p>
              {filterOptions.find(
                (option) =>
                  option.values.sortBy === query.sortBy &&
                  option.values.sortOrder === query.sortOrder,
              )?.label || 'Sort Reviews'}
            </p>
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map((option) => (
              <SelectItem
                key={option.label}
                value={`${option.values.sortBy}-${option.values.sortOrder}`}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {reviews.isLoading ? (
        <Loading />
      ) : reviews.items.data.length > 0 ? (
        <div>
          <p className='font-semibold'>Others reviews</p>
          {reviews.items.data.map((review, index) => (
            <div className='px-8' key={review.id}>
              <ReviewItem review={review} />
              {index < reviews.items.data.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      ) : (
        <p className='text-sm text-gray-500 italic'>There is no review.</p>
      )}
      {/* Pagination */}
      {(reviews.items.data.length > 0 || reviews.isLoading) && (
        <div className='flex items-center justify-center pb-10'>
          <div className='grid grid-cols-3 items-center gap-4'>
            <Button
              variant='outline'
              onClick={handlePreviousPage}
              disabled={query.page <= 1}
            >
              <ArrowLeft />
              <span>Previous</span>
            </Button>
            <span className='text-center text-sm font-medium'>{`Page ${query.page} of ${reviews.items.paging.pageCount}`}</span>
            <Button
              variant='outline'
              onClick={handleNextPage}
              disabled={query.page >= reviews.items.paging.pageCount}
            >
              <span>Next</span>
              <ArrowRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
