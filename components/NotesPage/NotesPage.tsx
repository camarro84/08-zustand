'use client'

import SearchBox from '@/components/SearchBox/SearchBox'
import Pagination from '@/components/Pagination/Pagination'
import css from './NotesPage.module.css'
import type { NoteListResponse } from '@/types/note'

type Props = {
  data: NoteListResponse
  currentPage: number // 0-based
  onPageChange: (pageIndex: number) => void
  onSearch: (v: string) => void
  onOpenCreate: () => void
  children: React.ReactNode
}

export default function NotesPage({
  data,
  currentPage,
  onPageChange,
  onSearch,
  onOpenCreate,
  children,
}: Props) {
  return (
    <div className={css.app}>
      {/* ВЕРХНЯЯ ПАНЕЛЬ: поиск слева, кнопка справа */}
      <div className={css.toolbar}>
        <SearchBox onSearch={onSearch} placeholder="Search notes..." />
        <button className={css.button} onClick={onOpenCreate}>
          Create note +
        </button>
      </div>

      {/* ПАГИНАЦИЯ СВЕРХУ ПО ЦЕНТРУ */}
      <Pagination
        pageCount={data.totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <hr className={css.divider} />

      {/* НИЖЕ — разметка со списком/контентом */}
      {children}
    </div>
  )
}
