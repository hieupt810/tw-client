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
      className={cn(
        'border-grid container mx-auto max-w-7xl overflow-hidden border-x px-6',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
