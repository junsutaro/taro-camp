// src/components/Sidebar.tsx

import Link from 'next/link';
import {useEffect, useState} from 'react';
import {subscribeToAuthChanges} from '@/services/authService';
import {signOut, User} from 'firebase/auth';
import {auth} from '@/firebase';

export default function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(currentUser => {
      setIsLoggedIn(!!currentUser);
      setUser(currentUser); // 로그인된 사용자 정보 설정
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('로그아웃 했어요!');
    } catch (error) {
      console.log('로그아웃 실패', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md p-10">
      <h2 className="text-2xl font-bold mb-4">🏕️ 타로캠프</h2>

      <div className="auth flex flex-col space-y-2 py-4 my-4">
        {!isLoggedIn && (
          <>
            <Link href="/auth/signup">
              <div className="flex cursor-pointer hover:text-blue-600 transition-colors">
                <span className="mr-2">🔑</span>
                <span>회원가입</span>
              </div>
            </Link>
            <Link href="/auth/login">
              <div className="flex cursor-pointer hover:text-blue-600 transition-colors">
                <span className="mr-2">🔐</span>
                <span>로그인</span>
              </div>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <div className="nickname">
              <span className="mr-2">😊</span>
              <span>방가워요 {user?.displayName || '환영합니다!'}</span>{' '}
            </div>
            <button
              onClick={handleLogout}
              className="flex cursor-pointer hover:text-blue-600 transition-colors">
              <span className="mr-2">🚪</span>
              <span>로그아웃</span>
            </button>
          </>
        )}
      </div>
      <nav className="flex flex-col space-y-4">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors">
            <span>🏠</span>
            <span>Home</span>
          </div>
        </Link>
        <Link href="/board">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors">
            <span>📖</span>
            <span>Board</span>
          </div>
        </Link>
        <Link href="/diary">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors">
            <span>📖</span>
            <span>Diary</span>
          </div>
        </Link>
        <Link href="/marketing">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors">
            <span>📊</span>
            <span>Marketing</span>
          </div>
        </Link>
        <Link href="/portfolio">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 transition-colors">
            <span>💼</span>
            <span>Portfolio</span>
          </div>
        </Link>
      </nav>
    </div>
  );
}
