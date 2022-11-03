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
    <Fragment key={i}><Link href={`/bingwallpapers/tags/${l[0]}`} className="leading-10 whitespace-nowrap px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white">{l[0]}</Link> </Fragment>
  ))

  const pageTitle = `${title} - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`
  return (
    <Layout pageTitle={pageTitle}>
      <Head>
        <meta name="keywords" content={t.reduce((a, c) => `${a}, ${c[0]}`, '')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:description" content={`${title} ${copyright}`} />
        <meta property="og:image" content={`https://images.sonurai.com/${filename}.jpg`} />
      </Head>
      <Link href={`/bingwallpapers/${id}`} title={title} passHref>
        <Image
          className="img-fluid"
          priority={true}
          unoptimized={true}
          src={`https://images.sonurai.com/${filename}.jpg`}
          width={1920}
          height={1200}
          alt={title}
        />
      </Link>
      <h1 className="caption text-2xl text-white mx-4 md:mx-0">{title}</h1>
      <p className="text-gray-400 mx-4 md:mx-0">{copyright} - {intToDate(date)}</p>
      <p className="mt-2 mx-4 md:mx-0">
        <SocialShareButtons
          url={`${domain}/bingwallpapers/${wallpaper.id}`}
          media={`https://images.sonurai.com/${filename}.jpg`}
          desc={`${title} - ${process.env.NEXT_PUBLIC_NAME}`}
          size={40}
        />
      </p>
      <p className="mt-2 mx-4 md:mx-0">{tagFields}</p>
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
