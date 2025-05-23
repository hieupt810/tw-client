import Link from 'next/link';

import { IAttraction } from '@/types/IAttraction';

import AddTripButton from './add-trip-button';
import ImageWithFallback from './image-with-fallback';
import Rating from './rating';
import SavePlaceButton from './save-place-button';
import { AspectRatio } from './ui/aspect-ratio';

interface Props {
  item: IAttraction;
}

export default function CardItem({ item }: Props) {
  return (
    <div className='group flex cursor-pointer flex-col select-none'>
      <AspectRatio ratio={1 / 1} className='relative'>
        <ImageWithFallback
          fill
          priority
          sizes='30rem'
          quality={100}
          src={item.image}
          alt={`Thumbnail of ${item.name}`}
          className='rounded-md object-cover object-center group-hover:opacity-80'
        />
        <div className='absolute top-2 right-2 flex items-center gap-1.5'>
          <AddTripButton elementId={item.elementId} iconOnly />
          <SavePlaceButton elementId={item.elementId} iconOnly />
        </div>
      </AspectRatio>
      <Link
        href={`/${item.type.toLowerCase()}/${item.elementId}`}
        className='flex flex-col group-hover:opacity-80'
      >
        <h3 className='mt-2 max-w-full truncate font-semibold tracking-tight underline-offset-4 group-hover:underline'>
          {item.name}
        </h3>
        <Rating rating={item.rating} ratingHistorgram={item.ratingHistogram} />
      </Link>
    </div>
  );
}
