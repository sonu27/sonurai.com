import Link from 'next/link'
import Layout from 'components/Layout'
import client from 'libs/Client'
import WallpaperBanner from 'components/WallpaperBanner'

const Index = ({ wallpaper }) => (
  <Layout>
    <WallpaperBanner wallpaper={wallpaper} />
    <div className="px-3 px-lg-0">
      <h1>Home</h1>
      <ul>
        <li><Link href="/bingwallpapers"><a>Bing Wallpapers</a></Link></li>
        <li><a href="https://arai.dev" rel="me">Blog</a></li>
      </ul>
    </div>
  </Layout>
)

export async function getServerSideProps() {
  const data = await client.getWallpapers()
  if (data.wallpapers.length === 0) {
    return null
  }

  return {
    props: {
      wallpaper: data.wallpapers[Math.floor(Math.random() * 10)],
    }
  }
}

export default Index
