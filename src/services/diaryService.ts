// src/services/diaryService.ts

import {collection, addDoc, getDocs} from 'firebase/firestore';
import {db} from '../firebase'; // firebase.ts에서 Firestore 가져오기

// 다이어리 글 저장 함수
export const saveDiaryEntry = async (content: string) => {
  try {
    await addDoc(collection(db, 'diaryEntries'), {
      content,
      timestamp: new Date(),
    });
    console.log('Document successfully written!');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// 다이어리 글 읽기 함수
export const getDiaryEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'diaryEntries'));
    const entries = querySnapshot.docs.map(doc => ({
      id: doc.id,
      content: doc.data().content, // content 필드 추가
      timestamp: doc.data().timestamp, // timestamp 필드 추가
    }));
    return entries;
  } catch (e) {
    console.error('Error fetching documents: ', e);
  }
};
