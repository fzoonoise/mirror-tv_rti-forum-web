'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Locale } from '@/i18n'
import { locales } from '@/i18n'

const localeNames: Record<Locale, string> = {
  'zh-TW': '繁體中文',
  en: 'English',
  id: 'Bahasa Indonesia',
  vi: 'Tiếng Việt',
  th: 'ไทย',
}

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() as Locale

  const switchLocale = (newLocale: Locale) => {
    // Remove current locale prefix anchored to the start of the pathname
    const pathnameWithoutLocale = pathname.replace(
      new RegExp(`^/${currentLocale}`),
      '',
    )
    // Construct new path with new locale
    const newPath = `/${newLocale}${pathnameWithoutLocale}`
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {localeNames[currentLocale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLocale(locale)}
            className={locale === currentLocale ? 'bg-accent' : ''}
          >
            {localeNames[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
