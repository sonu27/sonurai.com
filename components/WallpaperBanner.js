import Image from 'next/image'
import Link from 'next/link'
import client from 'libs/Client'

const WallpaperBanner = ({ wallpaper }) => (
  <Link href={`/bingwallpapers/${wallpaper.id}`}>
    <a title={wallpaper.title}>
    <div style={{ position: 'relative', width : '100%', height: '250px' }}>
      <Image
        src={`https://images.sonurai.com/${wallpaper.filename}_th.jpg`}
        objectFit="cover"
        layout="fill"
        priority={true}
        alt={wallpaper.title}
      />
    </div>
    </a>
  </Link>
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

export default WallpaperBanner
