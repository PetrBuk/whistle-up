export const appRoutes = {
  home: '/',
  reports: {
    list: '/',
    detail: (reportId: string) => `/${reportId}`
  }
}
