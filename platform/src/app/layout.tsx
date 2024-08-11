import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { GlobalLayout } from '~/features/layout/global-layout'
import { Providers } from '~/features/providers/providers'
import { authOptions } from '~/server/auth'
import '~/styles/globals.css'
import { theme } from '~/styles/theme'

import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/notifications/styles.css'
import '@uploadthing/react/styles.css'

export const metadata: Metadata = {
  title: 'WhistleUp - Be safe!',
  description: 'Simple portfolio project to showcase some fullstack skillz.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={GeistSans.className}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications />
          <Providers session={session}>
            <GlobalLayout>{children}</GlobalLayout>
          </Providers>
        </MantineProvider>
      </body>
    </html>
  )
}
