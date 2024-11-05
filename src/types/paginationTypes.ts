// src/types/paginationTypes.ts

export interface PaginationProps {
  totalEntries: number;
  entriesPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}
