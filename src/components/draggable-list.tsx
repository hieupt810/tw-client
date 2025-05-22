'use client';

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grip, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { IAttraction } from '@/types/IAttraction';

import ImageWithFallback from './image-with-fallback';
import SectionTitle from './section-title';
import { AspectRatio } from './ui/aspect-ratio';
import { Button } from './ui/button';

function SortableItem({ item }: { item: IAttraction }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.elementId });

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
      <div className='w-full lg:max-w-28'>
        <AspectRatio ratio={1 / 1}>
          <ImageWithFallback
            fill
            alt={item.name}
            src={item.image}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
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
      <div className='mr-3.5 hidden md:block'>
        <Grip size={16} />
      </div>
    </div>
  );
}

export default function DraggableList({
  isLoading,
  items,
  setItems,
  onOptimize,
  onSave,
  className,
}: {
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
          (item) => item.elementId === active.id,
        );
        const newIndex = prevItems.findIndex(
          (item) => item.elementId === over.id,
        );
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <SectionTitle text='Places' />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((item) => item.elementId)}
          strategy={verticalListSortingStrategy}
        >
          <div className='max-h-[45rem] space-y-4 overflow-x-hidden overflow-y-auto'>
            {items.map((item) => (
              <SortableItem key={item.elementId} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className='mt-4 flex flex-row items-center justify-end gap-2.5'>
        {isLoading && (
          <Loader2 size={16} className='stroke-primary animate-spin' />
        )}
        <Button
          onClick={() => onOptimize()}
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          Optimize Route
        </Button>
        <Button
          variant='outline'
          onClick={onSave}
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
