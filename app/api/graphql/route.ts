import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { getServerEnv } from '@/config/environment-variables'
import { SESSION_COOKIE_NAME } from '@/constants'

export async function POST(req: NextRequest) {
  try {
    const { GRAPHQL_ENDPOINT } = getServerEnv()

    const cookieStore = await cookies()
    const session = cookieStore.get(SESSION_COOKIE_NAME)

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(session ? { authorization: `Bearer ${session.value}` } : {}),
      },
      body: await req.text(),
    })

    // Verify the backend returned JSON, not HTML error page
    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      const text = await response.text()
      console.error(
        `Backend returned non-JSON response (${contentType}):`,
        text.slice(0, 200)
      )
      return NextResponse.json(
        {
          errors: [
            {
              message: `Backend error: expected JSON but got ${contentType || 'unknown content-type'}`,
            },
          ],
        },
        { status: 502 }
      )
    }

    return new NextResponse(response.body, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error'
    console.error('GraphQL proxy error:', error)
    return NextResponse.json({ errors: [{ message }] }, { status: 503 })
  }
}
