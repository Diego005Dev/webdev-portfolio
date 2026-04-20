// Minimal Upstash Redis REST adapter with in-memory fallback.
// Uses the Upstash REST API when UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
// environment variables are available. Otherwise falls back to the in-memory store.

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

const WINDOW_SECONDS = 60 // 1 minute
const MAX_REQUESTS = 6

type InMemoryEntry = { count: number; firstSeen: number }
const inMemory = new Map<string, InMemoryEntry>()

async function incrUpstash(key: string) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) throw new Error('No Upstash config')

  const res = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cmd: ['INCR', key] }),
  })

  if (!res.ok) throw new Error('Upstash request failed')
  const data = await res.json()
  // data.result should be the new value
  return data.result as number
}

async function expireUpstash(key: string, seconds: number) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) throw new Error('No Upstash config')
  await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cmd: ['EXPIRE', key, seconds] }),
  })
}

export async function isRateLimited(ip: string) {
  const key = `rate:${ip}`

  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      const value = await incrUpstash(key)
      if (value === 1) {
        // first set expiration
        await expireUpstash(key, WINDOW_SECONDS)
      }
      return value > MAX_REQUESTS
    } catch (err) {
      // On any Upstash failure, fallback to in-memory
      // eslint-disable-next-line no-console
      console.warn('[rate-limiter] upstash failed, falling back to memory', err)
    }
  }

  // In-memory fallback
  const now = Date.now()
  const entry = inMemory.get(ip)
  if (!entry) {
    inMemory.set(ip, { count: 1, firstSeen: now })
    return false
  }

  if (now - entry.firstSeen > WINDOW_SECONDS * 1000) {
    inMemory.set(ip, { count: 1, firstSeen: now })
    return false
  }

  entry.count += 1
  inMemory.set(ip, entry)
  return entry.count > MAX_REQUESTS
}

export function resetInMemory() {
  inMemory.clear()
}
