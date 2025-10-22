'use client'

import css from './CreateNote.module.css'
import NoteForm from '@/components/NoteForm/NoteForm'

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  )
}
