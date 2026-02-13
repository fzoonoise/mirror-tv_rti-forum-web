'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/useAuth'

export function AuthButton() {
  const t = useTranslations('common')
  const locale = useLocale()
  const { authStatus, logout } = useAuth()

  // Show skeleton during session restoration to avoid layout shift
  if (authStatus === 'restoring') {
    return <Skeleton className="h-8 w-12 rounded-md" />
  }

  if (authStatus === 'authenticated') {
    return (
      <Button
        className="w-12"
        variant="outline"
        size="sm"
        onClick={() => void logout()}
      >
        {t('logout')}
      </Button>
    )
  }

  return (
    <Button className="w-12" variant="outline" size="sm" asChild>
      <Link href={`/${locale}/login`}>{t('login')}</Link>
    </Button>
  )
}
