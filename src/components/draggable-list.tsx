'use client';

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Loader2, Minus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useStore } from 'zustand';

import { cn } from '@/lib/utils';
import { HotelService } from '@/services/hotel';
import { RestaurantService } from '@/services/restaurant';
import { ThingToDoService } from '@/services/thing-to-do';
import { useTripStore } from '@/stores/trip-store';
import { IAttraction } from '@/types/IAttraction';
import { IHotel } from '@/types/IHotel';
import { IRestaurant } from '@/types/IRestaurant';
import { IThingToDo } from '@/types/IThingToDo';

import { HotelClass } from './hotel-class';
import ImageWithFallback from './image-with-fallback';
import { InteractedRating } from './interacted-rating';
import SectionTitle from './section-title';
import { SearchAndAddPlaceDialog } from './trip-dialog';
import { AspectRatio } from './ui/aspect-ratio';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

function SortableItem({
  item,
  onRemovePlaceFromTrip,
}: {
  elementId: string;
  item: IAttraction;
  onRemovePlaceFromTrip?: (placeId: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.element_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='flex w-full cursor-move flex-col items-center gap-2.5 overflow-hidden rounded-md bg-violet-50 hover:opacity-80 sm:flex-row'
    >
      <div className='w-full md:max-w-28 md:min-w-28'>
        <AspectRatio ratio={1 / 1}>
          <ImageWithFallback
            fill
            alt={item.name}
            src={item.image}
            sizes='30rem'
            className='object-cover object-center'
          />
        </AspectRatio>
      </div>
      <div className='flex grow flex-col justify-around gap-1'>
        <span className='text-sm leading-snug font-semibold tracking-tight md:text-base'>
          {item.name}
        </span>
        <span className='text-muted-foreground text-xs'>
          {item.street || item.city.name}
        </span>
        <div
          className={cn(
            'w-fit rounded-md px-2 py-0.5 text-xs text-white capitalize',
            item.type === 'HOTEL' && 'bg-orange-600',
            item.type === 'RESTAURANT' && 'bg-blue-600',
            item.type === 'THING-TO-DO' && 'bg-amber-600',
          )}
        >
          {item.type.toLowerCase().replace(/-/g, ' ')}
        </div>
      </div>
      <button
        className='mr-2 cursor-pointer overflow-hidden rounded-md p-2 hover:bg-red-400/80'
        style={{ pointerEvents: 'auto' }}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        onClick={() => {
          onRemovePlaceFromTrip?.(item.element_id);
        }}
      >
        <Minus size={16} />
      </button>
    </div>
  );
}

export default function DraggableList({
  elementId,
  isLoading,
  onOptimize,
  onSave,
  className,
}: {
  elementId: string;
  isLoading: boolean;
  onOptimize: () => Promise<void>;
  onSave: () => Promise<void>;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}) {
  const {
    removePlaceFromTrip,
    placesInTrip,
    setPlacesInTrip,
    fetchPlacesInTrip,
  } = useStore(useTripStore, (state) => state);
  const [openDialog, setOpenDialog] = useState(false);

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      const items = placesInTrip.item;
      const oldIndex = items.findIndex((item) => item.element_id === active.id);
      const newIndex = items.findIndex((item) => item.element_id === over.id);
      setPlacesInTrip(arrayMove(items, oldIndex, newIndex));
    }
  }

  const handleRemovePlaceFromTrip = useCallback(
    async (placeId: string) => {
      try {
        const res = await removePlaceFromTrip(elementId, placeId);
        toast.success(res.message || 'Place removed from trip successfully');
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('Failed to remove place from trip');
        }
      }
    },
    [elementId, removePlaceFromTrip],
  );

  return (
    <div
      className={cn(
        'flex h-[calc(100dvh-11.5rem)] flex-col justify-between overflow-hidden',
        className,
      )}
    >
      <div className='flex max-h-[calc(100%-3rem)] grow flex-col'>
        <SectionTitle text='Places' />
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={placesInTrip.item.map((item) => item.element_id)}
            strategy={verticalListSortingStrategy}
          >
            <div className='max-h-full space-y-3.5 overflow-x-hidden overflow-y-auto'>
              {placesInTrip.item.map((item) => (
                <Tooltip key={item.element_id}>
                  <TooltipTrigger asChild>
                    <div>
                      <SortableItem
                        key={item.element_id}
                        elementId={elementId}
                        item={item}
                        onRemovePlaceFromTrip={handleRemovePlaceFromTrip}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    align='center'
                    side='right'
                    className='z-[9999] bg-white text-black shadow-md drop-shadow-lg'
                    arrowClassName='bg-white fill-white max-w-[200px] '
                  >
                    <TooltipContentDetails key={item.element_id} item={item} />
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      <div className='flex h-9 flex-row items-center justify-between gap-2.5'>
        {isLoading && (
          <Loader2 size={16} className='stroke-primary animate-spin' />
        )}
        <Button variant='default' onClick={() => setOpenDialog(true)}>
          Add place
        </Button>
        <div className='flex flex-row items-center gap-2.5'>
          <Button
            variant='outline'
            size='default'
            onClick={onSave}
            disabled={isLoading}
            aria-disabled={isLoading}
          >
            Save changes
          </Button>
          <Button
            onClick={() => onOptimize()}
            disabled={isLoading}
            aria-disabled={isLoading}
          >
            Optimize Route
          </Button>
        </div>
      </div>

      <SearchAndAddPlaceDialog
        open={openDialog}
        onOpenChange={async (value) => {
          setOpenDialog(value);
          if (!value) {
            await fetchPlacesInTrip(elementId);
          }
        }}
        tripId={elementId}
      />
    </div>
  );
}

export const TooltipContentDetails = ({ item }: { item: IAttraction }) => {
  const [content, setContent] = useState<
    IHotel | IRestaurant | IThingToDo | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetDetails = async () => {
    setIsLoading(true);
    const savedContent = JSON.parse(
      sessionStorage.getItem('savedContent') || 'null',
    )?.[item.element_id];
    if (savedContent) {
      setContent(savedContent);
      setIsLoading(false);
      return;
    }

    // Implement the logic to get details of the attraction
    if (item.type === 'HOTEL') {
      const data = await HotelService.details(item.element_id);
      handleSaveContent(data);
    } else if (item.type === 'RESTAURANT') {
      const data = await RestaurantService.details(item.element_id);
      handleSaveContent(data);
    } else if (item.type === 'THING-TO-DO') {
      const data = await ThingToDoService.details(item.element_id);
      handleSaveContent(data);
    }
    setIsLoading(false);
  };

  const handleSaveContent = (data: IHotel | IRestaurant | IThingToDo) => {
    setContent(data);
    sessionStorage.setItem(
      'savedContent',
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem('savedContent') || '{}'),
        [data.element_id]: data,
      }),
    );
  };

  useEffect(() => {
    handleGetDetails();
  }, [item.element_id, handleGetDetails]);

  if (isLoading || !content) {
    return (
      <div className='max-w-xl'>
        <div className='mb-2 h-6 w-42 animate-pulse rounded bg-gray-200'></div>
        <div className='mb-3 flex items-center gap-2'>
          <div className='h-4 w-40 animate-pulse rounded bg-gray-200'></div>
          <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
        </div>
        <table className='w-full text-sm'>
          <tbody>
            {[...Array(4)].map((_, index) => (
              <tr key={index}>
                <td className='py-1 pr-3 align-top'>
                  <div className='h-4 w-32 animate-pulse rounded bg-gray-200'></div>
                </td>
                <td className='py-1'>
                  <div className='h-4 w-48 animate-pulse rounded bg-gray-200'></div>
                </td>
              </tr>
            ))}
            <tr>
              <td className='py-1 pr-3 align-top'>
                <div className='h-4 w-40 animate-pulse rounded bg-gray-200'></div>
              </td>
              <td className='py-1'>
                <div className='h-16 w-full animate-pulse rounded bg-gray-200'></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className='max-w-xl'>
      <h5 className='text-lg font-bold'>{content?.name}</h5>
      <div className='flex items-center gap-2 text-base'>
        <InteractedRating
          size='xs'
          interactive={false}
          value={content?.rating || 0}
        />
        ({(content?.rating || 0).toFixed(1)})
      </div>
      <table className='w-full text-sm'>
        <tbody>
          {content?.phone && (
            <tr>
              <td className='py-1 pr-3 align-top font-medium'>Contact:</td>
              <td className='py-1'>
                <strong>{content?.phone}</strong>
              </td>
            </tr>
          )}
          {content?.type === 'RESTAURANT' && (
            <tr>
              <td className='py-1 pr-3 align-top font-medium'>Menu type:</td>
              <td className='py-1'>
                {(content as IRestaurant)?.meal_types.join(', ')}
              </td>
            </tr>
          )}
          {(content as IThingToDo)?.subcategories && (
            <tr>
              <td className='py-1 pr-3 align-top font-medium'>Categories:</td>
              <td className='py-1'>
                {(content as IThingToDo)?.subcategories.join(', ')}
              </td>
            </tr>
          )}
          {(content as IThingToDo)?.subtypes && (
            <tr>
              <td className='py-1 pr-3 align-top font-medium'>Types:</td>
              <td className='py-1'>
                {(content as IThingToDo)?.subtypes.join(', ')}
              </td>
            </tr>
          )}
          {(content as IRestaurant)?.features && (
            <tr>
              <td className='py-1 pr-3 align-top font-medium'>Amenities:</td>
              <td className='py-1'>
                {(content as IRestaurant)?.features.join(', ')}
              </td>
            </tr>
          )}
          {(content as IHotel)?.hotel_class && (
            <tr>
              <td className='py-1 pr-3 align-top font-medium'>Class:</td>
              <td className='py-1'>
                <HotelClass levelClass={(content as IHotel)?.hotel_class} />
              </td>
            </tr>
          )}
          <tr>
            <td className='py-1 pr-3 align-top font-medium'>Description:</td>
            <td className='py-1'>{content?.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
