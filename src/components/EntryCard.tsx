// src/components/EntryCard.tsx

'use client';

import {BoardEntry} from '@/types/boardTypes';
import {Timestamp} from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

interface EntryCardProps {
  entry: BoardEntry;
}

export default function EntryCard({entry}: EntryCardProps) {
  const timestamp =
    entry.timestamp instanceof Timestamp
      ? entry.timestamp.toDate() //  Firebase Timestamp라면 toDate() 호출
      : typeof entry.timestamp === 'string'
      ? new Date(entry.timestamp) //  문자열이면 Date 객체로 변환
      : new Date(entry.timestamp); //  숫자(밀리초 단위 타임스탬프)면 Date 객체로 변환

  const formattedDate = timestamp.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const formattedTime = timestamp.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // 오전/오후 형식 사용
  });

  return (
    <div className="entry-card border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
      <Link href={`/board/${entry.id}`} className="block">
        <div>
          <div className="mb-4 w-full h-[150px] relative overflow-hidden rounded-lg">
            <Image
              src={entry.imageURL || '/defaultImage.png'}
              alt="Board preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              priority
            />
          </div>
          {/* truncate로 자르는게 제일 보기 좋음 */}
          <h2 className="text-xl font-semibold mb-2 truncate w-50">
            {entry.title || '제목기능 전에 쓴 글'}
          </h2>

          <p className="text-gray-700 mb-4 truncate w-50">{entry.content}</p>
          <p className="text-sm text-gray-500">
            {entry.author?.name || '익명의 도도새'}
          </p>
          <p className="text-sm text-gray-400">
            {`${formattedDate} ${formattedTime}`}
          </p>
        </div>
      </Link>
    </div>
  );
}
