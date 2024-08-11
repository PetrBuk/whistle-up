'use client'

import { Skeleton } from '@mantine/core'

import { ReportDetail } from '~/features/reports/report-detail/report-detail'
import { NotFound } from '~/lib/components/not-found/not-found'
import { useReport } from '~/query/report/use-report'

import styles from '../index.module.css'

export default function ReportDetailPage({
  params
}: {
  params: { reportId: string }
}) {
  const reportQuery = useReport(params.reportId)

  if (reportQuery.isLoading) {
    return <Skeleton height={300} />
  }

  if (!reportQuery.data) {
    return <NotFound />
  }

  return (
    <div className={styles.main}>
      <ReportDetail report={reportQuery.data} />
    </div>
  )
}
