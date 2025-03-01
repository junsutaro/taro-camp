// src/components/Paginations.tsx

import {PaginationProps} from '@/types/paginationTypes';
import Link from 'next/link';

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`/board?page=${page}`} // ✅ Next.js의 searchParams를 활용
          className={`px-4 py-2 mx-1 border ${currentPage === page ? "bg-green-800 text-white" : "bg-gray-200"}`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
}