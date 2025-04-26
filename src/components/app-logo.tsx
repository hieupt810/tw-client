import { DraftingCompass } from 'lucide-react';

import { APP_NAME } from '@/constants';

export default function AppLogo() {
  return (
    <div className='flex h-8 flex-row items-center gap-0.5 md:h-9'>
      <DraftingCompass size={24} strokeWidth={2.5} className='stroke-primary' />
      <span className='text-xl font-semibold tracking-tight select-none'>
        {APP_NAME}
      </span>
    </div>
  );
}
