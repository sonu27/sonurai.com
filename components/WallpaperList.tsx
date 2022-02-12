import Image from 'next/image'
import Link from 'next/link'
import { Wallpaper } from '../libs/Client'

export default function WallpaperList({ wallpapers } : { wallpapers: Wallpaper[] }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-1">
      {wallpapers.map(({ id, title, filename }) => (
        <figure key={id} className="wallpaper relative">
          <Link href={`/bingwallpapers/${id}`}>
            <a title={title}>
              <Image
                layout="responsive"
                src={`https://images.sonurai.com/${filename}.jpg`}
                width={1920}
                height={1200}
                alt={title}
              />
              <figcaption className="caption hidden absolute bottom-0 left-0 p-4 h-full w-full text-2xl bg-black bg-opacity-80 text-white">{title}</figcaption>
            </a>
          </Link>
        </figure>
      ))}
    </div>
  )
}
