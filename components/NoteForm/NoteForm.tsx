'use client'

import css from './NoteForm.module.css'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/lib/api'
import type { Note } from '@/types/note'
import { useNoteStore } from '@/lib/store/noteStore'
import type { DraftTag } from '@/lib/store/noteStore'
import { useEffect, useRef } from 'react'

const TAGS = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'] as const
type TagUnion = (typeof TAGS)[number]

function toTag(v: FormDataEntryValue | null): TagUnion {
  const s = typeof v === 'string' ? v : ''
  return (TAGS as readonly string[]).includes(s) ? (s as TagUnion) : 'Todo'
}

export default function NoteForm({ onCancel }: { onCancel?: () => void }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { draft, setDraft, clearDraft } = useNoteStore()

  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const tagRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if (titleRef.current) titleRef.current.value = draft.title
    if (contentRef.current) contentRef.current.value = draft.content
    if (tagRef.current) tagRef.current.value = draft.tag
  }, [draft])

  const mutation = useMutation<
    Note,
    unknown,
    { title: string; content: string; tag: TagUnion }
  >({
    mutationFn: (payload) => createNote(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] })
      clearDraft()
      router.back()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const title = (formData.get('title') as string).trim()
    const content = (formData.get('content') as string).trim()
    const tag = toTag(formData.get('tag'))

    if (!title) return

    const payload: { title: string; content: string; tag: TagUnion } = {
      title,
      content,
      tag,
    }

    mutation.mutate(payload)
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    router.back()
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        <span className={css.labelTitle}>Title</span>
        <input
          ref={titleRef}
          className={css.input}
          type="text"
          name="title"
          placeholder="Enter title"
          defaultValue={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
        />
      </label>

      <label className={css.label}>
        <span className={css.labelTitle}>Content</span>
        <textarea
          ref={contentRef}
          className={css.textarea}
          name="content"
          placeholder="Enter content"
          defaultValue={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
        />
      </label>

      <label className={css.label}>
        <span className={css.labelTitle}>Tag</span>
        <select
          ref={tagRef}
          className={css.select}
          name="tag"
          defaultValue={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as DraftTag })}
        >
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button
          className={css.submit}
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Saving...' : 'Create note'}
        </button>
        <button className={css.cancel} type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
