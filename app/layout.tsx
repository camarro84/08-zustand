import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import Footer from '@/components/Footer/Footer'

export const metadata: Metadata = { title: 'NoteHub' }

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
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
