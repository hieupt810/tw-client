'use client';

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { IAttraction } from '@/types/IAttraction';

import SectionTitle from './section-title';

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
      className='mb-2 flex cursor-move items-center rounded-md bg-neutral-100 p-4 hover:bg-neutral-200'
    >
      <span className='mr-2'>=</span>
    </div>
  );
}

export default function DraggableList({
  className,
}: {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}) {
  const [items, setItems] = useState<IAttraction[]>([]);

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
          <div className='space-y-2'>
            {items.map((item) => (
              <SortableItem key={item.elementId} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
