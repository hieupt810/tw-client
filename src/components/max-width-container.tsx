import { cn } from '@/lib/utils';

type Props = {
  children?: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export default function MaxWidthContainer({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn('container mx-auto max-w-6xl px-5 py-3', className)}
      {...props}
    >
      {children}
    </div>
  );
}
