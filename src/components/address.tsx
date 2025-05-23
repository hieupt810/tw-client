import { MapPin } from 'lucide-react';

interface Props {
  city: string;
  street: string | null;
}

export default function Address({ street, city }: Props) {
  return (
    <div className='text-muted-foreground flex items-start gap-1 text-sm capitalize md:text-base'>
      <div className='mt-0.5'>
        <MapPin size={20} />
      </div>
      <span>{street ? street : city}</span>
    </div>
  );
}
