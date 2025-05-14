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
