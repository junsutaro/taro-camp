// src/app/diary/page.tsx

'use client';

import {useEffect, useState} from 'react';
import {getDiaryEntries} from '../../services/diaryService';
import Link from 'next/link';
import {DiaryEntry} from '../../types/diaryTypes';
import Image from 'next/image';

export default function DiaryListPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const entriesPerPage = 6;

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const fetchedEntries = await getDiaryEntries();
        setEntries(fetchedEntries);
      } catch (error) {
        console.error('Failed to fetch diary entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">로딩중...</div>;
  }

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="diary-list max-w-full mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">다이어리</h1>
      <div className="entries grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {currentEntries.length > 0 ? (
          currentEntries.map(entry => (
            <div
              key={entry.id}
              className="entry-card border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
              <Link href={`/diary/${entry.id}`} className="block">
                <div>
                  <div className="mb-4 w-full h-[150px] relative overflow-hidden rounded-lg">
                    <Image
                      src={
                        entry.imageURL ? entry.imageURL : '/defaultImage.png'
                      }
                      alt="Diary preview image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px" // 다양한 뷰포트 크기 설정
                      priority
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    {entry.title || '제목기능 전에 쓴 글'}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {entry.content.slice(0, 6)}...
                  </p>
                  <p className="text-sm text-gray-500">
                    {entry.author?.name || '익명의 도도새'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            없어요.. 그냥 없어요. 아니요 그냥 없어요.
          </p>
        )}
      </div>
      <div className="pagination flex justify-center mt-8">
        {Array.from(
          {length: Math.ceil(entries.length / entriesPerPage)},
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-4 py-2 rounded ${
                currentPage === index + 1
                  ? 'bg-lime-700 text-white'
                  : 'bg-gray-200 text-gray-600'
              } hover:bg-lime-600 transition-colors`}>
              {index + 1}
            </button>
          ),
        )}
      </div>
      <div className="text-center mt-8">
        <Link href="/diary/write">
          <button className="write-button bg-lime-700 text-white px-4 py-2 rounded hover:bg-lime-600 transition-colors">
            새 글 작성!
          </button>
        </Link>
      </div>
    </div>
  );
}
