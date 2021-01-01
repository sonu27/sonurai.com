import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { intToDate } from 'libs/date'

const LikeButton = dynamic(() => import('components/LikeButton'), {
  ssr: false,
})

export default function WallpaperList({ wallpapers }) {
  return (
    <>
      {wallpapers.map(({ id, title, date, filename }) => (
        <div key={id} className="wallpaper">
          <h2 className="px-3 px-lg-0">{title}</h2>
          <Link href={`/bingwallpapers/${id}`}>
            <a title={title}>
              <Image
                className="img-fluid"
                src={`https://images.sonurai.com/${filename}_th.jpg`}
                width="1920"
                height="1080"
                alt={title}
              />
            </a>
          </Link>
          <LikeButton id={id} />
          <div className="px-3 px-lg-0">{intToDate(date)}</div>
        </div>
      ))}
    </>
  )
}
