import { getSession } from '@auth/express'
import { NextFunction, Request, Response } from 'express'
import StatusCodes from 'http-status-codes'

import { authConfig } from '~/utils/auth'

export async function authenticatedUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await getSession(req, authConfig)

  if (!session?.user && !req.url.includes('/api/auth')) {
    return res.status(StatusCodes.UNAUTHORIZED).send()
  }

  res.locals.session = session

  console.log(session)

  next()
}
