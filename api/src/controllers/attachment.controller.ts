import { StatusCodes } from 'http-status-codes'

import { attachmentInsertSchema } from '~db/schema'

import { AttachmentService } from '~services/attachment.service'

import { safeRequestHandler } from '~/utils'
import { idParamSchema } from '~/utils/validation'

export class AttachmentController {
  static addAttachment = safeRequestHandler(
    { body: attachmentInsertSchema },
    async (req, res, next) => {
      try {
        // const user = res.locals.session.user

        // if (!user) return res.status(401).json({ error: 'Unauthorized' })

        const attachment = await AttachmentService.addAttachment({
          reportId: req.body.reportId,
          name: req.body.name,
          url: req.body.url
        })

        if (!attachment) {
          return res.status(400).json({ error: 'Failed to create attachment' })
        }

        res.json(attachment)
      } catch (err) {
        console.log(err)
        next(err)
      }
    }
  )

  static deleteAttachment = safeRequestHandler(
    { params: idParamSchema },
    async (req, res) => {
      try {
        const attachment = await AttachmentService.deleteAttachment(
          req.params.id
        )
        res.status(StatusCodes.OK).json(attachment)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Something went wrong' })
      }
    }
  )
}
