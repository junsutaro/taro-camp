// src/components/EntryCard.tsx

'use client';

import {BoardEntry} from '@/types/boardTypes';
import Image from 'next/image';
import Link from 'next/link';

interface EntryCardProps {
  entry: BoardEntry;
}

export default function EntryCard({entry}: EntryCardProps) {
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
          <h2 className="text-xl font-semibold mb-2">
            {entry.title || '제목기능 전에 쓴 글'}
          </h2>
          <p className="text-gray-700 mb-4">{entry.content.slice(0, 6)}...</p>
          <p className="text-sm text-gray-500">
            {entry.author?.name || '익명의 도도새'}
          </p>
          <p className="text-sm text-gray-400">
            {new Date(entry.timestamp).toLocaleString()}
          </p>
        </div>
      </Link>
    </div>
  );
}
