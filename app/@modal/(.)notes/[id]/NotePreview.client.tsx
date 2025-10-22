'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import Modal from '@/components/Modal/Modal'
import type { Note } from '@/types/note'

export default function NotePreviewModal({ id }: { id: string }) {
  const router = useRouter()

  const { data, isLoading, isError, error } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById({ noteId: id }),
  })

  return (
    <Modal open={true} onClose={() => router.back()}>
      {isLoading && <p>Loading...</p>}
      {isError && (
        <p>
          Failed to load note:{' '}
          {String((error as Error)?.message || 'Unknown error')}
        </p>
      )}
      {data && (
        <>
          <h3>{data.title}</h3>
          <p>{data.content}</p>
          <p>
            <strong>Tag:</strong> {data.tag}
          </p>
          {'createdAt' in data && data.createdAt && (
            <p>
              <strong>Created:</strong>{' '}
              {new Date(data.createdAt).toLocaleString()}
            </p>
          )}
        </>
      )}
    </Modal>
  )
}
