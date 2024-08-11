import { ActionIcon, Flex } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconSearch, IconTrash } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'

import { useAttachmentDelete } from '~/query/attachment/use-attachment-delete'
import { invalidateUseReport } from '~/query/report/use-report'
import { type Attachment } from '~/server/db/schema'

export type AttachmentActionsProps = {
  attachment: Attachment
}

export const AttachmentActions = ({ attachment }: AttachmentActionsProps) => {
  const queryClient = useQueryClient()
  const deleteMutation = useAttachmentDelete()

  const handleAttachmentDelete = () => {
    deleteMutation
      .mutateAsync(attachment.id)
      .then(() => {
        invalidateUseReport(queryClient)
        notifications.show({
          title: 'Deleted',
          message: 'Delete your attachement.',
          color: 'teal'
        })
      })
      .catch(() => {
        notifications.show({
          title: 'Delete failed',
          message: 'Failed to delete your attachement, please, try again.',
          color: 'red'
        })
      })
  }

  return (
    <Flex gap="lg">
      <a href={attachment.url} target="_blank">
        <ActionIcon variant="transparent">
          <IconSearch />
        </ActionIcon>
      </a>
      <ActionIcon
        variant="transparent"
        color="red"
        onClick={handleAttachmentDelete}
      >
        <IconTrash title="Remove" />
      </ActionIcon>
    </Flex>
  )
}
