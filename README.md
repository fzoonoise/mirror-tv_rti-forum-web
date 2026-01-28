# RTI Forum

A modern forum web application built with Next.js 16, supporting multi-language content and real-time interactions.

## Tech Stack

- **Framework**: Next.js 16.1.5 (App Router)
- **Language**: TypeScript 5.1+
- **Styling**: Tailwind CSS v3.4 + shadcn/ui
- **State Management**: Zustand
- **API**: Apollo Client + GraphQL
- **Authentication**: Firebase Auth
- **Forms**: React Hook Form + Zod
- **i18n**: next-intl (5 languages: 繁中, English, Indonesian, Vietnamese, Thai)
- **Package Manager**: pnpm 10.17.1

## Getting Started

### Prerequisites

- Node.js 22.20.0+
- pnpm 10.17.1+

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm format       # Format code with Prettier
pnpm storybook    # Start Storybook UI component viewer
```

## Project Structure

```
rti-forum/
├── app/[locale]/          # Next.js App Router with i18n
├── components/ui/         # shadcn/ui components
├── lib/                   # Utility functions & configs
├── hooks/                 # Custom React hooks
├── stores/                # Zustand state stores
├── types/                 # TypeScript type definitions
├── graphql/               # GraphQL queries & mutations
├── messages/              # i18n translation files
└── stories/               # Storybook component stories
```

## Features

### Implemented

- ✅ Multi-language support (5 languages)
- ✅ Modern UI with shadcn/ui components
- ✅ Auto-sort imports on save (ESLint)
- ✅ Auto-format code on save (Prettier)
- ✅ GraphQL API integration ready
- ✅ Firebase authentication setup
- ✅ Form validation with Zod
- ✅ Component development with Storybook

### In Development

- 🚧 User authentication (login/register)
- 🚧 Post creation and management
- 🚧 Comments and replies
- 🚧 User profiles
- 🚧 Category browsing
- 🚧 Search functionality

## Development Tools

### Storybook

View and develop UI components in isolation:

```bash
pnpm storybook
```

Visit [http://localhost:6006](http://localhost:6006) to see component stories.

### Code Quality

- **ESLint**: Flat config with Next.js, React, and TypeScript rules
- **Prettier**: Auto-format with Tailwind class sorting
- **TypeScript**: Strict mode enabled

## Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
# GraphQL API
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/api/graphql

# Firebase Authentication
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
# ... other Firebase config

# Default locale
NEXT_PUBLIC_DEFAULT_LOCALE=zh-TW
```

## Documentation

- [Technical Planning](./FORUM_PLANNING.md) - Full technical specification
- [Backend API](./forum-cms-README.md) - Backend GraphQL API documentation
- [Storybook Stories](./stories/README.md) - UI component stories

## License

Private - All rights reserved
