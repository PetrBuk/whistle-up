import { useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '~/lib/constants/api-routes'
import { axiosClient } from '~/lib/utils/axios'
import { type Report } from '~/server/db/schema'

export const getReports = async () => {
  return (await axiosClient.get<Report[]>(API_ROUTES.reports.list)).data
}

export const useReports = () => {
  return useQuery({ queryKey: ['reports'], queryFn: getReports })
}
