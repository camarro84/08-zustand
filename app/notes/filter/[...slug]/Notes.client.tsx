'use client'

import { useEffect, useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getNotes, type GetNotesParams } from '@/lib/api'
import type { NoteListResponse } from '@/types/note'
import NotesPage from '@/components/NotesPage/NotesPage'
import NoteList from '@/components/NoteList/NoteList'
import Modal from '@/components/Modal/Modal'
import NoteForm from '@/components/NoteForm/NoteForm'
import Loading from '@/app/loading'
import Error from './error'

type NoteProps = { tag?: GetNotesParams['tag'] }

export default function Notes({ tag }: NoteProps) {
  const [page, setPage] = useState(1)

  // rawSearch — миттєве значення з інпуту; search — дебаунсене
  const [rawSearch, setRawSearch] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(rawSearch)
      setPage(1) // скидаємо сторінку при зміні пошуку після debounce
    }, 500)
    return () => clearTimeout(t)
  }, [rawSearch])

  const [open, setOpen] = useState(false)

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

  return (
    <>
      <NotesPage
        data={data}
        currentPage={page - 1}
        onPageChange={(idx) => setPage(idx + 1)}
        onSearch={(v) => setRawSearch(v)}
        onOpenCreate={() => setOpen(true)}
      >
        <NoteList notes={data.notes ?? []} />
      </NotesPage>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3>Create note</h3>
        <NoteForm onCancel={() => setOpen(false)} />
      </Modal>
    </>
  )
}
