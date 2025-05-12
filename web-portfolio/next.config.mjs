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
  // For static export, we need to make sure we don't use headers() in pages
  output: 'export',
  distDir: 'out',
}

export default nextConfig;
