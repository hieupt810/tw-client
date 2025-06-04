import { cn } from '@/lib/utils';

interface Props {
  text: string;
  className?: React.HTMLAttributes<HTMLElement>['className'];
}

export default function SectionTitle({ text, className }: Props) {
  return (
    <span
      className={cn(
        'mb-4 text-lg font-bold tracking-tight capitalize md:text-xl',
        className,
      )}
    >
      {text}
    </span>
  );
}
