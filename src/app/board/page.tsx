// src/app/board/page.tsx

'use client';

import {useEffect, useState} from 'react';
import {getBoardEntries} from '../../services/boardService';
import Link from 'next/link';
import {BoardEntry} from '../../types/boardTypes';
import Pagination from '@/components/Pagination';
import EntryCard from '@/components/EntryCard';

export default function BoardListPage() {
  const [entries, setEntries] = useState<BoardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const entriesPerPage = 6;
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    try {
      const fetchedEntries = await getBoardEntries();
      setEntries(fetchedEntries);
    } catch (error) {
      console.error('Failed to fetch board entries:', error);
      setError('Failed to load entries, plz try again~!?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">로딩중...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="board-list max-w-full mx-auto">
      <h1 className="text-3xl font-bold text-center my-2">게시판</h1>
      <div className="flex justify-end mb-4">
        <Link href="/board/write">
          <button className="write-button border text-sm text-black px-2 py-2 rounded hover:bg-lime-600 transition-colors">
            글 작성
          </button>
        </Link>
      </div>
      <div className="entries grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {currentEntries.length > 0 ? (
          currentEntries.map(entry => (
            <EntryCard key={entry.id} entry={entry} />
          ))
        ) : (
          <div className="flex col-span-full justify-center">
            <p className="text-center text-gray-500">
              없어요.. 그냥 없어요. 아니요 그냥 없어요.
            </p>
          </div>
        )}
      </div>
      <Pagination
        totalEntries={entries.length}
        entriesPerPage={entriesPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}
