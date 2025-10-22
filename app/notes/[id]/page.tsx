import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import NoteDetails from './NoteDetails.client'
import type { Metadata } from 'next'

type Props = { params: Promise<{ id: string }> }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  try {
    const note = await fetchNoteById({ noteId: id })
    const title = `${note.title} — NoteHub`
    const description = note.content?.slice(0, 140) || 'Деталі нотатки.'
    const url = `${SITE_URL}/notes/${id}`
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'NoteHub OG image',
          },
        ],
        type: 'article',
      },
    }
  } catch {
    return {
      title: 'Note — NoteHub',
      description: 'Деталі нотатки.',
    }
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById({ noteId: id }),
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetails id={id} />
    </HydrationBoundary>
  )
}
