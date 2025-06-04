'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type TripDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (name: string) => void;
  initialName?: string;
  title?: string;
  description?: string;
  submitText?: string;
  isLoading?: boolean;
};

export const TripDialog = ({
  open = false,
  onOpenChange,
  onSubmit,
  initialName = '',
  title = 'Create a New Trip',
  description = 'Enter a name for your trip.',
  submitText = 'Create',
  isLoading = false,
}: TripDialogProps) => {
  const [tripName, setTripName] = useState<string>(initialName);

  const handleSubmit = () => {
    if (!tripName.trim()) return;
    onSubmit?.(tripName.trim());
    setTripName('');
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTripName(initialName);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Trip Name
          </Label>
          <Input
            autoFocus
            id='name'
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            className='col-span-3'
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoading && tripName.trim()) {
                handleSubmit();
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            disabled={isLoading}
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !tripName.trim()}
          >
            {isLoading ? `${submitText}...` : submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteTripDialog = ({
  onDelete,
  onOpenChange,
  open,
  tripName,
  isLoading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tripName: string;
  onDelete: () => void;
  isLoading?: boolean;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete trip</DialogTitle>
          <DialogDescription>Delete your trip permanently.</DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-4 items-center gap-4'></div>
        <DialogFooter>
          <Button
            variant='outline'
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={onDelete} disabled={isLoading || !tripName.trim()}>
            {isLoading ? 'Delete' : 'Deleting'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
