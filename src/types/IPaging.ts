export interface IPaging<T> {
  data: T[];
  paging: IPagingMeta;
}

export interface IPagingMeta {
  offset: number;
  page: number;
  pageCount: number;
  size: number;
  totalCount: number;
}

export const defaultPaging: IPagingMeta = {
  offset: 0,
  page: 0,
  pageCount: 0,
  size: 0,
  totalCount: 0,
};

export interface ISearch<T> {
  data: T[];
  total: number;
}
