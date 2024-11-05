// src/components/Paginations.tsx

'use client';

import { PaginationProps } from "@/types/paginationTypes";

export default function Pagination({
  totalEntries,
  entriesPerPage,
  currentPage,
  paginate,
}: PaginationProps) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagintaion flex justify-center my-6">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`mx-1 px-4 py-2 rounded ${
            currentPage === number
              ? 'bg-lime-700 text-white'
              : 'bg-gray-200 text-gray-600'
          } hover:bg-lime-600 transition-colors`}>
          {number}
        </button>
      ))}
    </div>
  );
}
