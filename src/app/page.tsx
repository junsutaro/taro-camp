// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">Taro Camp</h1>
      <nav className="mt-4">
        <Link href={'/diary'} className="text-blue-400">
          Go to Diary
        </Link>{' '}
        <br />
        <Link href={'/marketing'} className="text-blue-400">
          Go to Marketing
        </Link>
      </nav>
    </div>
  );
}
