export interface PaginatedResponse<T> {
  data?: Array<T>;
  pagination?: {
    total: number;
    pageSize: number;
    current: number;
  };
}
