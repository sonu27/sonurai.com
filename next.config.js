module.exports = {
  async redirects() {
    return [
      {
        source: '/bingwallpapers/page/1',
        destination: '/bingwallpapers',
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
