'use client';

import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand';

import Message from '@/components/message';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth';
import { useChatStore } from '@/stores/chat';

const ChatPanel = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const isNewChat = searchParams.get('new') === 'true';

  const me = useStore(useAuthStore, (state) => state.me);
  const {
    error,
    messageHistory,
    isLoadingMessage,
    isLoadingResponse,
    postMessageAction,
    getMessageHistoryAction,
  } = useStore(useChatStore, (state) => state);

  console.log('isLoadingMessage', isLoadingMessage);
  console.log('messageHistory', messageHistory);

  const [text, setText] = useState<string>('');
  const boxChatRef = useRef<HTMLDivElement>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && text.trim() !== '') {
      e.preventDefault();
      postMessageAction(id, text);
      setText('');
    }
  };

  useEffect(() => {
    if (!id) {
      router.replace(`/chat?id=${uuidv4()}&new=true`);
    } else if (!isNewChat) {
      getMessageHistoryAction(id);
    }
  }, [id, isNewChat, getMessageHistoryAction, router]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div
      ref={boxChatRef}
      className='col-span-3 flex max-h-[calc(100svh-7.25rem)] w-full flex-col'
    >
      {isLoadingMessage && (
        <div className='flex grow items-center justify-center'>
          <Loader2 size={36} className='text-primary animate-spin' />
        </div>
      )}
      {!isLoadingMessage && (
        <div
          className={cn(
            'flex max-h-[calc(100vh-4rem)] grow flex-col-reverse gap-y-4 overflow-y-auto px-5 py-4',
            messageHistory.length === 0 && 'justify-center',
          )}
        >
          {isLoadingResponse && <Message isLoading />}
          {messageHistory.length > 0 &&
            messageHistory.map((item, index) => (
              <Message key={index} text={item.text} isUser={item.is_user} />
            ))}
          {messageHistory.length === 0 && (
            <div className='inline-flex items-center justify-center gap-2 text-2xl leading-tight font-semibold tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]'>
              <span>Hello,</span>
              {me ? (
                <span className='text-primary'>{me.name}</span>
              ) : (
                <Skeleton className='ml-1 h-8 w-48' />
              )}
            </div>
          )}
        </div>
      )}
      <div className='px-5 py-3'>
        <Input
          type='text'
          value={text}
          onKeyDown={onKeyDown}
          onChange={onInputChange}
          aria-label='Type your message'
          placeholder='Ask something...'
          disabled={isLoadingMessage || isLoadingResponse}
        />
      </div>
    </div>
  );
};

export default ChatPanel;
