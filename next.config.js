module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bingwallpapers',
        permanent: false,
      },
      {
        source: '/bingwallpapers/page/1',
        destination: '/bingwallpapers',
        permanent: true,
      },
      {
        source: '/wallpaper/:image',
        destination: 'https://images.sonurai.com/:image',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['images.sonurai.com'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
}
