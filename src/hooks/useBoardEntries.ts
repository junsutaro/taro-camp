// src/hooks/useBoardEntries.ts

import {getBoardEntries} from '@/services/boardService';
import {BoardEntry} from '@/types/boardTypes';
import {useEffect, useState} from 'react';

export const useBoardEntries = () => {
  const [entries, setEntries] = useState<BoardEntry[]>([]); // BoradEntry 타입들을 담는 리스트 명시, 빈 배열로 시작
  const [isLoading, setIsLoading] = useState<boolean>(true); // Boolean은 JS boolean은 TS. boolean 권장. isLoading 권장
  const [error, setError] = useState<string | null>(null); // string 또는 null값. error 없으면 null 입니다. null도 타입임. 초기값은 null

  useEffect(() => {
    const fetchEntries = async () => {
      // useEffect 안에 정의하는 이유 : 컴포넌트 다른 부분에서 이 함수에 접근하지 못하도록 scope 안에 가두기 + 가독성.
      try {
        const fetchedEntries = await getBoardEntries();
        setEntries(fetchedEntries);
      } catch (error) {
        console.log('보드 엔트리 페치실패..', error);
        setError('데이터 페치 실패 다시 시도해보세용'); // setError이 error보다 뒤에 있는 이유가 뭐야 ?
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return {entries, isLoading, error};
};
