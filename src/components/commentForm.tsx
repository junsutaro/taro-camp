// src/components/commentForm.tsx

import {FormEvent, useContext, useEffect, useState} from 'react';
import {addCommentToBoard} from '@/services/boardService'; // 댓글 추가 함수
import {CommentFormProps, BoardComment} from '@/types/boardTypes';
import {AuthContext} from '@/contexts/AuthContext';
import {v4 as uuidv4} from 'uuid';

export default function CommentForm({
  boardId,

  onCommentAdded,
  userName,
}: CommentFormProps) {
  const [authorName, setAuthorName] = useState(userName || ''); // userName으로 초기 설정
  const [content, setContent] = useState('');
  const {user, isLoggedIn} = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn && user) {
      setAuthorName(user.displayName || '');
    } else {
      setAuthorName('');
    }
  }, [isLoggedIn, user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 댓글 추가 함수 호출
    const newComment: BoardComment = {
      id: uuidv4(), // 고유 ID 생성
      author: {name: authorName},
      content,
      timestamp: new Date(),
    };

    await addCommentToBoard({boardId}, newComment);

    // 댓글이 추가된 후 부모 컴포넌트의 핸들러 호출 (선택입니다)
    if (onCommentAdded) {
      await onCommentAdded();
    }

    // 폼 초기화
    setAuthorName('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col sm:flex-row items-start gap-2">
        {!isLoggedIn ? (
          <input
            type="text"
            value={authorName || ''}
            onChange={e => setAuthorName(e.target.value)}
            placeholder="이름"
            required
            className="border p-2 w-2/6 sm:w-3/12"
          />
        ) : null}
        <input
          type="text"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="댓글내용"
          required
          className="border p-2 w-full sm:w-9/12"
        />
        <button
          type="submit"
          className="bg-lime-800 text-sm h-10 w-auto text-white px-3 hover:bg-lime-700 rounded whitespace-nowrap">
          댓글 작성
        </button>
      </div>
    </form>
  );
}
