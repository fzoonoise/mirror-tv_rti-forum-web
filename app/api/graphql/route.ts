import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { SESSION_COOKIE_NAME } from '@/constants'

export async function POST(req: NextRequest) {
  const endpoint = process.env.GRAPHQL_ENDPOINT
  if (!endpoint) {
    return new NextResponse('GRAPHQL_ENDPOINT is not configured', {
      status: 500,
    })
  }

  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(session ? { authorization: `Bearer ${session.value}` } : {}),
    },
    body: await req.text(),
  })

  return new NextResponse(response.body, {
    status: response.status,
    headers: { 'Content-Type': 'application/json' },
  })
}
