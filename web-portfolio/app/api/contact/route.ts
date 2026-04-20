import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { z } from 'zod'

// Simple in-memory rate limiter (per IP) — suitable for low-traffic/testing.
// For production, replace with Redis/Upstash or a serverless-friendly store.
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 6

type IpEntry = { count: number; firstSeen: number }
const ipMap = new Map<string, IpEntry>()

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
})

function getIp(req: NextRequest) {
  // Try CF-Connecting-IP or x-forwarded-for, fallback to connection remote
  const cf = req.headers.get('cf-connecting-ip')
  if (cf) return cf
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

function rateLimitExceeded(ip: string) {
  const now = Date.now()
  const entry = ipMap.get(ip)
  if (!entry) {
    ipMap.set(ip, { count: 1, firstSeen: now })
    return false
  }

  if (now - entry.firstSeen > RATE_LIMIT_WINDOW_MS) {
    // Reset window
    ipMap.set(ip, { count: 1, firstSeen: now })
    return false
  }

  entry.count += 1
  ipMap.set(ip, entry)
  return entry.count > MAX_REQUESTS_PER_WINDOW
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIp(req)

    if (rateLimitExceeded(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json().catch(() => null)
    if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.format() }, { status: 422 })
    }

    // At this point, we have validated data. For the minimal implementation
    // we'll log it to the server console. Replace this with email sending
    // or persistence (database, queuing) in production.
    const payload = parsed.data
    // Avoid logging message body in production logs — keep for local dev only
    // eslint-disable-next-line no-console
    console.info('[contact] received', { ip, name: payload.name, email: payload.email, subject: payload.subject })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[contact] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export const runtime = 'edge'
