import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 z-[9999] flex items-center justify-center bg-white/90'>
      <Loader2 size={40} className='stroke-primary animate-spin' />
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
