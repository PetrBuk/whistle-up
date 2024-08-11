import {
  Accordion,
  ActionIcon,
  Box,
  Card,
  Flex,
  Group,
  Menu,
  Text,
  Title,
  rem
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { appRoutes } from '~/lib/constants/app-routes'
import { useReportDelete } from '~/query/report/use-report-delete'
import { type Report } from '~/server/db/schema'

import { AddAttachment } from './add-attachment'
import { AttachmentActions } from './attachment-actions'
import { ReportEdit } from './report-edit'

export type ReportDetailProps = {
  report: Report
}

export const ReportDetail = ({ report }: ReportDetailProps) => {
  const router = useRouter()
  const [editOpened, { open, close }] = useDisclosure(false)

  const deleteMutation = useReportDelete()

  const handleReportDelete = () => {
    deleteMutation
      .mutateAsync(report.id)
      .then(() => {
        router.push(appRoutes.home)
      })
      .catch(() => {
        notifications.show({
          title: 'Delete failed',
          message:
            'There was an error when deleting the report, please, try again.',
          color: 'red'
        })
      })
  }

  return (
    <Card p="lg" shadow="xs" withBorder w="100%" maw="100%">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Title order={3}>{report.subject}</Title>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconPencil style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={open}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
                color="red"
                onClick={handleReportDelete}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Card.Section p="md" withBorder>
        <Flex direction="column" gap="md">
          <CardDetailRow title={'ID'} value={report.id} />
          <CardDetailRow title={'Subject'} value={report.subject} />
          <CardDetailRow title={'Description'} value={report.description} />
          <CardDetailRow title={'Status'} value={report.status} />
          <CardDetailRow
            title={'Created At'}
            value={new Date(report.createdAt).toLocaleString()}
          />
          <CardDetailRow
            title={'Updated At'}
            value={
              report.updatedAt && new Date(report.updatedAt).toLocaleString()
            }
          />
          <CardDetailRow
            title={'Deleted At'}
            value={
              report.deletedAt && new Date(report.deletedAt).toLocaleString()
            }
          />
        </Flex>
      </Card.Section>
      <Card.Section>
        <Accordion variant="default" pb="sm" defaultValue="attachments">
          <Accordion.Item value="attachments">
            <Accordion.Control>
              <Title order={3}>Attachments</Title>
            </Accordion.Control>
            <Accordion.Panel px="xs">
              {report.attachments?.length ? (
                <Flex direction="column" gap="md">
                  {report.attachments?.map((attachment) => {
                    return (
                      <CardDetailRow
                        key={attachment.id}
                        title={attachment.name}
                        value={<AttachmentActions attachment={attachment} />}
                      />
                    )
                  })}
                </Flex>
              ) : null}
              {!report.attachments?.length ? (
                <Text>No attachments added</Text>
              ) : null}
              <Box mt="md">
                <CardDetailRow
                  title={'Upload new Attachment'}
                  value={<AddAttachment report={report} />}
                />
              </Box>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
      <ReportEdit report={report} opened={editOpened} onClose={close} />
    </Card>
  )
}

type CardDetailRowProps = {
  title: string
  value: React.ReactNode
}

const CardDetailRow = (props: CardDetailRowProps) => {
  return (
    <Flex w="100%" justify="space-between">
      <Text>{props.title}</Text>
      {typeof props.value === 'string' ? (
        <Text
          c="dimmed"
          style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            textAlign: 'right'
          }}
        >
          {props.value}
        </Text>
      ) : (
        props.value
      )}
    </Flex>
  )
}
