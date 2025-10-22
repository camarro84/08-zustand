export type Note = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  tag: string
}

export type NoteListResponse = {
  notes: Note[]
  totalPages: number
}
