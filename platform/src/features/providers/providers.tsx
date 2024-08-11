'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

type ProvidersProps = {
  session: Session
  children: React.ReactNode
}

export const Providers = ({ session, children }: ProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                staleTime: 1000 * 60 * 5,
                retry: false
              }
            }
          })
        }
      >
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}
