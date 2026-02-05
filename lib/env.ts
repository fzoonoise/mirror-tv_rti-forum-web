import { z } from 'zod'

const envSchema = z.object({
  // Server-side GraphQL endpoint — used by Proxy API Route and Server Actions.
  // Not prefixed with NEXT_PUBLIC_ so it is unavailable on the client bundle;
  // the schema marks it optional for that reason. Server code must assert at runtime.
  GRAPHQL_ENDPOINT: z.string().url().optional(),

  // Deprecated: Apollo Client now routes through /api/graphql proxy.
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: z.string().url().optional(),

  // Firebase Configuration (Required for Firebase Client SDK)
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1).optional(),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1).optional(),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1).optional(),

  // Internationalization (Optional, defaults to Traditional Chinese)
  NEXT_PUBLIC_DEFAULT_LOCALE: z.string().default('zh-TW'),
})

export const env = envSchema.parse({
  GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
})
