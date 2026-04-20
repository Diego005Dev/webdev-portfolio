// Lightweight observability shim.
// If SENTRY_DSN is provided in env, tries to initialize @sentry/node.
// Otherwise falls back to simple console-based wrappers.

type Context = Record<string, unknown> | undefined

let sentryLoaded = false
let Sentry: any = null

async function tryInitSentry() {
  if (sentryLoaded) return
  sentryLoaded = true
  const dsn = process.env.SENTRY_DSN
  if (!dsn) return

  try {
    // Try to import @sentry/node at runtime. We intentionally avoid a
    // static import so projects that don't install Sentry won't fail
    // type-checking or installation. Use a dynamic import with
    // webpackIgnore so bundlers don't try to resolve this optional
    // dependency at build time.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - runtime import of optional dependency
    Sentry = await import(/* webpackIgnore: true */ '@sentry/node')
    // support both CJS and ESM shapes
    Sentry = Sentry && (Sentry.default ?? Sentry)
    Sentry.init({
      dsn,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: 0.0, // keep zero by default; opt-in via env later
    })
    // eslint-disable-next-line no-console
    console.info('[observability] Sentry initialized')
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[observability] Sentry could not be initialized', err)
    Sentry = null
  }
}

export async function captureException(err: unknown, ctx?: Context) {
  await tryInitSentry()
  if (Sentry && Sentry.captureException) {
    try {
      Sentry.captureException(err)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[observability] captureException failed', e)
    }
  } else {
    // eslint-disable-next-line no-console
    console.error('[exception]', err, ctx ?? '')
  }
}

export async function captureMessage(msg: string, ctx?: Context) {
  await tryInitSentry()
  if (Sentry && Sentry.captureMessage) {
    try {
      Sentry.captureMessage(msg)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[observability] captureMessage failed', e)
    }
  } else {
    // eslint-disable-next-line no-console
    console.info('[message]', msg, ctx ?? '')
  }
}

export async function flush(timeoutMs = 2000) {
  await tryInitSentry()
  if (Sentry && Sentry.flush) {
    try {
      await Sentry.flush(timeoutMs)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[observability] flush failed', e)
    }
  }
}
