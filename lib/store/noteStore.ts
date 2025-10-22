'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type DraftTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo'

export type NoteDraft = {
  title: string
  content: string
  tag: DraftTag
}

const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
}

type Store = {
  draft: NoteDraft
  setDraft: (patch: Partial<NoteDraft>) => void
  replaceDraft: (draft: NoteDraft) => void
  clearDraft: () => void
}

export const useNoteStore = create<Store>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
      replaceDraft: (draft) => set(() => ({ draft })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ draft: state.draft }),
      version: 1,
    },
  ),
)
