import { type FileRouter, createUploadthing } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  attachementUploader: f({
    pdf: { maxFileSize: '4MB', maxFileCount: 5 },
    image: { maxFileSize: '4MB', maxFileCount: 5 }
  }).onUploadComplete(async ({ file }) => {
    // Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    return { url: file.url }
  })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
