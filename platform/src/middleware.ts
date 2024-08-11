import { withAuth } from 'next-auth/middleware'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(_req) {
    //
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      }
    }
  }
)

export const config = {
  matcher: [
    '/((?!api/uploadthing|_next/static|_next/image|api/auth|favicon.ico|robots.txt|images|$).*)'
  ]
}
