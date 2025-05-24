import { Heart } from 'lucide-react';

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
  isFavorite,
  iconOnly = false,
}: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size={iconOnly ? 'icon' : 'default'}
            className={
              isFavorite
                ? 'bg-primary !text-primary-foreground border-primary hover:bg-primary/90'
                : ''
            }
            aria-pressed={isFavorite}
          >
            <Heart />
            {!iconOnly && <span>Save</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFavorite ? 'Remove from profile' : 'Save to profile'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
