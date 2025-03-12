
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.squarespace-cdn.com',
      'lovable-uploads',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com'
      },
      {
        protocol: 'https',
        hostname: 'lovable-uploads'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
