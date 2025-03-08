import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bingwallpapers',
        permanent: false,
      },
      {
        source: '/wallpaper/:image',
        destination: 'https://images.sonurai.com/:image',
        permanent: true,
      },
    ]
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/abc/:match*',
  //       destination: 'https://abc.sonurai.com/:match*',
  //     },
  //   ]
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.sonurai.com',
        port: '',
        pathname: '**',
        search: '',
      },
    ],
    deviceSizes: [880],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
