import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Page not found — NoteHub',
  description:
    'Сторінка не знайдена. Перевірте адресу або поверніться на головну.',
  openGraph: {
    title: 'Page not found — NoteHub',
    description: 'Сторінка не знайдена у застосунку NoteHub.',
    url: `${SITE_URL}/not-found`,
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

export default function NotFound() {
  return (
    <main style={{ padding: 24 }}>
      <h1>404 — Page not found</h1>
      <p>Такої сторінки не існує.</p>
    </main>
  )
}
