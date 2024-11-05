// src/types/boardTypes.ts

import firebase from 'firebase/compat/app';

// 작성자의 타입 정의
export interface Author {
  uid?: string; // 회원가입 기능이 없으므로 optional
  name: string; // 닉네임으로만 댓글 작성 시 사용
}

// 댓글이 달린 글의 id
export interface CommentFormProps {
  boardId: string;
  onCommentAdded?: () => Promise<void>; // 댓글 추가 후 수행할 함수 (선택적)
  userName?: string; // userName prop 추가
}

// 댓글 타입 정의
export type BoardComment = {
  id: string;
  author: Author;
  content: string;
  timestamp: Date | firebase.firestore.Timestamp; // 수정: Firestore Timestamp 추가
};

// 다이어리 글 타입 정의
export type BoardEntry = {
  id?: string; // 글 작성 시 자동 생성되는 ID (Firestore에서 생성)
  title: string; // 글 제목
  content: string; // 글 내용
  author: Author; // 작성자 정보 (글 작성자는 본인만 가능)
  timestamp: Date; // 작성 시간
  tags?: string[]; // 태그 목록 (optional)
  imageURL?: string | null; // 이미지 URL (optional)
  location?: string | null; // 위치 정보 (optional)
  comments: BoardComment[]; // 댓글 목록
  views: number; // 조회수
};
