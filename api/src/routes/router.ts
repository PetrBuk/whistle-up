import { Router } from 'express'

import { attachmentRouter } from './api/attachment.route'
import { reportRouter } from './api/report.route'

export const appRouter = Router()

/** Auth.js handler */
// appRouter.use('/api/auth/*', ExpressAuth(authConfig))

/** API routes */
appRouter.use('/api/report', reportRouter)
appRouter.use('/api/attachment', attachmentRouter)
