'use client';

import { useState } from 'react';

import Markdown from '@/components/markdown';
import { Input } from '@/components/ui/input';
import { streamResponse } from '@/lib/utils';

export default function ChatPage() {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  async function handleRequestMessage() {
    setResponse('');
    for await (const chunk of streamResponse(input)) {
      setResponse((prev) => prev + chunk);
    }
  }

  return (
    <div>
      <Input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleRequestMessage} className='bg-violet-100 p-6'>
        Ask
      </button>
      <Markdown text={response} />
    </div>
  );
}
