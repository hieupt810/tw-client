'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';

import Markdown from './markdown';

type Props = {
  text: string;
  isUser?: boolean;
};

export default function Message({ text, isUser = false }: Props) {
  const { user } = useAuthStore();

  return (
    <div
      className={cn(
        'flex w-full items-start gap-2',
        isUser ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <div className='size-8 overflow-hidden rounded-full shadow-md'>
        <Image
          src={isUser && user ? user.avatar : '/robot.jpeg'}
          alt={isUser && user ? user.name : 'Assistant'}
          width={1000}
          height={1000}
        />
      </div>

      <div
        className={cn(
          'rounded-xl px-4 py-1.5 shadow-md',
          isUser ? 'bg-accent text-accent-foreground' : 'bg-violet-100',
        )}
      >
        <Markdown text={text} />
      </div>
    </div>
  );
}
