export const API_ROUTES = {
  reports: {
    list: `/api/report`,
    create: `/api/report`,
    get: (reportId: string) => `/api/report/${reportId}`,
    update: (reportId: string) => `/api/report/${reportId}`,
    delete: (reportId: string) => `/api/report/${reportId}`
  },
  attachments: {
    create: '/api/attachment',
    delete: (attachmentId: string) => `/api/attachment/${attachmentId}`
  }
}
