import { NextRequest } from 'next/server'
// Compatibility shim: delegate to proxy.ts implementation which matches Next.js 16 conventions.
export { proxy as middleware } from './proxy'
