module.exports = {
  async redirects() {
    return [
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
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  poweredByHeader: false,
  reactStrictMode: true,
}
