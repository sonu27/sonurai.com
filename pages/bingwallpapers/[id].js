import React from 'react'
import Head from 'next/head'
import Layout from 'components/Layout'
import Api from 'libs/Api'
import { intToDate } from 'libs/date'

const apiClient = new Api()

export default function Wallpaper({ wallpaper }) {
  const { filename, title, copyright, date, labelAnnotations } = wallpaper
  const la = labelAnnotations.map((l) => (
    <React.Fragment key={l.mid}><span className="badge badge-secondary">{l.description}</span> </React.Fragment>
  ))

  return (
    <Layout>
      <Head>
        <title key="title">{title} - Bing Wallpapers - Sonu Rai</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content={`${title} - Bing Wallpapers - Sonu Rai}`} />
        <meta property="og:description" content={`${title} ${copyright}`} />
        <meta property="og:image" content={`https://images.sonurai.com/${filename}_th.jpg`} />
      </Head>
      <h1 className="title px-3 px-lg-0">{title}</h1>
      <a href={`https://images.sonurai.com/${filename}.jpg`}>
        <img className="img-fluid" src={`https://images.sonurai.com/${filename}.jpg`} alt={title} />
      </a>
      <p className="px-3 px-lg-0">{copyright} - {intToDate(date)}</p>
      <p className="px-3 px-lg-0">{la}</p>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query
  const data = await apiClient.getWallpaper(id)

  if (!data.wallpaper) {
    return { notFound: true }
  }

  if (!isNaN(Number(id))) {
    return { redirect: { destination: `/bingwallpapers/${data.wallpaper.id}`, permanent: true } }
  }

  return { props: { wallpaper: data.wallpaper } }
}
