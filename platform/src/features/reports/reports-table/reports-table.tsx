'use client'

import {
  ActionIcon,
  Badge,
  Flex,
  Group,
  ScrollArea,
  Table,
  Text
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

import { appRoutes } from '~/lib/constants/app-routes'
import { type Report } from '~/server/db/schema'

export type ReportTableProps = {
  reports: Report[]
}

export const ReportsTable = ({ reports }: ReportTableProps) => {
  const router = useRouter()

  const rows = reports.map((report) => {
    return (
      <Table.Tr key={report.id}>
        <Table.Td>
          <Group gap="sm">
            <Text size="sm" fw={500}>
              {report.subject}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{report.description}</Table.Td>
        <Table.Td>
          <Badge>{report.status}</Badge>
        </Table.Td>
        <Table.Td>
          <Flex justify="center">
            <ActionIcon variant="transparent" aria-label="Detail" mx="auto">
              <IconSearch
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(appRoutes.reports.detail(report.id))}
                title="Detail"
              />
            </ActionIcon>
          </Flex>
        </Table.Td>
      </Table.Tr>
    )
  })

  return (
    <ScrollArea w="100%">
      <Table verticalSpacing="sm" w="100%">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Subject</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Detail</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  )
}
