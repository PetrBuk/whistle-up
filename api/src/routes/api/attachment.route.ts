import { Router } from 'express'

import { AttachmentController } from '~/controllers/attachment.controller'

export const attachmentRouter = Router()

attachmentRouter.post('/', AttachmentController.addAttachment)
attachmentRouter.delete('/:id', AttachmentController.deleteAttachment)
