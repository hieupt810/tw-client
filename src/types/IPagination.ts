export type IPagination<T> = {
  data: T[];
  pagination: {
    current_page: number;
    next_page: number | null;
    per_page: number;
    prev_page: number | null;
    total_pages: number;
    total_records: number;
  };
};
