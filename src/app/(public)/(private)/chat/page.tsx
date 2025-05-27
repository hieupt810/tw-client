'use client';

import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import Message from '@/components/message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';

const HELLO_MESSAGE =
  'Hello! I am your knowledgeable assistant specializing in tourism in Da Nang, Vietnam. What can I help you with today?';

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
    const response = await api
      .post('conversations/', { json: { message: input } })
      .json<{ message: string }>();
    setHistory((prev) => [...prev, { text: response.message, isUser: false }]);
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
