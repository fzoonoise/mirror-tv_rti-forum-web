import { z } from 'zod'

// ============================================================================
// Environment Variables Configuration
// ============================================================================
// Client-side vars (NEXT_PUBLIC_*) are inlined at build-time
// Server-side vars (no prefix) are never exposed to the browser
// ============================================================================

const envSchema = z.enum(['local', 'dev', 'staging', 'prod'])
export type ValidEnv = z.infer<typeof envSchema>

// Strict validation prevents accidentally running as 'local' in production
// due to typos (e.g., 'production' instead of 'prod')
const ENV = envSchema.parse(process.env.NEXT_PUBLIC_ENV ?? 'local')

// ============================================================================
// Client-side Variables (NEXT_PUBLIC_*)
// ============================================================================
// Environment-specific configuration for Firebase and analytics

let FIREBASE_API_KEY: string
let FIREBASE_AUTH_DOMAIN: string
let FIREBASE_PROJECT_ID: string
let FIREBASE_STORAGE_BUCKET: string
let FIREBASE_MESSAGING_SENDER_ID: string
let FIREBASE_APP_ID: string
let FIREBASE_MEASUREMENT_ID: string

switch (ENV) {
  case 'prod':
    // TODO: Add production Firebase config (requires env var override until set)
    FIREBASE_API_KEY = ''
    FIREBASE_AUTH_DOMAIN = ''
    FIREBASE_PROJECT_ID = ''
    FIREBASE_STORAGE_BUCKET = ''
    FIREBASE_MESSAGING_SENDER_ID = ''
    FIREBASE_APP_ID = ''
    FIREBASE_MEASUREMENT_ID = ''
    break

  case 'staging':
    // TODO: Add staging Firebase config (requires env var override until set)
    FIREBASE_API_KEY = ''
    FIREBASE_AUTH_DOMAIN = ''
    FIREBASE_PROJECT_ID = ''
    FIREBASE_STORAGE_BUCKET = ''
    FIREBASE_MESSAGING_SENDER_ID = ''
    FIREBASE_APP_ID = ''
    FIREBASE_MEASUREMENT_ID = ''
    break

  case 'dev':
  case 'local':
  default:
    // Dev and local share the same Firebase config
    FIREBASE_API_KEY = 'AIzaSyB7MjsUQ1n7P-9YhO7u8kBE-zZyM6sRF2s'
    FIREBASE_AUTH_DOMAIN = 'rti-project-486306.firebaseapp.com'
    FIREBASE_PROJECT_ID = 'rti-project-486306'
    FIREBASE_STORAGE_BUCKET = 'rti-project-486306.firebasestorage.app'
    FIREBASE_MESSAGING_SENDER_ID = '845066759721'
    FIREBASE_APP_ID = '1:845066759721:web:4f75e3ba35d4e19d24b638'
    FIREBASE_MEASUREMENT_ID = 'G-1X2W1WZ3CP'
    break
}

// Allow environment variable overrides
FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN =
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID =
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ??
  FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? FIREBASE_APP_ID
FIREBASE_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? FIREBASE_MEASUREMENT_ID

// Internationalization
const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'zh-TW'

// Server-side env — Zod validated on first access.
// Only call getServerEnv() from server-side code (Server Actions, Route Handlers).
const serverEnvSchema = z.object({
  GRAPHQL_ENDPOINT: z.string().url('GRAPHQL_ENDPOINT must be a valid URL'),
})

type ServerEnv = z.infer<typeof serverEnvSchema>
let _serverEnv: ServerEnv | null = null

export function getServerEnv(): ServerEnv {
  if (!_serverEnv) {
    _serverEnv = serverEnvSchema.parse({
      GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    })
  }
  return _serverEnv
}

export {
  DEFAULT_LOCALE,
  ENV,
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
}
