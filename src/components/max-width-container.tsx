import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export default function MaxWidthContainer({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn('container mx-auto max-w-7xl px-6 py-1', className)}
      {...props}
    >
      {children}
    </div>
  );
}
