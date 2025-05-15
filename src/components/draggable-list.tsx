'use client';

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grip } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Constant } from '@/constants';
import { cn } from '@/lib/utils';
import { IAttraction } from '@/types/IAttraction';

import SectionTitle from './section-title';
import { AspectRatio } from './ui/aspect-ratio';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

function SortableItem({
  item,
  color = 'green',
}: {
  item: IAttraction;
  color?: 'violet' | 'green' | 'red';
}) {
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
      className='flex w-full cursor-move flex-col items-center gap-2 rounded-lg bg-violet-50 px-5 py-3.5 hover:opacity-80 sm:flex-row md:gap-5'
    >
      <div className='w-full lg:max-w-40'>
        <AspectRatio ratio={4 / 3}>
          <Image
            fill
            alt={item.name}
            src={item.image}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='rounded-lg object-cover object-center'
          />
        </AspectRatio>
      </div>
      <div className='flex w-full grow flex-col gap-2'>
        <div className='flex flex-row items-center gap-2.5'>
          <Image
            src={
              color === 'violet'
                ? Constant.MARKER_ICON_URL.VIOLET
                : color === 'green'
                  ? Constant.MARKER_ICON_URL.GREEN
                  : Constant.MARKER_ICON_URL.RED
            }
            alt={
              color === 'violet'
                ? 'Violet Marker'
                : color === 'green'
                  ? 'Green Marker'
                  : 'Red Marker'
            }
            width={100}
            height={100}
            className='h-auto w-4'
          />
          <span className='font-semibold tracking-tight md:text-lg lg:text-xl'>
            {item.name}
          </span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-muted-foreground text-xs md:text-sm'>{`${item.street}, ${item.city.name} ${item.city.postalCode}`}</span>
          <div className='flex items-end'>
            <Badge
              className={cn(
                'capitalize',
                item.type === 'HOTEL' && 'bg-orange-600',
                item.type === 'RESTAURANT' && 'bg-blue-600',
                item.type === 'THING-TO-DO' && 'bg-amber-600',
              )}
            >
              {item.type.toLowerCase()}
            </Badge>
          </div>
        </div>
      </div>
      <div className='hidden md:block'>
        <Grip />
      </div>
    </div>
  );
}

export default function DraggableList({
  baseItems,
  className,
}: {
  baseItems: IAttraction[];
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}) {
  const [items, setItems] = useState<IAttraction[]>(baseItems);

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
      <SectionTitle text='Trip Places' />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((item) => item.elementId)}
          strategy={verticalListSortingStrategy}
        >
          <div className='space-y-4'>
            {items.map((item, index) => (
              <SortableItem
                key={item.elementId}
                item={item}
                color={
                  index === 0
                    ? 'violet'
                    : index !== items.length - 1
                      ? 'green'
                      : 'red'
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className='mt-4 ml-auto'>
        <Button variant='outline' disabled={items === baseItems}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
