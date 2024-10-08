// src/app/diary/page.tsx

'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import {getDiaryEntries} from '@/services/diaryService';

interface DiaryEntry {
  id: string;
  content: string;
}

export default function Diary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await getDiaryEntries();
      if (data) {
        setEntries(data);
      } else {
        setEntries([]); // data가 undefined일 경우 빈 배열로 설정
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">My Diary</h1>
      <Link href={'/'} className="text-blue-400">
        Go to Home
      </Link>
      <br />
      <Link href={'/diary/write'} className="text-blue-400">
        Go to Write
      </Link>
      <br />

      {entries.length > 0 ? (
        <div className="mt-4">
          {entries.map(entry => (
            <div key={entry.id} className="border p-2 mb-2">
              <p>{entry.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>작성된 다이어리가 없습니다.</p>
      )}
    </div>
  );
}
