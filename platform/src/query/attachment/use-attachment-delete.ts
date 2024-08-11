import { useMutation } from '@tanstack/react-query'

import { API_ROUTES } from '~/lib/constants/api-routes'
import { axiosClient } from '~/lib/utils/axios'

export const deleteAttachment = async (attachmentId: string) => {
  return (
    await axiosClient.delete<{ id: string }>(
      API_ROUTES.attachments.delete(attachmentId)
    )
  ).data
}

export const useAttachmentDelete = () => {
  return useMutation({
    mutationFn: deleteAttachment
  })
}
