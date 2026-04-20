import { describe, it, expect, beforeEach } from 'vitest'
import { ContactSchema, rateLimitExceededForIp, resetRateLimitStore, extractIp } from '@/lib/contact'

describe('Contact schema', () => {
  it('accepts valid payloads', () => {
    const payload = { name: 'A', email: 'a@b.com', subject: 'Hello', message: 'hey' }
    const parsed = ContactSchema.safeParse(payload)
    expect(parsed.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const payload = { name: 'A', email: 'not-an-email', subject: 's', message: 'm' }
    const parsed = ContactSchema.safeParse(payload)
    expect(parsed.success).toBe(false)
  })
})

describe('Rate limiter', () => {
  beforeEach(() => resetRateLimitStore())

  it('allows requests under the limit', () => {
    const ip = '1.2.3.4'
    for (let i = 0; i < 6; i++) {
      const exceeded = rateLimitExceededForIp(ip)
      if (i < 6) expect(exceeded).toBe(false)
    }
  })

  it('blocks after exceeding limit', () => {
    const ip = '1.2.3.5'
    let last = false
    for (let i = 0; i < 7; i++) {
      last = rateLimitExceededForIp(ip)
    }
    expect(last).toBe(true)
  })
})

describe('extractIp helper', () => {
  it('reads from simple headers object', () => {
    const ip = extractIp({ headers: { 'x-forwarded-for': '9.8.7.6, 1.2.3.4' } } as any)
    expect(ip).toBe('9.8.7.6')
  })
})
