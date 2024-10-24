// src/app/login/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      alert('아이디와 비밀번호를 입력하세요.');
      return;
    }

    setLoading(true);

    try {
      const auth = getAuth();
      const email = `${username}@example.com`; // 아이디를 이메일 형식으로 변환
      await signInWithEmailAndPassword(auth, email, password); // 로그인 요청
      alert('로그인 성공!');
      router.push('/'); // 로그인 성공 후 메인 페이지로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">로그인</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="아이디를 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <button
        onClick={handleLogin}
        disabled={loading}
        className={`bg-lime-800 text-white px-4 py-2 rounded hover:bg-lime-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? '로그인 중...' : '로그인'}
      </button>
    </div>
  );
}
