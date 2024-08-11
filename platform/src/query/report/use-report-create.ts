import { useMutation } from '@tanstack/react-query'

import { API_ROUTES } from '~/lib/constants/api-routes'
import { axiosClient } from '~/lib/utils/axios'
import { type Report, type ReportInsert } from '~/server/db/schema'

export type CreateReportValues = ReportInsert & {
  attachments: { name: string; url: string }[]
}

export const createReport = async (report: CreateReportValues) => {
  return (await axiosClient.post<Report>(API_ROUTES.reports.create, report))
    .data
}

export const useReportCreate = () => {
  return useMutation({
    mutationFn: createReport
  })
}
