import Link from 'next/link'

export default function WallpaperList({ wallpapers }) {
  return (
    <div>
      {wallpapers.map(({ id, title, filename }) => (
        <figure key={id}>
          <Link href={`/bingwallpapers/${id}`}>
            <a title={title}>
              <img
                className="img-fluid"
                src={`https://images.sonurai.com/${filename}.jpg`}
                width="1920"
                height="1200"
                alt={title}
              />
            </a>
          </Link>
          <figcaption>{title}</figcaption>
        </figure>
      ))}
    </div>
  )
}
