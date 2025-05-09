import {
  AirVent,
  Cigarette,
  CigaretteOff,
  CircleEllipsis,
  ConciergeBell,
  Dumbbell,
  Plane,
  Refrigerator,
  SquareParking,
  Utensils,
  Wifi,
  Wine,
} from 'lucide-react';

type Props = {
  amentities: string[];
};

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
  }
  return null;
}

export default function Amentity({ amentities }: Props) {
  const amenitiesWithIcons = amentities.filter(
    (item) => getIcon(item) !== null,
  );
  const amenitiesWithoutIcons = amentities.filter(
    (item) => getIcon(item) === null,
  );

  const prioritizedAmenities = [
    ...amenitiesWithIcons,
    ...amenitiesWithoutIcons,
  ].slice(0, 26);

  return (
    <div className='grid grid-cols-2 gap-2'>
      {prioritizedAmenities.map((item) => {
        const Icon = getIcon(item) || CircleEllipsis;
        return (
          <div key={item} className='inline-flex items-center space-x-2'>
            <Icon size={20} strokeWidth={1.75} />
            <p className='max-w-36 truncate text-sm tracking-tight'>{item}</p>
          </div>
        );
      })}
    </div>
  );
}
