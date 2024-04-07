/** @type {import('next').NextConfig} */
const nextConfig = {
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
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig
