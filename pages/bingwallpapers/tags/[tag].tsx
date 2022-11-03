import { useState } from 'react'
import Layout from '../../../components/Layout'
import WallpaperList from '../../../components/WallpaperList'
import { client, Wallpaper } from '../../../libs/Client'

const limit = 36

export default function Wallpapers({ wallpapers, tag, nextUrl }: { wallpapers: Wallpaper[], tag: string, nextUrl: string }) {
  const [wallpaperList, setWallpaperList] = useState(wallpapers)
  const [next, setNext] = useState(nextUrl)
  const moreFn = async () => {
    const res = await client.nextFn(next)
    setNext(res.nextUrl)
    if (res.wallpapers.length > 0) {
      setWallpaperList([...wallpaperList, ...res.wallpapers])
      if (res.wallpapers.length < limit) {
        setNext('')
      }
    }
  }

  const pageTitle = `Tagged "${tag}" - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`
  return (
    <Layout pageTitle={pageTitle}>
      <h1 className="text-3xl mb-2 text-white mx-2 md:mx-0">Wallpapers tagged with &quot;{tag}&quot;</h1>
      <WallpaperList wallpapers={wallpaperList} />
      <div className="pagination my-4 mx-2 md:mx-0">
        {next !== "" && <button onClick={moreFn} className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white">
          More
        </button>}
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }: any) {
  const { tag } = params
  const data = await client.getWallpapersByTag(tag)
  if (data.wallpapers.length === 0) {
    return { notFound: true }
  }

  return {
    props: {
      tag,
      wallpapers: data.wallpapers,
      nextUrl: data.nextUrl,
    },
    revalidate: 604800,
  }
}
