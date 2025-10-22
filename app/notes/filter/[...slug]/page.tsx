import { GetNotesParams, getNotes } from '@/lib/api'
import Notes from './Notes.client'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import type { Metadata } from 'next'

const allowed = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'] as const
type AllowedTag = (typeof allowed)[number]

type Props = {
  params: Promise<{ slug?: string[] }>
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const raw = slug?.[0]
  const tag: GetNotesParams['tag'] =
    raw && (allowed as readonly string[]).includes(raw)
      ? (raw as AllowedTag)
      : 'all'

  const title =
    tag === 'all' ? 'All notes — NoteHub' : `Notes: ${tag} — NoteHub`
  const description =
    tag === 'all'
      ? 'Усі нотатки з пошуком і пагінацією.'
      : `Нотатки, відфільтровані за тегом "${tag}".`

  const url =
    tag === 'all'
      ? `${SITE_URL}/notes/filter/all`
      : `${SITE_URL}/notes/filter/${tag}`

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
      type: 'website',
    },
  }
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params
  const raw = slug?.[0]

  const tag: GetNotesParams['tag'] =
    raw && (allowed as readonly string[]).includes(raw)
      ? (raw as AllowedTag)
      : undefined

  const queryClient = new QueryClient()
  const initialQuery = {
    page: 1,
    perPage: 10,
    search: '',
    sortBy: 'created' as const,
    ...(tag ? { tag } : {}),
  }

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialQuery],
    queryFn: () => getNotes(initialQuery),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Notes tag={tag} />
    </HydrationBoundary>
  )
}
