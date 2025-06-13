'use client';

import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import Message from '@/components/message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';

const HELLO_MESSAGE =
  'Hello! I am your knowledgeable assistant specializing in tourism in Da Nang, Vietnam. What can I help you with today?';

interface IMessage {
  parts: [
    {
      text?: string;
      function_call?: {
        args: object;
        name: string;
      };
      function_response?: {
        name: string;
        response: {
          result: { id: string; name: string }[];
        };
      };
    },
  ];
  role: 'user' | 'model';
}

export default function ChatPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>('');
  const [contents, setContents] = useState<IMessage[]>([]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        behavior: 'smooth',
        top: ref.current.scrollHeight,
      });
    }
  }, [contents]);

  async function handleRequestMessage() {
    const message: IMessage = { parts: [{ text: input }], role: 'user' };
    setContents((prev) => [...prev, message]);
    setInput('');

    const response = await api
      .post('conversations/', {
        json: { contents: [...contents, message] },
      })
      .json<{ contents: IMessage[] }>();

    setContents(response.contents);
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
        <Message text={HELLO_MESSAGE} />
        {contents.map((message, index) => {
          const hasText = message.parts[0]?.text;
          const hasFunctionCall = message.parts[0]?.function_call;
          const hasFunctionResponse = message.parts[0]?.function_response;

          if (!hasFunctionCall && !hasFunctionResponse && hasText) {
            return (
              <Message
                key={index}
                text={hasText}
                isUser={message.role === 'user'}
              />
            );
          }
          return null;
        })}
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
