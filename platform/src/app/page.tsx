'use client'

import { Button, Flex, Modal, Skeleton, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ReportCreate } from '~/features/reports/report-create/report-create'
import { ReportsTable } from '~/features/reports/reports-table/reports-table'
import { useReports } from '~/query/report/use-reports'

import styles from './index.module.css'

export default function Home() {
  const [createOpened, { open, close }] = useDisclosure(false)

  const reportsQuery = useReports()

  if (reportsQuery.isLoading) {
    return (
      <Flex direction="column" gap="sm">
        <Skeleton height={30} />
        <Skeleton height={30} />
        <Skeleton height={30} />
        <Skeleton height={30} />
        <Skeleton height={30} />
      </Flex>
    )
  }

  return (
    <div className={styles.main}>
      <Flex justify="space-between" w="100%" mb="xl">
        <Title>Reported problems</Title>
        <Button onClick={open}>Add new Report</Button>
      </Flex>
      <Modal opened={createOpened} onClose={close} centered>
        <ReportCreate />
      </Modal>
      <ReportsTable reports={reportsQuery.data ?? []} />
    </div>
  )
}
