'use client';

import { useRef } from 'react';

import Message from '@/components/message';
import { Input } from '@/components/ui/input';
import { LOREM_IPSUM_MARKDOWN } from '@/constants';

export default function ChatPage() {
  const boxChatRef = useRef<HTMLDivElement>(null);

  return (
    <div id='chat' className='flex h-[calc(100vh-4rem)] w-full grid-cols-4'>
      {/* Left panel */}
      <div className='bg-accent text-accent-foreground max-h-dvh basis-1/4 p-6'>
        Left
      </div>
      {/* End of Left panel */}

      {/* Right panel */}
      <div ref={boxChatRef} className='flex max-h-dvh basis-3/4 flex-col'>
        {/* Top */}
        <div className='flex max-h-[calc(100vh-4rem)] flex-col-reverse gap-y-4 overflow-y-auto p-6'>
          <Message content={LOREM_IPSUM_MARKDOWN} />
          <Message
            isUser
            content='Please briefly explain why I should visit the Dragon Bridge in Da Nang.'
          />
          <Message content={LOREM_IPSUM_MARKDOWN} />
          <Message
            isUser
            content='Please briefly explain why I should visit the Dragon Bridge in Da Nang.'
          />
        </div>
        {/* End of Top */}

        {/* Bottom */}
        <div className='px-6 py-3'>
          <Input placeholder='Ask something...' />
        </div>
        {/* End of Bottom */}
      </div>
      {/* End of Right panel */}
    </div>
  );
}
