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
  iconOnly?: boolean;
}

export default function SavePlaceButton({ iconOnly = false }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline' size={iconOnly ? 'icon' : 'sm'}>
            <Heart />
            {!iconOnly && <span>Save</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Save this place to your profile</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
