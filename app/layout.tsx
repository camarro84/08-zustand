import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import { Roboto } from 'next/font/google'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'NoteHub — простий та швидкий застосунок для нотаток з фільтрами та пошуком.',
  openGraph: {
    title: 'NoteHub',
    description:
      'Зберігайте та знаходьте нотатки миттєво. Фільтри, пошук, перегляд деталей.',
    url: SITE_URL,
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
  metadataBase: new URL(SITE_URL),
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.variable} suppressHydrationWarning>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  )
}
