'use client';

import { Loader2, SquarePen } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand';

import MaxWidthContainer from '@/components/max-width-container';
import { Button } from '@/components/ui/button';
import { cn, formatDate } from '@/lib/utils';
import { useChatStore } from '@/stores/chat';

import ChatPanel from './components/chat-panel';

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get('id');
  const {
    chatHistory,
    isLoadingChatHistory,
    resetAction,
    postChatAction,
    getChatHistoryAction,
  } = useStore(useChatStore, (state) => state);

  function handleNewChat(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    postChatAction();
    router.replace(`/chat?id=${uuidv4()}&new=true`);
  }

  useEffect(() => {
    if (chatHistory.length === 0) getChatHistoryAction();
    return () => {
      resetAction();
    };
  }, [chatHistory.length, getChatHistoryAction, resetAction]);

  return (
    <MaxWidthContainer
      id='chat'
      className='grid h-[calc(100svh-7rem)] w-full grid-cols-4 p-0'
    >
      <div className='border-grid relative col-span-1 hidden max-h-dvh w-full flex-col gap-2 overflow-x-hidden overflow-y-auto border-r md:flex'>
        <div className='border-grid absolute top-0 left-0 z-10 flex w-full items-center justify-between gap-2 border-b px-4 py-2.5'>
          <h3 className='ml-2 text-lg font-semibold tracking-tight select-none'>
            History
          </h3>
          <Button
            size='icon'
            variant='ghost'
            aria-label='New chat'
            onClick={handleNewChat}
          >
            <SquarePen />
          </Button>
        </div>

        <div className='mt-16 flex grow flex-col gap-1 px-3'>
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
                  item.id === chatId && 'text-primary !bg-violet-50/80',
                )}
              >
                Conversation at {formatDate(item.created_at)}
              </button>
            ))}

          {!isLoadingChatHistory && chatHistory.length === 0 && (
            <p className='py-5 text-center'>No recent chat</p>
          )}
        </div>
      </div>
      <ChatPanel />
    </MaxWidthContainer>
  );
}
