// src/serverActions/boardActions.ts
import { getBoardEntries } from '@/services/boardService';

export async function fetchBoardEntry(id: string) {
  try {
    const entries = await getBoardEntries(); // DB에서 데이터 가져오기 (서버에서 실행)
    return entries.find(entry => entry.id === id) || null;
  } catch (error) {
    console.error('Error fetching board entry:', error);
    return null;
  }
}
