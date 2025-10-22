import LayoutNotes from '@/components/LayoutNotes/LayoutNotes'

export default function NotesFilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  return <LayoutNotes sidebar={sidebar}>{children}</LayoutNotes>
}
