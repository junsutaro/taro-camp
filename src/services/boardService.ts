// src/services/boardService.ts

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from 'firebase/firestore';
import {db, storage} from '../firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {BoardComment, CommentFormProps, BoardEntry} from '../types/boardTypes';
// 다이어리 글 저장 함수
export const saveBoardEntry = async (
  entry: Omit<BoardEntry, 'id' | 'comments' | 'views' | 'timestamp'>,
) => {
  try {
    await addDoc(collection(db, 'boardEntries'), {
      ...entry,
      timestamp: new Date(),
      comments: [],
      views: 0,
    });
    console.log('글 저장 성공~');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// 댓글 추가 함수
export const addCommentToBoard = async (
  {boardId}: CommentFormProps,
  boardComment: Omit<BoardComment, 'id'>,
) => {
  try {
    const dirayRef = doc(db, 'boardEntries', boardId);
    await updateDoc(dirayRef, {
      comments: arrayUnion(boardComment),
    });
    console.log('댓글 추가 성공!');
  } catch (e) {
    console.log('에러 발생', e);
  }
};

// 다이어리 글 읽기 함수
export const getBoardEntries = async (): Promise<BoardEntry[]> => {
  try {
    const q = query(
      collection(db, 'boardEntries'),
      orderBy('timestamp', 'desc'),
    );
    const querySnapshot = await getDocs(q);
    const entries: BoardEntry[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<BoardEntry, 'id'>),
      timestamp: doc.data().timestamp.toDate(),
    }));
    return entries;
  } catch (e) {
    console.error('Error fetching documents: ', e);
    return [];
  }
};

// 이미지 저장 함수
export const saveImageEntry = async (image: File): Promise<string | null> => {
  try {
    const storageRef = ref(storage, `images/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Image successfully uploaded! URL:', downloadURL);
    return downloadURL;
  } catch (e) {
    console.error('Error uploading image: ', e);
    return null;
  }
};

export const deleteCommentFromBoard = async (
  boardId: string,
  boardComment: BoardComment,
) => {
  try {
    const boardRef = doc(db, 'boardEntries', boardId);
    const boardSnap = await getDoc(boardRef);

    if (boardSnap.exists()) {
      const data = boardSnap.data();
      const updatedComments = (data.comments as BoardComment[]).filter(
        (c: BoardComment) => c.id !== boardComment.id,
      ); // 해당 댓글을 제외한 배열

      await updateDoc(boardRef, {
        comments: updatedComments, // 댓글 목록 업데이트
      });
      console.log('댓글 삭제 성공!');
    } else {
      console.error('해당 글이 존재하지 않습니다.');
    }
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
  }
};
