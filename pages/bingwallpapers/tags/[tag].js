import Head from 'next/head'
import Layout from 'components/Layout'
import WallpaperList from 'components/WallpaperList'
import client from 'libs/Client'

export default function Wallpapers({ wallpapers, tag }) {
  return (
    <Layout>
      <Head>
        <title key="title">Tagged &quot;{tag}&quot; - Bing Wallpapers - {process.env.NEXT_PUBLIC_NAME}</title>
        <meta name="description" content="Bing Wallpapers" />
      </Head>
      <h1 className="px-3 px-lg-0">Search results for: &quot;{tag}&quot;</h1>
      <WallpaperList wallpapers={wallpapers} />
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const { tag } = query
  const data = await client.getWallpapersByTag(tag)
  if (data.wallpapers.length === 0) {
    return { notFound: true }
  }

  return {
    props: {
      tag,
      wallpapers: data.wallpapers,
    }
  }
}
