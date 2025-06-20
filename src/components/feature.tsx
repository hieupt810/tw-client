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

import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

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
  features: string[];
};

export default function Feature({ features }: Props) {
  return (
    <div className='grid grid-cols-2 gap-x-4 gap-y-2.5'>
      {features.slice(0, 18).map((item) => {
        const Icon = getIcon(item) || CircleEllipsis;
        return (
          <Tooltip key={item}>
            <TooltipTrigger asChild>
              <div className='inline-flex items-center space-x-1.5'>
                <div>
                  <Icon size={18} />
                </div>
                <p className='max-w-full truncate text-sm tracking-tight md:text-base'>
                  {item}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent
              className='bg-white text-black shadow-sm'
              arrowClassName='bg-white fill-white'
              side='bottom'
              align='end'
            >
              {item}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
