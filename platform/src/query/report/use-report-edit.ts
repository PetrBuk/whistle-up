import { useMutation } from '@tanstack/react-query'

import { API_ROUTES } from '~/lib/constants/api-routes'
import { axiosClient } from '~/lib/utils/axios'
import { type ReportInsert } from '~/server/db/schema'

export const editReport = async (report: ReportInsert) => {
  return (
    await axiosClient.put<Report>(API_ROUTES.reports.update(report.id!), report)
  ).data
}

export const useReportEdit = () => {
  return useMutation({
    mutationFn: editReport
  })
}
