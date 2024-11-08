// src/app/board/[id]/page.tsx

'use client';

import {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {getBoardEntries} from '@/services/boardService';
import {BoardEntry, BoardComment} from '@/types/boardTypes';
import CommentForm from '@/components/commentForm';
import Image from 'next/image';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import Button from '@/components/Button';

export default function BoardDetailPage() {
  const [entry, setEntry] = useState<BoardEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser); // 현재 로그인한 사용자 정보를 저장
    });
    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, []);

  useEffect(() => {
    if (id) {
      const fetchEntry = async () => {
        try {
          const entries = await getBoardEntries();
          const selectedEntry = entries.find(entry => entry.id === id);

          setEntry(selectedEntry || null);
        } catch (error) {
          console.error('Failed to fetch board entry:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEntry();
    }
  }, [id]);

  // 댓글 작성 후 추가된 댓글을 다시 불러오기 위한 함수
  const handleCommentChanged = async () => {
    if (id) {
      const entries = await getBoardEntries();
      const updatedEntry = entries.find(entry => entry.id === id);
      setEntry(updatedEntry || null);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">로딩중...</div>;
  }

  if (!entry) {
    return (
      <div className="text-center text-gray-500">이 URL에는 글이 없어요!</div>
    );
  }

  return (
    <div className="max-w-full md:max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{entry.title}</h1>
      <div className="mb-4 w-full md:w-[400px] h-auto relative overflow-hidden rounded-lg">
        <Image
          src={entry.imageURL ? entry.imageURL : '/defaultImage.png'}
          alt="Board image"
          layout="responsive" // 이미지를 반응형으로 설정
          width={400}
          height={400}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />
      </div>
      <p className="text-gray-700 mb-6">{entry.content}</p>
      <p className="text-sm text-gray-500">
        {entry.author?.name || '익명의 도도새'}
      </p>
      <p className="text-sm text-gray-400 mb-4">
        {new Date(entry.timestamp).toLocaleString()}
      </p>

      <CommentForm
        boardId={id as string}
        onCommentAdded={handleCommentChanged}
        userName={user?.displayName || ''} // 사용자 이름 전달
      />

      <div className="comments-section mt-8">
        <h2 className="text-2xl font-semibold mb-4">댓글</h2>
        {entry.comments.length > 0 ? (
          entry.comments.map((comment: BoardComment) => {
            // 댓글 timestamp 변환을 렌더링 시점에 처리
            const commentDate =
              comment.timestamp instanceof Date
                ? comment.timestamp
                : comment.timestamp.toDate();

            return (
              <div key={comment.id} className="comment mb-4 p-4 border rounded">
                <p className="text-sm text-gray-500">{comment.author.name}</p>
                <p className="text-gray-700">{comment.content}</p>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(commentDate).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No 댓글 Here</p>
        )}
      </div>

      <Button onClick={() => router.back()}>뒤로가기~ </Button>
    </div>
  );
}
