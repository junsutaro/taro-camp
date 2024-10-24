// src/services/authService.ts
import {onAuthStateChanged, User} from 'firebase/auth';
import {auth} from '@/firebase';

export const subscribeToAuthChanges = (
  callback: (user: User | null) => void,
) => {
  const unsubscribe = onAuthStateChanged(auth, callback);
  return unsubscribe; // 컴포넌트에서 이 함수로 구독 취소 가능
};
