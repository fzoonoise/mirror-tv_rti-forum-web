import '../globals.css'

import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Noto_Sans_TC, Noto_Sans_Thai } from 'next/font/google'

import { AuthButton } from '@/components/layout/AuthButton'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { Toaster } from '@/components/ui/sonner'
import type { Locale } from '@/i18n'
import { locales } from '@/i18n'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin', 'chinese-traditional'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-tc',
})

const notoSansThai = Noto_Sans_Thai({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-thai',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Ensure that the incoming locale is valid
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${notoSansTC.variable} ${notoSansThai.variable}`}>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              <h1 className="text-xl font-bold">RTI Forum</h1>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <AuthButton />
              </div>
            </div>
          </header>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
