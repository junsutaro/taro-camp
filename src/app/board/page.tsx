// src/app/board/page.tsx

'use client';

import Link from 'next/link';
import Pagination from '@/components/Pagination';
import EntryCard from '@/components/EntryCard';
import {useBoardEntries} from '@/hooks/useBoardEntries';
import {usePagination} from '@/hooks/usePagination';
import {BoardEntry} from '@/types/boardTypes';
import Button from '@/components/Button';

export default function BoardListPage() {
  const {entries, isLoading, error} = useBoardEntries();
  const entriesPerPage = 6;
  const {currentPage, totalPages, currentData, paginate} =
    usePagination<BoardEntry>({
      data: entries,
      itemsPerPage: entriesPerPage,
    });

  if (isLoading) {
    return <div className="text-center text-gray-500">로딩중...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="board-list max-w-full mx-auto">
      <h1 className="text-3xl font-bold text-center my-2">게시판</h1>
      <div className="flex justify-end mb-4">
        <Link href="/board/write">
          <Button className="text-sm">
            글 작성
          </Button>
        </Link>
      </div>
      <div className="entries grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {currentData.length > 0 ? (
          currentData.map(entry => <EntryCard key={entry.id} entry={entry} />)
        ) : (
          <div className="flex col-span-full justify-center">
            <p className="text-center text-gray-500">
              없어요.. 그냥 없어요. 아니요 그냥 없어요.
            </p>
          </div>
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}
