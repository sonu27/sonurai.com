import { notFound } from 'next/navigation'
import WallpaperList from '../../../../components/WallpaperList'
import { client } from '../../../../libs/Client'
import LoadWallpapers from './tags'

export default async function Page({ params }: {
  params: { tag: string },
}) {
  const data = await client.getWallpapersByTag(params.tag)
  if (data.wallpapers.length === 0) {
    return notFound()
  }
  const limit = 36

  const pageTitle = `Tagged "${params.tag}" - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`
  return (
    <>
      <h1 className="text-3xl mb-2 text-white my-4 mx-4 md:mx-0">Wallpapers tagged with &quot;{params.tag}&quot;</h1>
      <WallpaperList wallpapers={data.wallpapers} />
      <LoadWallpapers nextUrl={data.nextUrl} limit={limit} />
    </>
  )
}
