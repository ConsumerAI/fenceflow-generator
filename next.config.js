
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.squarespace-cdn.com',
      'lovable-uploads'
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
      {
        source: '/index',
        destination: '/?redirected=true',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/?redirected=true',
        permanent: true,
      },
      {
        source: '/pages/:path*',
        destination: '/:path*',
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;
