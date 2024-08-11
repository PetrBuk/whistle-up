import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { type UploadedFileData } from 'uploadthing/types'

import { UploadButton } from '~/lib/components/attachements-input/upload-button'
import { useAttachmentCreate } from '~/query/attachment/use-attachment-create'
import { invalidateUseReport } from '~/query/report/use-report'
import { type Report } from '~/server/db/schema'

export type AddAttachmentProps = {
  report: Report
}

export const AddAttachment = ({ report }: AddAttachmentProps) => {
  const queryClient = useQueryClient()

  const createMutation = useAttachmentCreate()

  const handleSuccessUpload = async (files: UploadedFileData[]) => {
    const promises = files.map(async (file) => {
      return createMutation
        .mutateAsync({
          name: file.name,
          reportId: report.id,
          url: file.url
        })
        .catch(() => {
          notifications.show({
            title: 'Upload failed',
            message: `Failed to upload your attachement: ${file.name}`,
            color: 'red'
          })
        })
    })

    await Promise.all(promises)
    invalidateUseReport(queryClient)
  }

  const handleUploadError = () => {
    notifications.show({
      title: 'Upload failed',
      message: 'Failed to upload your attachement, please, try again.',
      color: 'red'
    })
  }

  return (
    <UploadButton
      endpoint="attachementUploader"
      onClientUploadComplete={handleSuccessUpload}
      onUploadError={handleUploadError}
    />
  )
}
