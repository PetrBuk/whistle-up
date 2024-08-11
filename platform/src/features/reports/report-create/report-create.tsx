import { Flex, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'

import { appRoutes } from '~/lib/constants/app-routes'
import {
  type CreateReportValues,
  useReportCreate
} from '~/query/report/use-report-create'

import { ReportCreateForm } from './report-create-form'

export const ReportCreate = () => {
  const router = useRouter()
  const createMutation = useReportCreate()

  const handleReportCreate = (values: CreateReportValues) => {
    createMutation
      .mutateAsync(values)
      .then((data) => {
        router.push(appRoutes.reports.detail(data.id))
        notifications.show({
          title: 'Report Created',
          message: 'Your report has been successfully created.',
          color: 'teal'
        })
      })
      .catch(() => {
        notifications.show({
          title: 'Report Creation Failed',
          message: 'Failed to create your report, please, try again.',
          color: 'red'
        })
      })
  }

  return (
    <Flex direction="column" gap="sm" justify="stretch" w="100%" maw="500px">
      <Title order={2}>Report a Problem</Title>
      <ReportCreateForm onSubmit={handleReportCreate} />
    </Flex>
  )
}
