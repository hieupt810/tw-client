'use client';

import { useState } from 'react';

import { InteractedRating } from './interacted-rating';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export const DialogReviewInputs = ({
  nodeTrigger,
  review,
  rating,
  onClose,
  onSubmit,
  open,
  setOpen,
}: {
  nodeTrigger: React.ReactNode;
  review?: string;
  rating?: number;
  onSubmit: (inputs: { review: string; rating: number }) => void;
  onClose?: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}) => {
  const [inputs, setInputs] = useState({
    review: review || '',
    rating: rating || 5,
  });

  const handleChangeRating = (value: number) => {
    setInputs((prev) => ({ ...prev, rating: value }));
  };
  const handleChangeReview = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInputs((prev) => ({ ...prev, review: event.target.value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{nodeTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold'>
            Write a Review
          </DialogTitle>
          <DialogDescription>
            Share your experience to help other customers make informed
            decisions.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <Label>Rating*</Label>
            <InteractedRating
              size='md'
              interactive={true}
              stars={5}
              value={inputs.rating}
              setValue={handleChangeRating}
            />
          </div>
          <div className='space-y-2'>
            <Label>Your review*</Label>
            <Textarea
              value={inputs.review}
              onChange={handleChangeReview}
              placeholder='Tell us about your experience...'
              rows={5}
              className='min-h-20'
            ></Textarea>
          </div>
        </div>
        <DialogFooter className='flex w-full flex-col gap-2 pt-4'>
          <DialogClose asChild onClick={onClose}>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant='default'
              onClick={() =>
                onSubmit({ review: inputs.review, rating: inputs.rating })
              }
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const ConfirmDeleteDialog = ({
  nodeTrigger,
  onSubmit,
  onClose,
  open,
  setOpen,
}: {
  nodeTrigger: React.ReactNode;
  onSubmit: () => void;
  onClose?: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{nodeTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold'>
            Write a Review
          </DialogTitle>
          <DialogDescription>
            Share your experience to help other customers make informed
            decisions.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex w-full flex-col gap-2 pt-4'>
          <DialogClose asChild onClick={onClose}>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant='destructive' onClick={onSubmit}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
