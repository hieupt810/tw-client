'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef } from 'react';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/stores/auth-store';

export default function ChatPanel() {
  const { user } = useAuthStore();
  const boxChatRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';

  function scrollToBottom() {
    if (boxChatRef.current)
      boxChatRef.current.scrollTop = boxChatRef.current.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <Suspense>
      <div
        ref={boxChatRef}
        className='flex max-h-dvh w-full flex-col md:basis-3/4'
      >
        <div className='flex max-h-[calc(100vh-4rem)] grow flex-col-reverse gap-y-4 overflow-y-auto px-5 pt-5'>
          {id ? null : (
            <div className='inline-flex items-center justify-center gap-1 text-2xl/relaxed font-semibold tracking-wide'>
              <span>Hello,</span>
              {user ? (
                <span className='text-primary'>{user.name}</span>
              ) : (
                <Skeleton className='h-8 w-24' />
              )}
            </div>
          )}
        </div>
        <form className='px-5 pt-3 pb-5'>
          <Input type='text' placeholder='Ask something...' />
        </form>
      </div>
    </Suspense>
  );
}
