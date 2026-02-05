// Build-time env vars (NEXT_PUBLIC_ prefix) — values are inlined by the bundler.
// Server-side-only vars (e.g. GRAPHQL_ENDPOINT) are read directly at the call site.

const ENV = process.env.NEXT_PUBLIC_ENV || 'local'

// Firebase — set per deployment via .env
const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const FIREBASE_AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const FIREBASE_STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
const FIREBASE_MESSAGING_SENDER_ID =
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
const FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID

// Internationalization
const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'zh-TW'

export {
  DEFAULT_LOCALE,
  ENV,
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
}
