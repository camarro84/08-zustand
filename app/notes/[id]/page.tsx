import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import NoteDetails from './NoteDetails.client'

type Props = { params: Promise<{ id: string }> }

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
