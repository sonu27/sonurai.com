import { notFound } from 'next/navigation'
import WallpaperList from '../../../../components/WallpaperList'
import { client } from '../../../../libs/Client'
import LoadWallpapers from './tags'

export default async function Page({ params }: {
  params: { tag: string },
}) {
  const limit = 36
  const data = await client.getWallpapersByTag(params.tag)
  if (data.wallpapers.length === 0) {
    return notFound()
  }
  return (
    <>
      <h1 className="text-3xl mb-2 text-white my-4 mx-4 md:mx-0">Wallpapers tagged with &quot;{params.tag}&quot;</h1>
      <WallpaperList wallpapers={data.wallpapers} />
      <LoadWallpapers nextUrl={data.nextUrl} limit={limit} />
    </>
  )
}
