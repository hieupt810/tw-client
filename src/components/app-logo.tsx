import { DraftingCompass } from 'lucide-react';

import { Constant } from '@/constants';

export default function AppLogo() {
  return (
    <div className='flex items-center gap-1 select-none'>
      <DraftingCompass className='stroke-primary' />
      <span className='text-lg font-semibold'>{Constant.APP_NAME}</span>
    </div>
  );
}
