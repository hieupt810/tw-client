'use client';

import { Heart } from 'lucide-react';
import { useCallback, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'sonner';
import { useStore } from 'zustand';

import { useAuthStore } from '@/stores/auth-store';
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
  const me = useStore(useAuthStore, (state) => state.me);
  const { add, remove } = useStore(useFavouriteStore, (state) => state);
  const [favorite, setFavorite] = useState<boolean>(isFavorite);

  const handleClick = useCallback(async () => {
    if (!me) {
      toast.error('You need to be logged in to save places');
      return;
    }
    if (favorite) await remove(elementId);
    else await add(elementId);

    const error = useFavouriteStore.getState().error;
    if (error) {
      toast.error(error);
      return;
    }
    setFavorite((prev) => !prev);
    toast.success('Success');
  }, [elementId, favorite, me, add, remove]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size={iconOnly ? 'icon' : 'default'}
            className={
              favorite
                ? 'border-primary hover:bg-primary !text-primary bg-white hover:!text-white'
                : ''
            }
            aria-pressed={favorite}
            onClick={handleClick}
          >
            {favorite ? <FaHeart /> : <Heart />}
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
