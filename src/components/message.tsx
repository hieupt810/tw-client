'use client';

import Image from 'next/image';
import { useStore } from 'zustand';

import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth';

import Markdown from './markdown';

type Props = {
  text?: string;
  isUser?: boolean;
  isLoading?: boolean;
};

export default function Message({
  text = '',
  isUser = false,
  isLoading = false,
}: Props) {
  const me = useStore(useAuthStore, (state) => state.me);

  return (
    <div
      className={cn(
        'flex w-full items-start gap-2',
        isUser ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <div className='size-8 overflow-hidden rounded-full shadow-md'>
        {isUser ? (
          <Image
            src={me && me.avatar ? me.avatar : '/fallback-avatar.jpg'}
            alt={me ? me.fullName : 'User'}
            width={1000}
            height={1000}
          />
        ) : (
          <Image src='/robot.jpeg' alt='Assistant' width={1000} height={1000} />
        )}
      </div>

      {isLoading && (
        <div className='flex h-10 flex-row items-center gap-2 rounded-xl bg-violet-50 px-4 py-1.5 shadow-md'>
          <div className='bg-primary size-3 animate-bounce rounded-full [animation-delay:-0.3s]' />
          <div className='bg-primary size-3 animate-bounce rounded-full [animation-delay:-0.15s]' />
          <div className='bg-primary size-3 animate-bounce rounded-full' />
        </div>
      )}

      {!isLoading && (
        <div
          className={cn(
            'rounded-xl px-4 py-1.5 shadow-md',
            isUser ? 'bg-accent text-accent-foreground' : 'bg-violet-100',
          )}
        >
          <Markdown text={text} />
        </div>
      )}
    </div>
  );
}
