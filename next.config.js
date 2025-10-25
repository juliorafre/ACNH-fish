/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/juliorafrecloud/image/upload/**',
      },
    ],
  },
  turbopack: {},
}

module.exports = nextConfig
