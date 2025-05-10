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
        'border-grid container mx-auto max-w-7xl overflow-hidden border-x px-6 py-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
