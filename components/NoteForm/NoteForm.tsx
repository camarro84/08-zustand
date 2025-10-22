'use client'

import { useState, FormEvent } from 'react'
import css from './NoteForm.module.css'
import Button from '../Button/Button'
import { useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/lib/api'

const TAGS = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'] as const
type Tag = (typeof TAGS)[number]

type Props = {
  onCancel?: () => void
}

export default function NoteForm({ onCancel }: Props) {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState<Tag>('Todo')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await createNote({ title, content, tag })
    await queryClient.invalidateQueries({ queryKey: ['notes'] })
    if (onCancel) onCancel()
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className={css.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className={css.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          className={css.select}
          value={tag}
          onChange={(e) => setTag(e.target.value as Tag)}
        >
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={css.btnGroup}>
        <Button
          typeBtn="button"
          className={css.cancelButton}
          value="Cancel"
          onClick={onCancel}
        />
        <Button typeBtn="submit" className={css.submitButton} value="Create" />
      </div>
    </form>
  )
}
