import {
  Button,
  Group,
  Modal,
  type ModalBaseProps,
  Select,
  TextInput
} from '@mantine/core'
import { type FormErrors, useForm, zodResolver } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'

import { invalidateUseReport } from '~/query/report/use-report'
import { useReportEdit } from '~/query/report/use-report-edit'
import {
  type Report,
  type ReportInsert,
  reportInsertSchema,
  reportStatusEnum,
  reportSubjectEnum
} from '~/server/db/schema'

export type ReportEditProps = {
  report: Report
  opened: boolean
  onClose: ModalBaseProps['onClose']
}

export const ReportEdit = ({ report, opened, onClose }: ReportEditProps) => {
  const queryClient = useQueryClient()
  const editMutation = useReportEdit()

  const form = useForm<ReportInsert>({
    mode: 'uncontrolled',
    initialValues: {
      id: report.id,
      subject: report.subject,
      status: report.status,
      description: report.description
    },
    validateInputOnBlur: true,
    validate: zodResolver(reportInsertSchema)
  })

  const handleSubmit = (values: ReportInsert) => {
    editMutation
      .mutateAsync(values)
      .then(() => {
        invalidateUseReport(queryClient)
        onClose()
        notifications.show({
          title: 'Edited',
          message: 'Report was succesfully edited!',
          color: 'teal'
        })
      })
      .catch(() => {
        notifications.show({
          title: 'Edit failed',
          message: 'Failed to edit the report, please, try again.',
          color: 'red'
        })
      })
  }

  const handleSubmitError = (errors: FormErrors) => {
    const firstErrorPath = Object.keys(errors)[0]!
    form.getInputNode(firstErrorPath)?.focus()
  }

  return (
    <Modal opened={opened} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit, handleSubmitError)}>
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

        <Select
          withAsterisk
          label="Report Status"
          key={form.key('status')}
          {...form.getInputProps('status')}
          data={reportStatusEnum.enumValues}
        />

        <Group justify="flex-start" mt="md">
          <Button type="submit" w="100%">
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  )
}
