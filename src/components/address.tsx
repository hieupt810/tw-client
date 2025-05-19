import { MapPin } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  street: string | null;
  city: string;
  postalCode: string;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export default function Address({
  street,
  city,
  postalCode,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'text-muted-foreground flex items-center gap-0.5 text-sm capitalize md:text-base',
        className,
      )}
    >
      <div>
        <MapPin size={16} />
      </div>
      {street ? (
        <span>{`${street}, ${city} ${postalCode}, Vietnam`.trim()}</span>
      ) : (
        <span>{`${city} ${postalCode}, Vietnam`.trim()}</span>
      )}
    </div>
  );
}
