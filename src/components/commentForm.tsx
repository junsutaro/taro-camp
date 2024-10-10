// src/components/commentForm.tsx

import {FormEvent, useState} from 'react';
import {addCommentToDiary} from '@/services/diaryService'; // 댓글 추가 함수
import {CommentFormProps} from '@/types/diaryTypes';
import {Comment} from '@/types/diaryTypes';

export default function CommentForm({
  diaryId,
  onCommentAdded,
}: CommentFormProps) {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 댓글 추가 함수 호출
    const newComment: Omit<Comment, 'id'> = {
      author: {name: authorName},
      content,
      timestamp: new Date(),
    };

    await addCommentToDiary({diaryId}, newComment);

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
        <input
          type="text"
          value={authorName}
          onChange={e => setAuthorName(e.target.value)}
          placeholder="이름"
          required
          className="border p-2 w-2/6 sm:w-3/12" 
          />
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
