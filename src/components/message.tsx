import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';

type MessageProps = {
  isUserMessage?: boolean;
  content: string;
};

export default function Message({
  isUserMessage = false,
  content,
}: MessageProps) {
  return (
    <div
      className={cn(
        'flex w-full items-start gap-2',
        isUserMessage ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <div className='size-12 overflow-hidden rounded-full shadow-md'>
        {!isUserMessage ? (
          <Image
            src={'/robot.jpeg'}
            alt='Chatbot avatar'
            width={100}
            height={100}
          />
        ) : (
          <Image
            src={'https://github.com/shadcn.png'}
            alt='Chatbot avatar'
            width={100}
            height={100}
          />
        )}
      </div>

      <div
        className={cn(
          'w-fit rounded-xl px-4 py-2.5 shadow-md',
          isUserMessage ? 'bg-accent text-accent-foreground' : 'bg-violet-100',
        )}
      >
        <div className='prose prose-sm md:prose-base'>
          {isUserMessage ? (
            <p>{content}</p>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
