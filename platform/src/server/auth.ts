import { DrizzleAdapter } from '@auth/drizzle-adapter'
import {
  type DefaultSession,
  type NextAuthOptions,
  getServerSession
} from 'next-auth'
import { type Adapter } from 'next-auth/adapters'
import Github from 'next-auth/providers/github'

import { env } from '~/env'
import { db } from '~/server/db'
import {
  accounts,
  sessions,
  users,
  verificationTokens
} from '~/server/db/schema'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      name: string
      email: string | null
      image: string
    }
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ token, session }) => {
      return {
        user: {
          id: token.sub,
          name: token.name,
          email: token.email,
          image: token.picture
        },
        expires: session.expires
      }
    }
  },
  session: {
    strategy: 'jwt'
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens
  }) as Adapter,
  providers: [
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET
    })
  ]
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
