import { eq } from 'drizzle-orm'

import { db } from '~db/config'
import { AttachmentInsert, attachments } from '~db/schema'

export class AttachmentService {
  static async addAttachment(attachementData: AttachmentInsert) {
    return (
      await db
        .insert(attachments)
        .values({ ...attachementData })
        .returning()
    )[0]
  }

  static async getAttachments(reportId: string) {
    return await db
      .select({
        id: attachments.id,
        name: attachments.name,
        url: attachments.url
      })
      .from(attachments)
      .where(eq(attachments.reportId, reportId))
  }

  static async deleteAttachment(attachmentId: string) {
    // ToDo: Also remove from CDN
    return (
      await db
        .delete(attachments)
        .where(eq(attachments.id, attachmentId))
        .returning({ id: attachments.id })
    )[0]
  }
}
