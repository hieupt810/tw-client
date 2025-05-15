'use client';

import { useCallback, useEffect, useState } from 'react';

import { getRecentlyViewed } from '@/lib/utils';
import { HotelService } from '@/services/hotel';
import { IAttraction } from '@/types/IAttraction';
import { ISavedAttraction } from '@/types/ISavedAttraction';

import PlaceCarousel from './place-carousel';

interface Props {
  className?: React.HTMLAttributes<HTMLElement>['className'];
}
export default function RecentlyViewedItems({ className }: Props) {
  const [recentItems, setRecentItems] = useState<IAttraction[]>([]);

  const fetchRecentlyViewed = useCallback(async function () {
    const ids = getRecentlyViewed();
    if (!ids.length) return;

    // Fetch the recently viewed items from the API
    try {
      const results = await Promise.all(
        ids.map((item: ISavedAttraction) => {
          return HotelService.shortDetails(item.elementId);
        }),
      );
      setRecentItems(results.map((res) => res));
    } catch {}
  }, []);

  useEffect(() => {
    fetchRecentlyViewed();
  }, [fetchRecentlyViewed]);

  if (!recentItems.length) return null;

  return (
    <PlaceCarousel
      title='Recently viewed'
      items={recentItems}
      className={className}
    />
  );
}
