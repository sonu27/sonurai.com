import Head from 'next/head'
import Layout from '../../../components/Layout'
import WallpaperList from '../../../components/WallpaperList'
import { client, Wallpaper } from '../../../libs/Client'

export default function Wallpapers({ wallpapers, tag }: { wallpapers: Wallpaper[], tag: string }) {
  return (
    <Layout>
      <Head>
        <title key="title">Tagged &quot;{tag}&quot; - Bing Wallpapers - {process.env.NEXT_PUBLIC_NAME}</title>
        <meta name="description" content="Bing Wallpapers" />
      </Head>
      <h1 className="text-3xl mb-2 text-white">Search results for: &quot;{tag}&quot;</h1>
      <WallpaperList wallpapers={wallpapers} />
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { tag } = params
  const data = await client.getWallpapersByTag(tag)
  if (data.wallpapers.length === 0) {
    return { notFound: true }
  }

  return {
    props: {
      tag,
      wallpapers: data.wallpapers,
    },
    revalidate: 604800,
  }
}
