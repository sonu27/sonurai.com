import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from 'components/Layout'
import client from 'libs/Client'
import { intToDate } from 'libs/date'

export default function Wallpapers({ wallpapers, tag }) {
  return (
    <Layout>
      <Head>
        <title key="title">{tag} - Bing Wallpapers - {process.env.NEXT_PUBLIC_NAME}</title>
        <meta name="description" content="Bing Wallpapers" />
      </Head>
      <h1 className="px-3 px-lg-0">{tag} - Bing Wallpapers</h1>
      {wallpapers.map(({ id, title, date, filename }) => (
        <div key={id} className="wallpaper">
          <h2 className="px-3 px-lg-0">{title}</h2>
          <Link href={`/bingwallpapers/${id}`}>
            <a title={title}>
              <Image
                className="img-fluid"
                src={`https://images.sonurai.com/${filename}_th.jpg`}
                width="1920"
                height="1080"
                alt={title}
              />
            </a>
          </Link>
          <div className="px-3 px-lg-0">{intToDate(date)}</div>
        </div>
      ))}
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
