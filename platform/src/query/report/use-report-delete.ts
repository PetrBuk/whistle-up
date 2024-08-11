import { useMutation } from '@tanstack/react-query'

import { API_ROUTES } from '~/lib/constants/api-routes'
import { axiosClient } from '~/lib/utils/axios'

export const deleteReport = async (reportId: string) => {
  return (
    await axiosClient.delete<{ id: string }>(
      API_ROUTES.reports.delete(reportId)
    )
  ).data
}

export const useReportDelete = () => {
  return useMutation({
    mutationFn: deleteReport
  })
}
