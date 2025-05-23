'use client';

import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import Message from '@/components/message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { streamResponse } from '@/lib/utils';

const HELLO_MESSAGE =
  "Hello! I'm your enthusiastic guide to the wonders of Vietnam! I'm here to help you plan an unforgettable adventure, filled with stunning landscapes, rich culture, delicious food, and warm hospitality. Whether you're dreaming of bustling city streets, tranquil beaches, ancient temples, or vibrant markets, I'm ready to share my knowledge and help you discover the very best of Vietnam. So, where in Vietnam does your heart long to explore? Let's start planning your dream trip!";

interface IChat {
  text: string;
  isUser: boolean;
}

export default function ChatPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<IChat[]>([
    { text: HELLO_MESSAGE, isUser: false },
  ]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        behavior: 'smooth',
        top: ref.current.scrollHeight,
      });
    }
  }, [history]);

  async function handleRequestMessage() {
    setHistory((prev) => [...prev, { text: input, isUser: true }]);
    setInput('');
    let botMessage = '';
    for await (const chunk of streamResponse(input)) {
      botMessage += chunk;
      setHistory((prev) => {
        if (prev.length && !prev[prev.length - 1].isUser) {
          return [
            ...prev.slice(0, -1),
            { ...prev[prev.length - 1], text: botMessage },
          ];
        } else {
          return [...prev, { text: botMessage, isUser: false }];
        }
      });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && input.trim()) {
      handleRequestMessage();
    }
  }

  return (
    <div className='flex grow flex-col gap-4 py-10'>
      <div
        ref={ref}
        className='flex max-h-[75dvh] grow flex-col gap-4 overflow-y-auto px-10 pb-4'
      >
        {history.map((message, index) => (
          <Message key={index} text={message.text} isUser={message.isUser} />
        ))}
      </div>
      <div className='flex flex-row items-center justify-center gap-4 px-10'>
        <Input
          value={input}
          onKeyDown={handleKeyDown}
          placeholder='Ask me anything...'
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          size='icon'
          disabled={!input.trim()}
          onClick={handleRequestMessage}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}
