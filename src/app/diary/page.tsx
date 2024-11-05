// src/app/diary/page.tsx

import Link from 'next/link';

export default function diary() {
  return (
    <div className="diary">
      <h1 className="text-4xl text-center font-bold"> Diary </h1>
      <Link href="/diary/cooking">
        <div className="link-cooking">
          <span>📊</span>
          <span>Cooking</span>
        </div>
      </Link>
      <Link href="/diary/daily">
        <div className="link-daily">
          <span>💼</span>
          <span>Daily</span>
        </div>
      </Link>
      <p> </p>
    </div>
  );
}
