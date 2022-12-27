import { client, Wallpaper } from '../../../libs/Client'

export default async function Head({ params }: { params: { id: string } }) {
  const data = await client.getWallpaper(params.id)
  if (!data.wallpaper) {
    return <></>
  }

  const { title, copyright, tags, filename } = data.wallpaper
  const pageTitle = `${title} - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`
  const t = Object.entries(tags).sort((a: any, b: any) => b[1] - a[1])
  return (
    <>
      <title key="title">{pageTitle}</title>
      <meta name="keywords" content={t.reduce((a, c) => `${a}, ${c[0]}`, '')} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:title" content={`${title} - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`} />
      <meta property="og:description" content={`${title} ${copyright}`} />
      <meta property="og:image" content={`https://images.sonurai.com/${filename}.jpg`} />
    </>
  )
}
