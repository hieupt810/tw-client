'use client';

import moment from 'moment';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useReviewStore } from '@/stores/review-store';
import { IReview } from '@/types/IReview';

import { StartRating } from './start-rating';
import { Separator } from './ui/separator';

export const ReviewSection = ({ placeId }: { placeId: string }) => {
  const { fetchReviews, reviews } = useStore(useReviewStore, (state) => state);

  useEffect(() => {
    if (placeId) {
      fetchReviews(placeId);
    }
  }, [placeId, fetchReviews]);

  return (
    <div className='flex flex-col gap-4 pt-8'>
      {reviews.items.length > 0 ? (
        reviews.items.map((review, index) => (
          <div className='px-8' key={review.id}>
            <ReviewItem review={review} />
            {index < reviews.items.length - 1 && <Separator />}
          </div>
        ))
      ) : (
        <p className='text-sm text-gray-500 italic'>There is no review.</p>
      )}
    </div>
  );
};

export const ReviewItem = ({ review }: { review: IReview }) => {
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
                    <StartRating rate={review.rating} />
                  </div>
                  <span className='text-sm font-medium text-gray-700'>
                    {review.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <time className='text-sm font-medium text-gray-500'>
                {moment.utc(review.created_at).fromNow()}
              </time>
            </div>

            <p className='leading-relaxed text-gray-700'>{review.review}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
