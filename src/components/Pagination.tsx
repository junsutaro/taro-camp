// src/components/Paginations.tsx

'use client';

import {PaginationProps} from '@/types/paginationTypes';
import Button from './Button';

// const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage paginate }) => {
const Pagination = ({
  totalPages,
  currentPage,
  paginate,
}: PaginationProps): JSX.Element | null => {
  // const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages === 0) return null;

  return (
    <div className="pagination flex justify-center my-6">
      {pageNumbers.map(number => (
        <Button
          key={number}
          onClick={() => paginate(number)}
          variant={currentPage === number ? 'primary' : 'secondary'}>
          {number}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
