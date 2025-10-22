'use client'

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function TanStackProvider({
  children,
}: {
  children: ReactNode
}) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false, retry: 1 },
        },
      }),
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
