'use client';

import { SquarePen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { v4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { LOREM_IPSUM } from '@/constants';
import { useChatStore } from '@/stores/chat-store';

import ChatPanel from './components/chat-panel';

export default function ChatPage() {
  const router = useRouter();
  const { chat, newChat, getChatList } = useChatStore();

  useEffect(() => {
    getChatList();
  }, [getChatList]);

  function handleNewChat(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    newChat();

    // Generate a new chat ID
    const newChatId = v4();
    const params = new URLSearchParams(window.location.search);
    params.set('id', newChatId);

    // Update the URL with the new chat ID
    router.replace(`/chat?${params.toString()}`);
  }

  function handleClickChat(id: string) {
    const params = new URLSearchParams(window.location.search);
    params.set('id', id);

    // Replace the current URL with the new one
    router.replace(`/chat?${params.toString()}`);
  }

  return (
    <Suspense>
      <div id='chat' className='flex h-[calc(100vh-4rem)] w-full grid-cols-4'>
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
            {chat && chat.length > 0 ? (
              chat.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClickChat(item.id)}
                  aria-label={`Chat ${item.id}`}
                  className='hover:bg-accent text-accent-foreground cursor-pointer truncate rounded-md px-3 py-1.5 text-sm select-none'
                >
                  {LOREM_IPSUM}
                </button>
              ))
            ) : (
              <p className='py-5 text-center text-sm'>No recent chat</p>
            )}
          </div>
        </div>
        <ChatPanel />
      </div>
    </Suspense>
  );
}
