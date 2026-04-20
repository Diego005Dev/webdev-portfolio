/// <reference types="vitest" />
import { describe, it, expect, beforeEach } from 'vitest'
import { POST } from '../app/api/contact/route'
import { resetRateLimitStores } from '../lib/contact'

function makeReq(body: any, ip = '1.2.3.4') {
  return {
    json: async () => body,
    headers: {
      get: (name: string) => {
        if (name === 'cf-connecting-ip') return null
        if (name === 'x-forwarded-for') return ip
        return null
      },
    },
    nextUrl: { pathname: '/' },
  } as any
}

describe('Contact API integration', () => {
  beforeEach(() => {
    resetRateLimitStores()
  })

  it('accepts a valid payload', async () => {
    const req = makeReq({ name: 'A', email: 'a@b.com', subject: 'Hi', message: 'hello' })
    const res: any = await POST(req)
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body).toEqual({ ok: true })
  })

  it('rejects invalid payload with 422', async () => {
    const req = makeReq({ name: '', email: 'not', subject: '', message: '' })
    const res: any = await POST(req)
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.error).toBe('Validation failed')
  })

  it('enforces rate limit', async () => {
    const ip = '9.9.9.9'
    for (let i = 0; i < 6; i++) {
      const req = makeReq({ name: 'A', email: 'a@b.com', subject: 's', message: 'm' }, ip)
      const res: any = await POST(req)
      // first 6 should be 201
      expect(res.status === 201 || res.status === 201).toBeTruthy()
    }

    // 7th should be 429
    const req7 = makeReq({ name: 'A', email: 'a@b.com', subject: 's', message: 'm' }, ip)
    const res7: any = await POST(req7)
    expect(res7.status).toBe(429)
  })
})
