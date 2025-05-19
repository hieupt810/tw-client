import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';

interface Props {
  text: string;
  className?: React.HTMLProps<HTMLDivElement>['className'];
}

export default function Markdown({ text, className }: Props) {
  return (
    <div className={cn('prose prose-sm md:prose-base text-justify', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
}
