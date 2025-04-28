'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

import Message from '@/components/message';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/stores/auth-store';
import { useChatStore } from '@/stores/chat-store';

export default function ChatPanel() {
  const { user } = useAuthStore();
  const { isLoading, messages, newMessage, getChatMessages } = useChatStore();

  const [text, setText] = useState<string>('');
  const boxChatRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';

  useEffect(() => {
    setText('');
    if (id) {
      getChatMessages(id);
    } else {
      // Generate a new chat ID
      const newChatId = v4();
      const params = new URLSearchParams(window.location.search);
      params.set('id', newChatId);

      // Update the URL with the new chat ID
      router.replace(`/chat?${params.toString()}`);
    }
  }, [id]);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setText(e.target.value);
  }

  function onKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && text.trim()) {
      if (id) {
        newMessage(text, id);
      }

      // Clear the input
      setText('');
      if (boxChatRef.current) {
        boxChatRef.current.scrollTop = boxChatRef.current.scrollHeight;
      }
    }
  }

  return (
    <div
      ref={boxChatRef}
      className='flex max-h-dvh w-full flex-col md:basis-3/4'
    >
      <div className='flex max-h-[calc(100vh-4rem)] grow flex-col-reverse gap-y-4 overflow-y-auto px-5 py-4'>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Message key={index} text={message.text} isUser={message.is_user} />
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
      <div className='px-5 py-3'>
        <Input
          type='text'
          disabled={isLoading}
          aria-label='Ask something...'
          placeholder='Ask something...'
          value={text}
          onKeyDown={onKeyPress}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
}
