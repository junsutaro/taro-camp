// src/admin/migrate.ts

import { db } from './firebaseAdmin';

async function migrateData() {
  try {
    const diaryEntriesSnapshot = await db.collection('diaryEntries').get();

    for (const doc of diaryEntriesSnapshot.docs) {
      const data = doc.data();
      await db.collection('boardEntries').doc(doc.id).set(data);
      console.log(`문서 ${doc.id} 복사 완료`);
    }

    console.log('데이터 마이그레이션이 완료되었습니다.');
  } catch (error) {
    console.error('데이터 마이그레이션 중 오류 발생:', error);
  }
}

migrateData();
