'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

export function AuthButton() {
  const t = useTranslations('common')
  const locale = useLocale()
  const { isAuthenticated, logout } = useAuth()

  if (isAuthenticated) {
    return (
      <Button variant="outline" size="sm" onClick={() => void logout()}>
        {t('logout')}
      </Button>
    )
  }

  return (
    <Button variant="outline" size="sm" asChild>
      <Link href={`/${locale}/login`}>{t('login')}</Link>
    </Button>
  )
}
