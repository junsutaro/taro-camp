// src/services/diaryService.ts

import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { DiaryEntry } from '../types/diaryTypes';

// 다이어리 글 저장 함수
export const saveDiaryEntry = async (entry: Omit<DiaryEntry, 'id' | 'comments' | 'views' | 'timestamp'>) => {
  try {
    await addDoc(collection(db, 'diaryEntries'), {
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

// 다이어리 글 읽기 함수
export const getDiaryEntries = async (): Promise<DiaryEntry[]> => {
  try {
    const q = query(collection(db, 'diaryEntries'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const entries: DiaryEntry[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<DiaryEntry, 'id'>),
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