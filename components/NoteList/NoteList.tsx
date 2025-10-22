'use client'

import css from './NoteList.module.css'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNote } from '@/lib/api'
import type { Note } from '@/types/note'
import Button from '../Button/Button'

type Props = { notes?: Note[] }

export default function NoteList({ notes = [] }: Props) {
  const queryClient = useQueryClient()
  const mutation = useMutation<Note, unknown, string>({
    mutationFn: (noteId) => deleteNote({ noteId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  if (!notes.length) return <p>No notes found.</p>

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <Link
            href={`/notes/${note.id}`}
            className={css.content}
            scroll={false}
          >
            <p className={css.title}>{note.title}</p>
          </Link>
          <div className={css.footer}>
            <p className={css.tag}>{note.tag}</p>
            <Button
              typeBtn="button"
              className={css.button}
              onClick={() => mutation.mutate(note.id)}
              value="Delete"
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
