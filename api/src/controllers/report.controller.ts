import { Request, Response } from 'express'

import { Attachment, reportInsertSchema } from '~db/schema'

import { AttachmentService } from '~services/attachment.service'
import { ReportService } from '~services/report.service'

import { safeRequestHandler } from '~/utils'
import { idParamSchema } from '~/utils/validation'

export class ReportController {
  static addReport = safeRequestHandler(
    { body: reportInsertSchema },
    async (req, res, next) => {
      try {
        // const user = res.locals.session.user

        // if (!user) return res.status(401).json({ error: 'Unauthorized' })

        const report = await ReportService.addReport({
          subject: req.body.subject,
          description: req.body.description,
          userId: req.body.userId
        })

        if (!report) {
          return res.status(400).json({ error: 'Failed to create report' })
        }

        const attachments = req.body.attachments

        const createdAttachments: Promise<Attachment>[] = []

        if (attachments && attachments.length) {
          attachments.forEach((attachment) => {
            createdAttachments.push(
              AttachmentService.addAttachment({
                ...attachment,
                reportId: report.id
              }) as Promise<Attachment>
            )
          })

          await Promise.all(createdAttachments)
        }

        res.json({ ...report, attachments })
      } catch (err) {
        console.log(err)
        next(err)
      }
    }
  )

  static async getReports(_req: Request, res: Response) {
    try {
      const reports = await ReportService.getReports()

      res.json(reports)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Something went wrong' })
    }
  }

  static getReport = safeRequestHandler(
    { params: idParamSchema },
    async (req, res) => {
      try {
        const report = await ReportService.getReport(req.params.id)
        res.json(report)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Something went wrong' })
      }
    }
  )

  static updateReport = safeRequestHandler(
    { params: idParamSchema, body: reportInsertSchema },
    async (req, res) => {
      try {
        const report = await ReportService.updateReport(req.params.id, req.body)
        res.json(report)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Something went wrong' })
      }
    }
  )

  static deleteReport = safeRequestHandler(
    { params: idParamSchema },
    async (req, res) => {
      try {
        const report = await ReportService.deleteReport(req.params.id)
        res.json(report)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Something went wrong' })
      }
    }
  )
}
