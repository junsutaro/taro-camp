// src/app/diary/[id]/page.tsx

'use client';

import {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {getDiaryEntries} from '@/services/diaryService';
import {DiaryEntry} from '@/types/diaryTypes';
import Image from 'next/image';

export default function DiaryDetailPage() {
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  useEffect(() => {
    if (id) {
      const fetchEntry = async () => {
        try {
          const entries = await getDiaryEntries();
          const selectedEntry = entries.find(entry => entry.id === id);
          setEntry(selectedEntry || null);
        } catch (error) {
          console.error('Failed to fetch diary entry:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEntry();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500">로딩중...</div>;
  }

  if (!entry) {
    return <div className="text-center text-gray-500">글이 없어요!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{entry.title}</h1>
      <div className="mb-4 w-[400px] h-[400px] relative overflow-hidden rounded-lg">
        <Image
          src={entry.imageURL ? entry.imageURL : '/defaultImage.png'}
          alt="Diary image"
          fill
          className="object-cover" // CSS 클래스를 통해 object-fit을 설정
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px" // 성능 최적화를 위해 sizes 설정
        />
      </div>
      <p className="text-gray-700 mb-6">{entry.content}</p>
      <p className="text-sm text-gray-500">
        {entry.author?.name || '익명의 도도새'}
      </p>
      <p className="text-sm text-gray-400 mb-4">
        {new Date(entry.timestamp).toLocaleDateString()}
      </p>
      <button
        onClick={() => router.back()}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        Go Back
      </button>
    </div>
  );
}
