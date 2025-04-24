import { SquarePen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { LOREM_IPSUM } from '@/constants';

import ChatPanel from './components/chat-panel';

export default function ChatPage() {
  return (
    <div id='chat' className='flex h-[calc(100vh-4rem)] w-full grid-cols-4'>
      <div className='relative hidden max-h-dvh basis-1/4 flex-col gap-2 overflow-x-hidden overflow-y-auto px-2 py-4 shadow-md md:flex'>
        <div className='absolute top-0 left-0 z-10 flex w-full items-center justify-between gap-2 px-5 py-2.5'>
          <h3 className='font-semibold tracking-wide'>History</h3>
          <Button variant='ghost' size='icon'>
            <SquarePen />
          </Button>
        </div>

        <div className='mt-10 flex grow flex-col gap-1'>
          {Array.from({ length: 20 }, (_, i) => (
            <button
              key={i}
              className='hover:bg-accent text-accent-foreground cursor-pointer truncate rounded-md px-3 py-1.5 text-sm select-none'
            >
              {LOREM_IPSUM}
            </button>
          ))}
        </div>
      </div>
      <ChatPanel />
    </div>
  );
}
