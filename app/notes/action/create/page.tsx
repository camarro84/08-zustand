import type { Metadata } from 'next'
import CreateNote from './CreateNote.client'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Create note — NoteHub',
  description: 'Створіть нову нотатку у застосунку NoteHub.',
  openGraph: {
    title: 'Create note — NoteHub',
    description: 'Сторінка створення нової нотатки.',
    url: `${SITE_URL}/notes/action/create`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub OG image',
      },
    ],
    type: 'website',
  },
}

export default function CreateNotePage() {
  return <CreateNote />
}
