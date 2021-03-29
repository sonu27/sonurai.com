import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from 'components/Layout'
import client from 'libs/Client'

export default function Wallpapers({ wallpapers, tag }) {
  return (
    <Layout>
      <Head>
        <title key="title">Tagged &quot;{tag}&quot; - Bing Wallpapers - {process.env.NEXT_PUBLIC_NAME}</title>
        <meta name="description" content="Bing Wallpapers" />
      </Head>
      <h1 className="px-3 px-lg-0">Search results for: &quot;{tag}&quot;</h1>
      <div className="flex-container">
        {wallpapers.map(({ id, title, filename }) => (
          <div key={id} className="wallpaper flex-item">
            <Link href={`/bingwallpapers/${id}`}>
              <a title={title}>
                <Image
                  className="img-fluid"
                  src={`https://images.sonurai.com/${filename}.jpg`}
                  width="1920"
                  height="1200"
                  alt={title}
                />
              </a>
            </Link>
          </div>
        ))}
      </div>
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
