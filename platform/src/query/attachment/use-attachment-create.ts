import { useMutation } from '@tanstack/react-query'

import { API_ROUTES } from '~/lib/constants/api-routes'
import { axiosClient } from '~/lib/utils/axios'
import { type Attachment, type AttachmentInsert } from '~/server/db/schema'

export const createAttachment = async (attachment: AttachmentInsert) => {
  return (
    await axiosClient.post<Attachment>(
      API_ROUTES.attachments.create,
      attachment
    )
  ).data
}

export const useAttachmentCreate = () => {
  return useMutation({
    mutationFn: createAttachment
  })
}
