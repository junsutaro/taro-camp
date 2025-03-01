// src/types/boardTypes.ts

import { Timestamp } from "firebase/firestore";

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

export type BoardComment = {
  id: string;
  author: Author;
  content: string;
  timestamp: string | Timestamp; // string과 Timestamp 둘 다 허용
};

export type BoardEntry = {
  id?: string;
  title: string;
  content: string;
  author: Author;
  tags?: string[];
  imageURL?: string | null;
  location?: string | null;
  comments: BoardComment[];
  views: number;
  timestamp: string | Timestamp; // string과 Timestamp 둘 다 허용
};
