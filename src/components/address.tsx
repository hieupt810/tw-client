import { MapPin } from 'lucide-react';

interface Props {
  street: string | null;
  city: string;
  postalCode: string;
}

export default function Address({ street, city, postalCode }: Props) {
  return (
    <div className='text-muted-foreground flex items-center gap-1 text-sm capitalize md:gap-1.5 md:text-base'>
      <div>
        <MapPin size={20} />
      </div>
      {street ? (
        <span>{`${street}, ${city} ${postalCode}, Vietnam`}</span>
      ) : (
        <span>{`${city} ${postalCode}, Vietnam`}</span>
      )}
    </div>
  );
}
