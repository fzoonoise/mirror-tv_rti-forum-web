import type { locales } from '@/i18n'

export type Locale = (typeof locales)[number]

export type Messages = typeof import('@/messages/zh-TW.json')
