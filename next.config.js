/** @type {import('next').NextConfig} */
const nextConfig = {
/*   reactStrictMode: true,
 */  swcMinify: true,
  images: {
    domains: ['arweave.net','img-cdn.magiceden.dev','pbs.twimg.com'],
  },
  experimental: {
    largePageDataBytes: 128 * 100000,
  },
}

module.exports = nextConfig
