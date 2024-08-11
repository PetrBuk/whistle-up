import { type QueryClient, useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '~/lib/constants/api-routes'
import { axiosClient } from '~/lib/utils/axios'
import { type Report } from '~/server/db/schema'

const QUERY_KEY = 'report'

export const useReport = (reportId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEY, reportId],
    queryFn: async () => {
      return (await axiosClient.get<Report>(API_ROUTES.reports.get(reportId!)))
        .data
    },
    enabled: !!reportId
  })
}

export const invalidateUseReport = (queryClient: QueryClient) => {
  queryClient
    .invalidateQueries({ queryKey: [QUERY_KEY], type: 'all' })
    .then(() => {
      //
    })
    .catch(() => {
      //
    })
}
