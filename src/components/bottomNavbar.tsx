// src/components/bottomNavbar.tsx

import Link from 'next/link';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {useState, useEffect} from 'react';
import {auth} from '@/firebase';

export default function BottomNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('로그아웃 성공~');
    } catch (error) {
      console.log('로그아웃 실패', error);
    }
  };

  return (
    <div className="flex fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-300 justify-around">
      <div className="mobile-auth flex fixed z-20 top-0 left-0 m-4 p-2 rounded-lg space-x-2">
        {!isLoggedIn ? (
          <>
            <Link href="/auth/signup">
              <div className="cursor-pointer">회원가입</div>
            </Link>
            <Link href="/auth/login">
              <div className="cursor-pointer">로그인</div>
            </Link>
          </>
        ) : (
          <div className="cursor-pointer" onClick={handleLogout}>
            로그아웃
          </div>
        )}
      </div>
      <Link href="/">
        <div className="flex flex-col items-center cursor-pointer">
          <span>🏠</span>
          <span>Home</span>
        </div>
      </Link>
      <Link href="/board">
        <div className="flex flex-col items-center cursor-pointer">
          <span>📖</span>
          <span>Board</span>
        </div>
      </Link>
      <Link href="/marketing">
        <div className="flex flex-col items-center cursor-pointer">
          <span>📊</span>
          <span>Marketing</span>
        </div>
      </Link>
      <Link href="/portfolio">
        <div className="flex flex-col items-center cursor-pointer">
          <span>💼</span>
          <span>Portfolio</span>
        </div>
      </Link>
    </div>
  );
}
