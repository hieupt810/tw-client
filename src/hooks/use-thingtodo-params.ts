import { ReadonlyURLSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { IPagingMeta } from '@/types/IPaging';
import { IThingToDoFilter } from '@/types/IThingToDo';

export const useThingToDoParams = (searchParams: ReadonlyURLSearchParams) => {
  return useMemo(() => {
    const params: IThingToDoFilter & Pick<IPagingMeta, 'page' | 'size'> = {
      page: 1,
      size: 8,
      search: null,
      subtypes: [],
      subcategories: [],
    };

    const raw = {
      page: searchParams.get('page'),
      size: searchParams.get('size'),
      search: searchParams.get('search'),
      rating: searchParams.get('rating'),
      subtypes: searchParams.get('subtypes'),
      subcategories: searchParams.get('subcategories'),
    };

    params.page = parseInt(raw.page || '1');
    params.size = parseInt(raw.size || '8');
    params.search = raw.search;
    params.subtypes = raw.subtypes ? raw.subtypes.split(',') : [];
    params.subcategories = raw.subcategories
      ? raw.subcategories.split(',')
      : [];
    params.rating = raw.rating ? parseFloat(raw.rating) : null;
    return { params, raw };
  }, [searchParams]);
};
