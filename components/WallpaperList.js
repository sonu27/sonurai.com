import Image from 'next/image'
import Link from 'next/link'

export default function WallpaperList({ wallpapers }) {
  return (
    <div className="flex-container">
      {wallpapers.map(({ id, title, filename }) => (
        <figure key={id} className="wallpaper flex-item">
          <Link href={`/bingwallpapers/${id}`}>
            <a title={title}>
              <Image
                layout="responsive"
                className="img-fluid"
                src={`https://images.sonurai.com/${filename}.jpg`}
                width="1920"
                height="1200"
                alt={title}
              />
              <figcaption className="caption">{title}</figcaption>
            </a>
          </Link>
        </figure>
      ))}
    </div>
  )
}
