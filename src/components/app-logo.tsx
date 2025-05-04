import { DraftingCompass } from 'lucide-react';

import { APP_NAME } from '@/constants';

export default function AppLogo() {
  return (
    <div className='flex items-center gap-2 select-none'>
      <DraftingCompass className='stroke-primary size-6' strokeWidth={2.5} />
      <span className='hidden font-bold lg:inline-block'>{APP_NAME}</span>
    </div>
  );
}
