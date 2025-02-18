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
  // images: {
  //   domains: ['images.sonurai.com'],
  //   deviceSizes: [640, 880],
  // },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
