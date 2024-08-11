import {
  type InferInsertModel,
  type InferSelectModel,
  relations
} from 'drizzle-orm'
import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { users } from './auth'

export const usersRelations = relations(users, ({ many }) => ({
  reports: many(reports)
}))

export const reportStatusEnum = pgEnum('status', [
  'Pending',
  'In-progress',
  'Completed'
])

export const reportSubjectEnum = pgEnum('subject', [
  'Harassment',
  'Bullying',
  'Workplace Cleanliness',
  'Other'
])

export const reports = pgTable(
  'reports',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    subject: reportSubjectEnum('subject').notNull(),
    description: text('description').notNull(),
    status: reportStatusEnum('status').notNull().default('Pending'),
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at')
  },
  (table) => {
    return {
      subjectIdx: index('subjectIdx').on(table.subject),
      statusIdx: index('statusIdx').on(table.status)
    }
  }
)

export type Report = InferSelectModel<typeof reports> & {
  attachments?: Attachment[]
}
export type ReportInsert = Omit<InferInsertModel<typeof reports>, 'userId'>

export const reportInsertSchema = createInsertSchema<typeof reports>(reports, {
  description: z.string().min(20),
  userId: z.string().uuid().optional()
}).extend({
  attachments: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url()
      })
    )
    .optional()
})

export const reportsRelations = relations(reports, ({ many }) => ({
  attachments: many(attachments, { relationName: 'report_attachments' })
}))

export const attachments = pgTable('attachments', {
  id: uuid('id').primaryKey().defaultRandom(),
  reportId: uuid('report_id')
    .notNull()
    .references(() => reports.id),
  url: text('url').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const attachmentsRelations = relations(attachments, ({ one }) => ({
  report: one(reports, {
    fields: [attachments.reportId],
    references: [reports.id],
    relationName: 'report_attachments'
  })
}))

export type Attachment = InferSelectModel<typeof attachments>
export type AttachmentInsert = InferInsertModel<typeof attachments>
export const attachmentInsertSchema = createInsertSchema(attachments)
