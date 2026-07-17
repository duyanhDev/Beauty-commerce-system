type SortOrder = "ASC" | "DESC";

export interface QueryDTO {
  page: number;
  limit: number;
  keyword?: string;
  sortBy: string;
  order: SortOrder;
}
