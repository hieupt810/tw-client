import { cn } from '@/lib/utils';

const MaxWidthContainer = ({
  id,
  children,
  className = '',
}: {
  children?: React.ReactNode;
  id?: React.HTMLProps<HTMLDivElement>['id'];
  className?: React.HTMLProps<HTMLDivElement>['className'];
}) => (
  <div
    id={id}
    className={cn(
      'border-grid container mx-auto max-w-7xl overflow-hidden border-x px-6 py-4',
      className,
    )}
  >
    {children}
  </div>
);

export default MaxWidthContainer;
