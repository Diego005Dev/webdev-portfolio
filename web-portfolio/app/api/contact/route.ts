import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ContactSchema, rateLimitExceededForIp, extractIp } from '../../../lib/contact'
import { captureException } from '../../../lib/observability'

export async function POST(req: NextRequest) {
  try {
    const ip = extractIp(req)

    if (await rateLimitExceededForIp(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json().catch(() => null)
    if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.format() }, { status: 422 })
    }

    const payload = parsed.data
    // eslint-disable-next-line no-console
    console.info('[contact] received', { ip, name: payload.name, email: payload.email, subject: payload.subject })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    // Report and return a generic server error
    await captureException(err as unknown, { route: '/api/contact' })
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export const runtime = 'edge'
