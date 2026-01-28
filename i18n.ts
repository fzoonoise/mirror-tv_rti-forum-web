import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Supported locales
export const locales = ['zh-TW', 'en', 'id', 'vi', 'th'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'zh-TW'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  // Validate that the incoming locale parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound()
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
