'use client'

import { useEffect, useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { getNotes, type GetNotesParams } from '@/lib/api'
import type { NoteListResponse } from '@/types/note'

import SearchBox from '@/components/SearchBox/SearchBox'
import Pagination from '@/components/Pagination/Pagination'
import NoteList from '@/components/NoteList/NoteList'

import Loading from '@/app/loading'
import Error from './error'

import cssPage from '@/components/NotesPage/NotesPage.module.css'

type NoteProps = { tag?: GetNotesParams['tag'] }

export default function Notes({ tag }: NoteProps) {
  const router = useRouter()

  const [page, setPage] = useState(1)
  const [rawSearch, setRawSearch] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(rawSearch)
      setPage(1)
    }, 500)

    return () => clearTimeout(t)
  }, [rawSearch])

  const queryArgs: GetNotesParams = {
    page,
    perPage: 10,
    search,
    sortBy: 'created' as const,
    ...(tag ? { tag } : {}),
  }

  const { data, isLoading, isError, error } = useQuery<NoteListResponse>({
    queryKey: ['notes', queryArgs],
    queryFn: () => getNotes(queryArgs),
    placeholderData: keepPreviousData,
  })

  if (isLoading) return <Loading />
  if (isError) return <Error error={error} />

  const notes = data?.notes ?? []
  const isEmpty = notes.length === 0

  const totalPages = data?.totalPages ?? 1

  const handlePageChange = (pageIndex: number) => {
    setPage(pageIndex + 1)
  }

  return (
    <div className={cssPage.app}>
      <div className={cssPage.toolbar}>
        <SearchBox
          placeholder="Search notes..."
          initialValue={rawSearch}
          onChange={(v) => {
            setRawSearch(v)
          }}
        />

        <button
          type="button"
          className={cssPage.button}
          onClick={() => router.push('/notes/action/create')}
        >
          Create note +
        </button>
      </div>

      <Pagination
        pageCount={totalPages}
        currentPage={page - 1}
        onPageChange={handlePageChange}
      />

      <hr className={cssPage.divider} />

      {isEmpty ? (
        <p
          style={{
            color: '#6b7280',
            fontStyle: 'italic',
            padding: '2rem 0',
            textAlign: 'center',
          }}
        >
          No notes found.
        </p>
      ) : (
        <NoteList notes={notes} />
      )}
    </div>
  )
}
