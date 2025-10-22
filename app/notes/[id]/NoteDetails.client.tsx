'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import type { Note } from '@/types/note'
import Loading from '@/app/loading'
import Error from './error'
import NotePreview from '@/components/NotePreview/NotePreview'

export default function NoteDetails({ id }: { id: string }) {
  const router = useRouter()
  const { data, isLoading, isError, error } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById({ noteId: id }),
    enabled: !!id,
  })
  if (isLoading) return <Loading />
  if (isError) return <Error error={error} value="note details" />
  if (!data) return <p>No note found</p>
  return <NotePreview data={data} onClose={() => router.back()} />
}
