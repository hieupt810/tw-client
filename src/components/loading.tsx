import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div>
      <div className='fixed top-0 right-0 bottom-0 left-0 z-[9999] flex items-center justify-center bg-violet-50'>
        <Loader2 size={40} className='stroke-primary animate-spin' />
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
}

export const LoadingOnlyIcon = () => {
  return (
    <div className='flex items-center justify-center'>
      <Loader2 size={24} className='stroke-primary animate-spin' />
    </div>
  );
};
