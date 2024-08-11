import { AuthConfig } from '@auth/core'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import Github from '@auth/express/providers/github'

import { db } from '~db/config'

export const authConfig: AuthConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      return session
    }
  }
}
