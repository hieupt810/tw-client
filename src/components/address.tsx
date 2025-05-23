import { MapPin } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  city: string;
  street: string | null;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export default function Address({ street, city, className }: Props) {
  return (
    <div
      className={cn(
        'text-muted-foreground flex items-start gap-1 text-sm capitalize md:text-base',
        className,
      )}
    >
      <div className='mt-1'>
        <MapPin size={16} />
      </div>
      <span>{street ? street : city}</span>
    </div>
  );
}
