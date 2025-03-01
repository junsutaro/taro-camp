// src/app/board/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import CommentForm from "@/components/commentForm";
import Button from "@/components/Button";
import { fetchBoardEntry } from "@/serverActions/boardActions";
import { BoardEntry, BoardComment } from "@/types/boardTypes";

export default function BoardDetailPage({ params }: { params: { id: string } }) {
  const [entry, setEntry] = useState<BoardEntry | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 서버에서 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      const data = await fetchBoardEntry(params.id);
      setEntry(data);
    };

    fetchData();
  }, [params.id]); // params.id가 변경될 때마다 실행

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!entry) {
    return <div className="text-center text-gray-500">이 URL에는 글이 없어요!</div>;
  }

  return (
    <div className="max-w-full md:max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{entry.title}</h1>
      <div className="mb-4 w-full md:w-[400px] h-auto relative overflow-hidden rounded-lg">
        <Image
          src={entry.imageURL ? entry.imageURL : "/defaultImage.png"}
          alt="Board image"
          layout="responsive"
          width={400}
          height={400}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />
      </div>
      <p className="text-gray-700 mb-6">{entry.content}</p>
      <p className="text-sm text-gray-500">{entry.author?.name || "익명의 도도새"}</p>
      <p className="text-sm text-gray-400 mb-4">
        {typeof entry.timestamp === "string"
          ? new Date(entry.timestamp).toLocaleString()
          : (entry.timestamp as Timestamp).toDate().toLocaleString()}
      </p>

      <CommentForm
        boardId={params.id}
        onCommentAdded={async () => {
          const updatedEntry = await fetchBoardEntry(params.id);
          setEntry(updatedEntry); // 댓글 추가 후 데이터 갱신
        }}
        userName={user?.displayName || ""}
      />

      <div className="comments-section mt-8">
        <h2 className="text-2xl font-semibold mb-4">댓글</h2>
        {entry.comments.length > 0 ? (
          entry.comments.map((comment: BoardComment) => {
            const commentDate =
              comment.timestamp instanceof Date
                ? comment.timestamp
                : comment.timestamp.toLocaleString();

            return (
              <div key={comment.id} className="comment mb-4 p-4 border rounded">
                <p className="text-sm text-gray-500">{comment.author.name}</p>
                <p className="text-gray-700">{comment.content}</p>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(commentDate).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No 댓글 Here</p>
        )}
      </div>

      <Button onClick={() => router.back()}>뒤로가기~</Button>
    </div>
  );
}
