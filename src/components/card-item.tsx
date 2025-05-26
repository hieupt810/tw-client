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
    <div className='group relative flex cursor-pointer flex-col select-none'>
      <Link
        href={`/${item.type.toLowerCase()}/${item.element_id}`}
        className='relative flex flex-col transition-colors group-hover:opacity-90'
      >
        <AspectRatio ratio={1 / 1}>
          <ImageWithFallback
            fill
            priority
            sizes='30rem'
            quality={100}
            src={item.image}
            alt={`Thumbnail of ${item.name}`}
            className='rounded-md object-cover object-center group-hover:opacity-80'
          />
        </AspectRatio>
        <h3 className='mt-2 max-w-full truncate font-semibold tracking-tight underline-offset-4 group-hover:underline'>
          {item.name}
        </h3>
        <Rating
          rating={item.rating}
          ratingHistorgram={item.rating_histogram}
          className='group-hover:opacity-90'
        />
      </Link>
      <div className='absolute top-2 right-2 z-10 flex items-center gap-1.5'>
        <AddTripButton elementId={item.element_id} iconOnly />
        <SavePlaceButton
          elementId={item.element_id}
          isFavorite={item.is_favorite}
          iconOnly
        />
      </div>
    </div>
  );
}
