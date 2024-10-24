// src/app/page.tsx

'use client';

export default function MainPage() {
  return (
    <div className="main-page">
      <h1 className="text-4xl font-bold text-center">홈</h1>
      <div className="patchNote mx-20">
        <h2 className="text-2xl font-semibold my-10">패치노트</h2>
        <ul className="list-disc list-inside text-left max-w-md">
          <li className="mb-2">회원가입 추가 ( 안해도 상관없음 )</li>
          <li className="mb-2">노래 랜덤 돌리기 가능</li>
        </ul>
      </div>
    </div>
  );
}
