import { Fragment } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { client, Wallpaper } from '../../libs/Client'
import { intToDate } from '../../libs/date'
import SocialShareButtons from '../../components/SocialShareButtons'
import Layout from '../../components/Layout'

const domain = process.env.NEXT_PUBLIC_URL

export default function W({ wallpaper }: { wallpaper: Wallpaper }) {
  const { id, filename, title, copyright, date, tags } = wallpaper
  const t = Object.entries(tags).sort((a: any, b: any) => b[1] - a[1])
  const tagFields = t.map((l, i) => (
    <Fragment key={i}><Link href={`/bingwallpapers/tags/${l[0]}`}><a className="rounded p-2 leading-10 bg-slate-800 text-white hover:bg-slate-700">{l[0]}</a></Link> </Fragment>
  ))

  return (
    <Layout>
      <Head>
        <title key="title">{title} - Bing Wallpapers - {process.env.NEXT_PUBLIC_NAME}</title>
        <meta name="keywords" content={t.reduce((a, c) => `${a}, ${c[0]}`, '')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content={`${title} - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`} />
        <meta property="og:description" content={`${title} ${copyright}`} />
        <meta property="og:image" content={`https://images.sonurai.com/${filename}.jpg`} />
      </Head>
      <figure key={id} className="wallpaper relative">
        <Link href={`/bingwallpapers/${id}`}>
          <a title={title}>
            <Image
              className="img-fluid"
              unoptimized={true}
              src={`https://images.sonurai.com/${filename}.jpg`}
              width={1920}
              height={1200}
              alt={title}
            />
            <figcaption className="caption text-2xl text-white">{title}</figcaption>
          </a>
        </Link>
      </figure>
      <p className="text-gray-400">{copyright} - {intToDate(date)}</p>
      <p className="mt-2">
        <SocialShareButtons
          url={`${domain}/bingwallpapers/${wallpaper.id}`}
          media={`https://images.sonurai.com/${filename}.jpg`}
          desc={`${title} - ${process.env.NEXT_PUBLIC_NAME}`}
          size={40}
        />
      </p>
      <p className="mt-2">{tagFields}</p>
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
  const { id } = params
  const data = await client.getWallpaper(id)

  if (!data.wallpaper) {
    return { notFound: true }
  }

  if (!isNaN(Number(id))) {
    return { redirect: { destination: `/bingwallpapers/${data.wallpaper.id}`, permanent: true } }
  }

  return { props: { wallpaper: data.wallpaper }, revalidate: 604800 }
}
