'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import Message from '@/components/message';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/stores/auth-store';
import { useChatStore } from '@/stores/chat-store';

export default function ChatPanel() {
  const { user } = useAuthStore();
  const { isLoading, messages, getChatMessages } = useChatStore();
  const boxChatRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';

  useEffect(() => {
    if (id) {
      getChatMessages(id);
    }
  }, [id]);

  return (
    <div
      ref={boxChatRef}
      className='flex max-h-dvh w-full flex-col md:basis-3/4'
    >
      <div className='flex max-h-[calc(100vh-4rem)] grow flex-col-reverse gap-y-4 overflow-y-auto px-5 py-4'>
        {id ? (
          messages.map((message) => (
            <Message
              key={message.id}
              text={message.text}
              isUser={message.is_user}
            />
          ))
        ) : (
          <div className='inline-flex items-center justify-center gap-1 text-2xl/relaxed font-semibold tracking-wide'>
            <span>Hello,</span>
            {user ? (
              <span className='text-primary'>{user.name}</span>
            ) : (
              <Skeleton className='ml-1 h-8 w-48' />
            )}
          </div>
        )}
      </div>
      <form className='px-5 py-3'>
        <Input
          type='text'
          disabled={isLoading}
          placeholder='Ask something...'
        />
      </form>
    </div>
  );
}
