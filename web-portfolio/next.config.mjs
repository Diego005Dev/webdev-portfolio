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
    unoptimized: true,
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
  experimental: {
    webpackBuildWorker: true,
  },
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
}

export default nextConfig;
