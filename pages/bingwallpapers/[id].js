import { Fragment } from 'react'
import Head from 'next/head'
import Layout from 'components/Layout'
import client from 'libs/Client'
import { intToDate } from 'libs/date'
import SocialShareButtons from 'components/SocialShareButtons'

const domain = process.env.NEXT_PUBLIC_URL

export default function Wallpaper({ wallpaper }) {
  const { filename, title, copyright, date, labelAnnotations } = wallpaper
  const tags = labelAnnotations.map((l) => (
    <Fragment key={l.mid}><span className="badge bg-secondary">{l.description}</span> </Fragment>
  ))

  return (
    <Layout>
      <Head>
        <title key="title">{title} - Bing Wallpapers - {process.env.NEXT_PUBLIC_NAME}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content={`${title} - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`} />
        <meta property="og:description" content={`${title} ${copyright}`} />
        <meta property="og:image" content={`https://images.sonurai.com/${filename}_th.jpg`} />
      </Head>
      <h1 className="title px-3 px-lg-0">{title}</h1>
      <a href={`https://images.sonurai.com/${filename}.jpg`}>
        <img className="img-fluid" src={`https://images.sonurai.com/${filename}.jpg`} alt={title} />
      </a>
      <p className="px-3 px-lg-0">{copyright} - {intToDate(date)}</p>
      <p className="px-3 px-lg-0">
        <SocialShareButtons
          url={`${domain}/bingwallpapers/${wallpaper.id}`}
          media={`https://images.sonurai.com/${filename}.jpg`}
          desc={`${title} - ${process.env.NEXT_PUBLIC_NAME}`}
          size={40}
        />
      </p>
      <p className="px-3 px-lg-0">{tags}</p>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query
  const data = await client.getWallpaper(id)

  if (!data.wallpaper) {
    return { notFound: true }
  }

  if (!isNaN(Number(id))) {
    return { redirect: { destination: `/bingwallpapers/${data.wallpaper.id}`, permanent: true } }
  }

  return { props: { wallpaper: data.wallpaper } }
}
