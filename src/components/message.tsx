import Image from 'next/image';

import { cn } from '@/lib/utils';

import Markdown from './markdown';

type Props = {
  text: string;
  isUser?: boolean;
};

export default function Message({ text, isUser = false }: Props) {
  return (
    <div
      className={cn(
        'flex w-full items-start gap-2',
        isUser ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <div className='py-1'>
        <div className='size-10 overflow-hidden rounded-full shadow-md'>
          <Image
            src={isUser ? 'https://github.com/shadcn.png' : '/robot.jpeg'}
            alt={isUser ? 'User' : 'Assistant'}
            width={500}
            height={500}
          />
        </div>
      </div>

      <div
        className={cn(
          'rounded-xl px-4 py-2.5 shadow-md',
          isUser ? 'bg-accent text-accent-foreground' : 'bg-violet-100',
        )}
      >
        <Markdown text={text} />
      </div>
    </div>
  );
}
