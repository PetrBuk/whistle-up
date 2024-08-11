'use client'

import { Button, Group, Select, TextInput } from '@mantine/core'
import { type FormErrors, useForm, zodResolver } from '@mantine/form'
import { useSession } from 'next-auth/react'
import { z } from 'zod'

import { AttachementsInput } from '~/lib/components/attachements-input/attachements-input'
import { type CreateReportValues } from '~/query/report/use-report-create'
import { reportInsertSchema, reportSubjectEnum } from '~/server/db/schema'

export type ReportCreateFormProps = {
  onSubmit: (values: CreateReportValues) => void
}

export const ReportCreateForm = ({ onSubmit }: ReportCreateFormProps) => {
  const session = useSession()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      userId: session.data?.user.id ?? '',
      subject: '' as 'Other',
      description: '',
      attachments: []
    },
    validateInputOnBlur: true,
    validate: zodResolver(
      reportInsertSchema.extend({
        attachments: z.array(z.object({ name: z.string(), url: z.string() }))
      })
    )
  })

  const handleSubmitError = (errors: FormErrors) => {
    const firstErrorPath = Object.keys(errors)[0]!
    form.getInputNode(firstErrorPath)?.focus()
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit, handleSubmitError)}>
      <Select
        withAsterisk
        label="Report Subject"
        placeholder="What is the report about?"
        key={form.key('subject')}
        {...form.getInputProps('subject')}
        data={reportSubjectEnum.enumValues}
      />

      <TextInput
        withAsterisk
        label="Description"
        placeholder="Provide a detailed description of the problem."
        mt="md"
        key={form.key('description')}
        {...form.getInputProps('description')}
      />

      <AttachementsInput form={form} fieldName="attachments" />

      <Group justify="flex-start" mt="md">
        <Button type="submit" w="100%">
          Submit
        </Button>
      </Group>
    </form>
  )
}
