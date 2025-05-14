import { Heart } from 'lucide-react';

import { Button } from './ui/button';

export default function SavePlaceButton() {
  return (
    <Button variant='outline'>
      <Heart />
      <span>Save</span>
    </Button>
  );
}
