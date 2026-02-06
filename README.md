# RTI Forum

A modern forum web application built with Next.js 16, supporting multi-language content and real-time interactions.

## Tech Stack

- **Framework**: Next.js 16.1.5 (App Router)
- **Language**: TypeScript 5.1+
- **Styling**: Tailwind CSS v3.4 + shadcn/ui
- **State Management**: Zustand
- **API**: Apollo Client + GraphQL (via server-side proxy)
- **Authentication**: Firebase Auth + HttpOnly cookie session
- **Forms**: React Hook Form + Zod
- **i18n**: next-intl (5 languages: zh-TW, en, id, vi, th)
- **Package Manager**: pnpm 10.17.1

## Getting Started

### Prerequisites

- Node.js 22.20.0+
- pnpm 10.17.1+

### Installation

```bash
pnpm install
```

### Environment Setup

```bash
cp .env.example .env
# Fill in GRAPHQL_ENDPOINT and Firebase credentials
```

### Development

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm format       # Format code with Prettier
pnpm storybook    # Start Storybook (http://localhost:6006)
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
forum-web/
├── actions/                 # Server Actions (auth login/logout)
├── app/
│   ├── [locale]/            # i18n routing
│   │   ├── (auth)/login/    # Login page
│   │   ├── (forum)/         # Forum pages (planned)
│   │   └── layout.tsx
│   └── api/graphql/         # GraphQL proxy (reads cookie, attaches auth header)
├── components/
│   ├── layout/              # LanguageSwitcher, etc.
│   └── ui/                  # shadcn/ui components
├── config/                  # Environment variables (Zod validated)
├── constants/               # App constants (session config, etc.)
├── graphql/                 # Queries, mutations, fragments
├── hooks/                   # useAuth, etc.
├── lib/                     # Apollo Client, Firebase SDK, utilities
├── messages/                # i18n JSON files (zh-TW, en, id, vi, th)
├── stores/                  # Zustand stores (auth state)
├── stories/                 # Storybook stories
└── types/                   # TypeScript type definitions
```

## Architecture

### Authentication Flow

```
Browser                     Next.js Server               Keystone Backend
  |                               |                            |
  | 1. Firebase login             |                            |
  |    (email + password)         |                            |
  |                               |                            |
  | 2. Server Action (idToken) -->| 3. GraphQL mutation ------>|
  |                               |<---- sessionToken + member |
  |<-- HttpOnly cookie + member   |                            |
  |                               |                            |
  | 4. Apollo query via           |                            |
  |    /api/graphql ------------->| 5. Attach auth header ---->|
  |                               |<---- GraphQL response -----|
  |<-- proxied response           |                            |
```

- Session token is stored exclusively in an **HttpOnly cookie** (not accessible via JavaScript)
- All client-side GraphQL requests go through `/api/graphql` proxy which attaches the `Authorization` header
- `useAuth` hook handles login, logout, and session restoration on page refresh

## Features

### Implemented

- Firebase authentication with HttpOnly cookie session
- Login page with form validation (shadcn/ui + react-hook-form + zod)
- GraphQL proxy with automatic auth header injection
- Session restoration on page refresh
- Multi-language support (5 languages)
- Middleware with i18n + protected route framework
- UI component library (shadcn/ui) with Storybook

### In Development

- User registration page
- Post creation and management
- Comments and replies
- User profiles
- Category browsing
- Search functionality

## Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
# Server-side only
GRAPHQL_ENDPOINT=https://your-cms-host/api/graphql

# Client-side
NEXT_PUBLIC_ENV=dev
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_DEFAULT_LOCALE=zh-TW
```

## Code Quality

- **ESLint 9**: Flat config with import sorting (`eslint-plugin-simple-import-sort`)
- **Prettier**: Auto-format with Tailwind class sorting (`prettier-plugin-tailwindcss`)
- **TypeScript**: Strict mode, use `type` over `interface`, enforce `import type`

## License

Distributed under the MIT License. See `LICENSE` for more information.
