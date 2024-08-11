import { Router } from 'express'

import { ReportController } from '~/controllers/report.controller'

export const reportRouter = Router()

reportRouter.post('/', ReportController.addReport)
reportRouter.get('/', ReportController.getReports)
reportRouter.get('/:id', ReportController.getReport)
reportRouter.put('/:id', ReportController.updateReport)
reportRouter.delete('/:id', ReportController.deleteReport)
