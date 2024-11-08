import {useState} from 'react';

interface usePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
}

// itemsPerPage랑 data를 받아서 로직을 처리한다음 Pagination.tsx로 보내주는 역할인가?
export const usePagination = <T>({ 
  data,
  itemsPerPage,
}: usePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // pageNumber 받아서 상태 업데이트
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber); 

  return {currentPage, totalPages, currentData, paginate};
};
