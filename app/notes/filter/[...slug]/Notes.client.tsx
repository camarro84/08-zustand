'use client'

import { useEffect, useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getNotes, type GetNotesParams } from '@/lib/api'
import type { NoteListResponse } from '@/types/note'
import NotesPage from '@/components/NotesPage/NotesPage'
import NoteList from '@/components/NoteList/NoteList'
import Loading from '@/app/loading'
import Error from './error'
import { useRouter } from 'next/navigation'

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

  const queryArgs = {
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
  if (!data) return <p>No note found</p>

  const hasNotes = (data.notes?.length ?? 0) > 0

  return (
    <NotesPage
      data={data}
      currentPage={page}
      onPageChange={(nextPage) => setPage(nextPage)}
      onSearch={(v) => setRawSearch(v)}
      onOpenCreate={() => router.push('/notes/action/create')}
    >
      {hasNotes ? <NoteList notes={data.notes!} /> : <p>No notes found.</p>}
    </NotesPage>
  )
}
