'use client';

import { Heart } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { useFavouriteStore } from '@/stores/favourite-store';

import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface Props {
  elementId: string;
  isFavorite: boolean;
  iconOnly?: boolean;
}

export default function SavePlaceButton({
  elementId,
  isFavorite,
  iconOnly = false,
}: Props) {
  const { add, remove } = useFavouriteStore();
  const [favorite, setFavorite] = useState(isFavorite);

  const handleClick = useCallback(async () => {
    try {
      if (favorite) await remove(elementId);
      else await add(elementId);
      setFavorite((prev) => !prev);
      toast.success('Success');
    } catch {
      toast.error('Something went wrong');
    }
  }, [favorite, elementId, add, remove]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size={iconOnly ? 'icon' : 'default'}
            className={
              favorite
                ? 'bg-primary !text-primary-foreground border-primary hover:bg-primary/90'
                : ''
            }
            aria-pressed={favorite}
            onClick={handleClick}
          >
            <Heart />
            {!iconOnly && <span>Save</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{favorite ? 'Remove from profile' : 'Save to profile'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
