import { cn } from '@/lib/utils';

type Props = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function MaxWidthContainer({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        'bg-background container mx-auto h-full max-w-7xl overflow-hidden py-10',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
