// src/app/board/write/page.tsx

'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {saveBoardEntry, saveImageEntry} from '@/services/boardService';
import {getAuth} from 'firebase/auth';

export default function BoardWritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setAuthorName(user.displayName || '익명의 도도새');
      setIsLoggedIn(true);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !authorName) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      let imageURL = null;
      if (image) {
        imageURL = await saveImageEntry(image);
      }

      await saveBoardEntry({
        title,
        content,
        author: {name: authorName},
        tags: [],
        imageURL,
        location: null,
      });
      alert('Board entry successfully saved!');
      router.push('/board');
    } catch (error) {
      console.error('Failed to save board entry:', error);
      alert('Failed to save board entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">글 써용</h1>
      {!isLoggedIn && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            작성자 이름
          </label>
          <input
            type="text"
            value={authorName}
            onChange={e => setAuthorName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="익명의 도도새"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          제목
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="제목 써"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          내용
        </label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          rows={6}
          placeholder="오늘 하루는 어떘나요?"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          이미지 업로드 (안올리면 기본이미지)
        </label>
        <input type="file" onChange={handleImageChange} className="w-full" />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`bg-lime-800 text-white px-4 py-2 rounded hover:bg-lime-600 transition-colors ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}>
        {loading ? 'Saving...' : '저장'}
      </button>
    </div>
  );
}
