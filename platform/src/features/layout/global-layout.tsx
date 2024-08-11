'use client'

import { ActionIcon, AppShell, Title } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { usePathname, useRouter } from 'next/navigation'

import { appRoutes } from '~/lib/constants/app-routes'

import classes from './global-layout.module.css'

type GlobalLayoutProps = {
  children: React.ReactNode
}

export const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const path = usePathname()
  const router = useRouter()

  const showArrowBack = path !== appRoutes.home

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header className={classes.header}>
        {showArrowBack && (
          <ActionIcon
            variant="transparent"
            radius="100%"
            aria-label="Back"
            style={{ position: 'absolute' }}
            classNames={{ root: classes.burger }}
            onClick={() => router.push(appRoutes.home)}
          >
            <IconArrowLeft color="white" />
          </ActionIcon>
        )}
        <Title lh="var(--app-shell-header-height)" className={classes.title}>
          WhistleUp
        </Title>
      </AppShell.Header>

      <AppShell.Main className={classes.main}>{children}</AppShell.Main>
    </AppShell>
  )
}
