import { DraftingCompass } from 'lucide-react';

import { APP_NAME } from '@/constants';

export default function AppLogo() {
  return (
    <div className='flex h-8 flex-row items-center gap-2 md:h-10'>
      <DraftingCompass size={28} />
      <span className='text-2xl font-bold tracking-wide select-none'>
        {APP_NAME}
      </span>
    </div>
  );
}
