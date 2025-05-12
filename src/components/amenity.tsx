import {
  AirVent,
  Bath,
  Cigarette,
  CigaretteOff,
  CircleEllipsis,
  Coffee,
  ConciergeBell,
  Dumbbell,
  Plane,
  Refrigerator,
  SquareParking,
  Tv,
  Utensils,
  Wifi,
  Wine,
} from 'lucide-react';

function getIcon(content: string) {
  const lowerContent = content.toLowerCase();
  switch (true) {
    case lowerContent.includes('parking'):
      return SquareParking;
    case lowerContent.includes('wifi') || lowerContent.includes('internet'):
      return Wifi;
    case lowerContent.includes('restaurant') ||
      lowerContent.includes('breakfast') ||
      lowerContent.includes('dining'):
      return Utensils;
    case lowerContent.includes('refrigerator'):
      return Refrigerator;
    case lowerContent.includes('bar'):
      return Wine;
    case lowerContent.includes('concierge'):
      return ConciergeBell;
    case lowerContent.includes('fitness'):
      return Dumbbell;
    case lowerContent.includes('non-smoking'):
      return CigaretteOff;
    case lowerContent.includes('smoking'):
      return Cigarette;
    case lowerContent.includes('airport'):
      return Plane;
    case lowerContent.includes('air conditioning'):
      return AirVent;
    case lowerContent.includes('coffee'):
      return Coffee;
    case lowerContent.includes('bath'):
      return Bath;
    case lowerContent.includes('tv'):
      return Tv;
  }
  return null;
}

type Props = {
  amenities: string[];
};

export default function Amenity({ amenities }: Props) {
  const amenitiesWithIcons = amenities.filter((item) => getIcon(item) !== null);
  const amenitiesWithoutIcons = amenities.filter(
    (item) => getIcon(item) === null,
  );

  const prioritizedAmenities = [
    ...amenitiesWithIcons,
    ...amenitiesWithoutIcons,
  ].slice(0, 18);

  return (
    <div className='grid grid-cols-2 gap-2'>
      {prioritizedAmenities.map((item) => {
        const Icon = getIcon(item) || CircleEllipsis;
        return (
          <div key={item} className='inline-flex items-center space-x-2'>
            <Icon size={20} strokeWidth={1.75} />
            <p className='max-w-48 truncate text-sm tracking-tight'>{item}</p>
          </div>
        );
      })}
    </div>
  );
}
