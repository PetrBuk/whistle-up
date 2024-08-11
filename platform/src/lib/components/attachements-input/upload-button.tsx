'use client'

import { Button, FileButton } from '@mantine/core'
import {
  type ExpandedRouteConfig,
  type FileRouter,
  type UploadedFileData
} from 'uploadthing/types'

import { type OurFileRouter } from '~/app/api/uploadthing/core'
import { useUploadThing } from '~/lib/utils/uploadthing'

type EndpointHelper<TRouter extends void | FileRouter> = void extends TRouter
  ? 'YOU FORGOT TO PASS THE GENERIC'
  : keyof TRouter

export type UploadButtonProps = {
  endpoint: EndpointHelper<OurFileRouter>
  onClientUploadComplete?: (res: UploadedFileData[]) => void
  onUploadError?: (error: Error) => void
}

export function UploadButton(props: UploadButtonProps) {
  const { startUpload, isUploading, routeConfig } = useUploadThing(
    props.endpoint,
    {
      onClientUploadComplete: props.onClientUploadComplete,
      onUploadError: props.onUploadError
    }
  )

  const { fileTypes, multiple } = generatePermittedFileTypes(routeConfig)

  return (
    <>
      <FileButton
        onChange={(files) => {
          if (!files) return
          void startUpload(Array.isArray(files) ? files : [files])
        }}
        multiple={multiple}
        accept={generateMimeTypes(fileTypes ?? [])?.join(', ')}
      >
        {(props) => (
          <Button loading={isUploading} {...props}>
            Upload File
          </Button>
        )}
      </FileButton>
    </>
  )
}

// Helper functions copied from uploadthing/client

const generatePermittedFileTypes = (config?: ExpandedRouteConfig) => {
  const fileTypes = config ? Object.keys(config) : []

  const maxFileCount = config
    ? Object.values(config).map((v) => v.maxFileCount)
    : []

  return { fileTypes, multiple: maxFileCount.some((v) => v && v > 1) }
}

/** Probably many types wo't work, add cases as needed */
const generateMimeTypes = (fileTypes: string[]) => {
  const accepted = fileTypes.map((type) => {
    switch (type) {
      case 'blob':
        return undefined
      case 'pdf':
        return 'application/pdf'
      default:
        return `${type}/*`
    }
  })

  return accepted
}
