import { z } from 'zod'
import type { NextRequest } from 'next/server'

export const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
})

// Rate limiter (same as route) but exportable for tests / replacement
const RATE_LIMIT_WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 6

type IpEntry = { count: number; firstSeen: number }
const ipMap = new Map<string, IpEntry>()

export function resetRateLimitStore() {
  ipMap.clear()
}

export function rateLimitExceededForIp(ip: string) {
  const now = Date.now()
  const entry = ipMap.get(ip)
  if (!entry) {
    ipMap.set(ip, { count: 1, firstSeen: now })
    return false
  }

  if (now - entry.firstSeen > RATE_LIMIT_WINDOW_MS) {
    ipMap.set(ip, { count: 1, firstSeen: now })
    return false
  }

  entry.count += 1
  ipMap.set(ip, entry)
  return entry.count > MAX_REQUESTS_PER_WINDOW
}

export function extractIp(req: { headers?: Record<string, string> } | NextRequest) {
  // Support both a minimal object with headers and NextRequest
  const headers = (req as any).headers
  if (headers && typeof headers.get === 'function') {
    const cf = headers.get('cf-connecting-ip')
    if (cf) return cf
    const xff = headers.get('x-forwarded-for')
    if (xff) return xff.split(',')[0].trim()
    return headers.get('x-real-ip') || 'unknown'
  }

  const h = (req as any).headers || {}
  return h['cf-connecting-ip'] || (h['x-forwarded-for'] || '').split(',')[0]?.trim() || h['x-real-ip'] || 'unknown'
}
