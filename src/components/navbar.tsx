import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="flex md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md p-4 justify-around">
      <Link href="/">
        <div className="flex flex-col items-center cursor-pointer">
          <span>🏠</span>
          <span>Home</span>
        </div>
      </Link>
      <Link href="/diary">
        <div className="flex flex-col items-center cursor-pointer">
          <span>📖</span>
          <span>Diary</span>
        </div>
      </Link>
      <Link href="/marketing">
        <div className="flex flex-col items-center cursor-pointer">
          <span>📊</span>
          <span>Marketing</span>
        </div>
      </Link>
    </div>
  );
}
