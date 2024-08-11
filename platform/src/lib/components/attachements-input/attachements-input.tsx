import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Input,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { type UseFormReturnType } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconTrash } from '@tabler/icons-react'
import { type UploadedFileData } from 'uploadthing/types'

import { UploadButton } from './upload-button'

type FormFields = Record<string, unknown>

type AttachementsInputProps<
  TFormFields extends FormFields,
  TFieldName extends keyof TFormFields
> = {
  form: UseFormReturnType<TFormFields>
  fieldName: TFieldName
}

export type AttachementField = {
  name: string
  url: string
}

export function AttachementsInput<
  TFormFields extends Record<string, unknown>,
  TFieldName extends {
    [K in keyof TFormFields]: TFormFields[K] extends AttachementField[]
      ? K
      : never
  }[keyof TFormFields]
>({ form, fieldName }: AttachementsInputProps<TFormFields, TFieldName>) {
  const handleSuccessUpload = (files: UploadedFileData[]) => {
    files.forEach((file) => {
      form.insertListItem(fieldName, {
        name: file.name,
        url: file.url
      })
    })
  }

  const handleUploadError = (_error: Error) => {
    notifications.show({
      title: 'Upload failed',
      message: 'Failed to upload your attachement, please, try again.',
      color: 'red'
    })
  }

  const fieldValue = form.getValues()[fieldName] as AttachementField[]
  const fields = fieldValue.map((item, index) => (
    <Group key={item.name} mt="xs">
      <TextInput
        disabled
        readOnly
        style={{ flex: 1 }}
        key={form.key(`${String(fieldName)}.${index}.name`)}
        value={item.name}
      />
      <Input
        type="hidden"
        key={form.key(`${String(fieldName)}.${index}.url`)}
        value={item.url}
        readOnly
      />
      <ActionIcon
        color="red"
        // ToDo: Remove from CDN - can use server action with utapi - see https://docs.uploadthing.com/api-reference/ut-api#deletefiles
        onClick={() => form.removeListItem(fieldName, index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ))

  return (
    <Box>
      <Flex
        justify="space-between"
        direction="row"
        wrap="wrap"
        gap="lg"
        mt="md"
      >
        <Title size="sm">Attachements</Title>
        <UploadButton
          endpoint="attachementUploader"
          onClientUploadComplete={handleSuccessUpload}
          onUploadError={handleUploadError}
        />
      </Flex>
      {fields.length > 0 ? (
        <Group mb="xs">
          <Text fw={500} size="sm" style={{ flex: 1 }}>
            File name
          </Text>
        </Group>
      ) : (
        <Text c="dimmed" ta="center" mt="md">
          No attachements
        </Text>
      )}
      {fields}
    </Box>
  )
}
