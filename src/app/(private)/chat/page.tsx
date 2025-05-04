'use client';

import { Loader2, SquarePen } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand';

import { Button } from '@/components/ui/button';
import { cn, formatDate } from '@/lib/utils';
import { useChatStore } from '@/stores/chat';

import ChatPanel from './components/chat-panel';

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the chat id from the URL
  const chatId = searchParams.get('id');

  // Global states
  const reset = useStore(useChatStore, (state) => state.reset);
  const newChat = useStore(useChatStore, (state) => state.newChat);
  const getChatHistory = useStore(
    useChatStore,
    (state) => state.getChatHistory,
  );
  const chatHistory = useStore(useChatStore, (state) => state.chatHistory);
  const isLoadingChatHistory = useStore(
    useChatStore,
    (state) => state.isLoadingChatHistory,
  );

  function handleNewChat(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    newChat();
    router.replace(`/chat?id=${uuidv4()}&new=true`);
  }

  useEffect(() => {
    if (chatHistory.length === 0) {
      getChatHistory();
    }

    return () => {
      reset();
    };
  }, [getChatHistory]);

  return (
    <Suspense>
      <div id='chat' className='flex h-[calc(100vh-3.5rem)] w-full grid-cols-4'>
        <div className='relative hidden max-h-dvh basis-1/4 flex-col gap-2 overflow-x-hidden overflow-y-auto px-2 py-4 shadow-md md:flex'>
          <div className='absolute top-0 left-0 z-10 flex w-full items-center justify-between gap-2 px-5 py-2.5'>
            <h3 className='font-semibold tracking-wide'>History</h3>
            <Button
              size='icon'
              variant='ghost'
              aria-label='New chat'
              onClick={handleNewChat}
            >
              <SquarePen />
            </Button>
          </div>

          <div className='mt-10 flex grow flex-col gap-1'>
            {isLoadingChatHistory && (
              <div className='flex grow items-center justify-center'>
                <Loader2 size={36} className='text-primary animate-spin' />
              </div>
            )}

            {!isLoadingChatHistory &&
              chatHistory.length > 0 &&
              chatHistory.map((item) => (
                <button
                  key={item.id}
                  aria-label={`Open chat ${item.id}`}
                  onClick={() => router.replace(`/chat?id=${item.id}`)}
                  className={cn(
                    'hover:bg-accent text-accent-foreground cursor-pointer truncate rounded-md px-3 py-1.5 text-justify text-sm select-none',
                    item.id === chatId && 'text-primary font-semibold',
                  )}
                >
                  Conversation {formatDate(item.created_at)}
                </button>
              ))}

            {!isLoadingChatHistory && chatHistory.length === 0 && (
              <p className='py-5 text-center'>No recent chat</p>
            )}
          </div>
        </div>
        <ChatPanel />
      </div>
    </Suspense>
  );
}
