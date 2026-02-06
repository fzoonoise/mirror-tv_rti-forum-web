import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { SESSION_COOKIE_NAME } from '@/constants'

import { defaultLocale, locales } from './i18n'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
})

export default function middleware(req: NextRequest) {
  // 1. Run i18n middleware first
  const intlResponse = intlMiddleware(req)

  // 2. Extract locale from pathname for locale-aware redirects
  const pathname = req.nextUrl.pathname
  const localeMatch = pathname.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)/)
  const locale = localeMatch ? localeMatch[1] : defaultLocale

  // 3. Check protected routes (framework only — extend as needed)
  const protectedPaths: string[] = [] // e.g., ['/profile', '/posts/create']
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '')
  const isProtectedPath = protectedPaths.some((path) =>
    pathnameWithoutLocale.startsWith(path),
  )

  if (isProtectedPath) {
    const session = req.cookies.get(SESSION_COOKIE_NAME)
    if (!session) {
      // Redirect to login, preserving locale and original path
      const loginUrl = new URL(`/${locale}/login`, req.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return intlResponse
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
