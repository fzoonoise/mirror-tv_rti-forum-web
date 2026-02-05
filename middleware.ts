import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'

import { SESSION_COOKIE_NAME } from '@/constants'

import { defaultLocale, locales } from './i18n'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
})

// Routes that require an active session cookie.
// Add paths as needed — the check uses `startsWith` against the
// locale-prefixed pathname (e.g. "/zh-TW/posts/new").
const PROTECTED_ROUTES: string[] = []

export default async function middleware(req: NextRequest) {
  const response = await intlMiddleware(req)

  const pathname = req.nextUrl.pathname
  const session = req.cookies.get(SESSION_COOKIE_NAME)

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  )

  if (isProtected && !session) {
    // Preserve the locale segment already present in the URL.
    const localeMatch = locales.find((l) => pathname.startsWith(`/${l}`))
    const prefix = localeMatch ? `/${localeMatch}` : ''
    return NextResponse.redirect(new URL(`${prefix}/login`, req.url))
  }

  return response
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
