import axios from 'axios'
import { Note, NoteListResponse } from '../types/note'

axios.defaults.baseURL = 'https://notehub-public.goit.study/api'
const apiKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

export type GetNotesParams = {
  search?: string
  tag?: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo' | 'all'
  page?: number
  perPage?: number
  sortBy?: 'created' | 'updated'
}

const authHeaders = apiKey
  ? { accept: 'application/json', Authorization: `Bearer ${apiKey}` }
  : { accept: 'application/json' }

export const getNotes = async (
  params: GetNotesParams = {},
): Promise<NoteListResponse> => {
  const { tag, ...rest } = params
  const query: Record<string, unknown> = { perPage: 8, ...rest }
  if (tag && tag !== 'all') query.tag = tag

  const { data } = await axios.get<NoteListResponse>('/notes', {
    headers: authHeaders,
    params: query,
  })
  return data
}

export { getNotes as fetchNotes }

export const fetchNoteById = async ({
  noteId,
}: {
  noteId: string
}): Promise<Note> => {
  const { data } = await axios.get<Note>(`/notes/${noteId}`, {
    headers: authHeaders,
  })
  return data
}

export const deleteNote = async ({
  noteId,
}: {
  noteId: string
}): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: authHeaders,
  })
  return data
}

export const createNote = async (note: {
  title: string
  content: string
  tag: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo'
}): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', note, {
    headers: authHeaders,
  })
  return data
}
