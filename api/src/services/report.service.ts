import { desc, eq, isNull } from 'drizzle-orm'

import { db } from '~db/config'
import { ReportInsert, reports } from '~db/schema'

export class ReportService {
  static async addReport(reportData: ReportInsert & { userId: string }) {
    return (
      await db
        .insert(reports)
        .values({ ...reportData })
        .returning()
    )?.[0]
  }

  static async getReports() {
    return await db
      .select()
      .from(reports)
      .orderBy(desc(reports.createdAt))
      .where(isNull(reports.deletedAt))
  }

  static async getReport(id: string) {
    return await db.query.reports.findFirst({
      where: eq(reports.id, id),
      columns: {
        userId: false
      },
      with: {
        attachments: true
      }
    })
  }

  static async updateReport(reportId: string, reportData: ReportInsert) {
    return (
      await db
        .update(reports)
        .set({ ...reportData, updatedAt: new Date() })
        .where(eq(reports.id, reportId))
        .returning()
    )?.[0]
  }

  static async deleteReport(reportId: string) {
    return (
      await db
        .update(reports)
        .set({ deletedAt: new Date() })
        .where(eq(reports.id, reportId))
        .returning()
    )?.[0]
  }
}
