/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable Next.js Image Optimization for remote images. Previously this
    // project set `unoptimized: true` which disables the built-in image
    // optimizer (useful for static export or some hosting environments).
    // Set to `false` to allow Next.js to optimize remote images using the
    // configured remotePatterns when running on platforms that support it
    // (Vercel, custom image loader, or when using an external optimizer).
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'v0.blob.com',
      },
    ],
  },
  // Keep config minimal and compatible with Next.js 16.
  // If you need to use Turbopack, move options to top-level `turbopack`.
  // Webpack configuration to reduce rebuilds
  webpack: (config, { dev }) => {
    if (dev) {
      // Ignore certain files during development
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.next/**',
          '**/.git/**',
          '**/out/**',
          '**/*.log',
        ],
      }
    }
    return config
  },
  // For static export, we need to make sure we don't use headers() in pages
  // output: 'export',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=()' },
          // Note: CSP must be tailored to app's needs. Keep minimal here.
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https:;",
          },
        ],
      },
    ]
  },
}

export default nextConfig;
