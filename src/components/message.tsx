'use client';

import { useStore } from 'zustand';

import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth';

import ImageWithFallback from './image-with-fallback';
import Markdown from './markdown';
import { AspectRatio } from './ui/aspect-ratio';

type Props = {
  text?: string;
  isUser?: boolean;
};

export default function Message({ text = '', isUser = false }: Props) {
  const me = useStore(useAuthStore, (state) => state.me);

  return (
    <div
      className={cn(
        'flex w-full items-start',
        isUser ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <div className='border-primary size-10 overflow-hidden rounded-full border'>
        {isUser ? (
          <AspectRatio ratio={1 / 1}>
            <ImageWithFallback
              fill
              alt={me ? me.fullName : 'User'}
              src={me && me.avatar ? me.avatar : '/fallback-avatar.jpg'}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </AspectRatio>
        ) : (
          <AspectRatio ratio={1 / 1}>
            <ImageWithFallback
              fill
              alt='Assistant'
              src='/robot.jpeg'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </AspectRatio>
        )}
      </div>
      <div
        className={cn(
          'rounded-md px-4',
          isUser && 'mr-4 bg-violet-100 px-4 py-2.5',
        )}
      >
        <Markdown text={text} />
      </div>
    </div>
  );
}
