import { GetNotesParams, getNotes } from '@/lib/api'
import Notes from './Notes.client'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

const allowed = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'] as const
type AllowedTag = (typeof allowed)[number]

type Props = {
  params: Promise<{ slug?: string[] }>
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params
  const raw = slug?.[0]

  const tag: GetNotesParams['tag'] =
    raw && (allowed as readonly string[]).includes(raw)
      ? (raw as AllowedTag)
      : undefined

  // Server prefetch: початковий стан (page=1, perPage=10, search='', sortBy='created')
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
