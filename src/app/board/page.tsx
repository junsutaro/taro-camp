// src/app/board/page.tsx (Next.js 서버 컴포넌트)
import { getBoardEntries } from "@/services/boardService";
import EntryCard from "@/components/EntryCard";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import Button from "@/components/Button";

export default async function BoardListPage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const entriesPerPage = 6;

  const allEntries = await getBoardEntries();
  const totalPages = Math.ceil(allEntries.length / entriesPerPage);
  const currentData = allEntries.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  return (
    <div className="board-list max-w-full mx-auto">
      <h1 className="text-3xl font-bold text-center my-2">게시판</h1> 
      <div className="flex justify-end mb-4">
        <Link href="/board/write">
          <Button className="text-sm px-4 py-3">글 작성</Button>
        </Link>
      </div>
      <div className="entries grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {currentData.length > 0 ? (
          currentData.map((entry) => <EntryCard key={entry.id} entry={entry} />)
        ) : (
          <div className="flex col-span-full justify-center">
            <p className="text-center text-gray-500">없어요.. 그냥 없어요. 아니요 그냥 없어요.</p>
          </div>
        )}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage}  />
    </div>
  );  
}
