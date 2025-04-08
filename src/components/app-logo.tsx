import { DraftingCompass } from 'lucide-react';

import { APP_NAME } from '@/constants';

export default function AppLogo() {
  return (
    <div className='flex h-10 flex-row items-center gap-2'>
      <DraftingCompass size={28} />
      <span className='text-2xl font-bold tracking-wide select-none'>
        {APP_NAME}
      </span>
    </div>
  );
}
