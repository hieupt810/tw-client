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
import { useStore } from 'zustand';

import { cn } from '@/lib/utils';
import { useTripStore } from '@/stores/trip-store';
import { IAttraction } from '@/types/IAttraction';

import ImageWithFallback from './image-with-fallback';
import SectionTitle from './section-title';
import { AspectRatio } from './ui/aspect-ratio';
import { Button } from './ui/button';

function SortableItem({ item }: { elementId: string; item: IAttraction }) {
  const {} = useStore(useTripStore, (state) => state);

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
      <button className='mr-2 cursor-pointer overflow-hidden rounded-md p-2 hover:bg-red-400/80'>
        <Minus size={16} />
      </button>
    </div>
  );
}

export default function DraggableList({
  elementId,
  isLoading,
  items,
  setItems,
  onOptimize,
  onSave,
  className,
}: {
  elementId: string;
  isLoading: boolean;
  items: IAttraction[];
  setItems: React.Dispatch<React.SetStateAction<IAttraction[]>>;
  onOptimize: () => Promise<void>;
  onSave: () => Promise<void>;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}) {
  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex(
          (item) => item.element_id === active.id,
        );
        const newIndex = prevItems.findIndex(
          (item) => item.element_id === over.id,
        );
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  }

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
            items={items.map((item) => item.element_id)}
            strategy={verticalListSortingStrategy}
          >
            <div className='max-h-full space-y-3.5 overflow-x-hidden overflow-y-auto'>
              {items.map((item) => (
                <SortableItem
                  key={item.element_id}
                  elementId={elementId}
                  item={item}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      <div className='flex h-9 flex-row items-center justify-end gap-2.5'>
        {isLoading && (
          <Loader2 size={16} className='stroke-primary animate-spin' />
        )}
        <Button
          variant='outline'
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
  );
}
