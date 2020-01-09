import Head from 'next/head'
import Router from 'next/router'
import moment from 'moment'
import Layout from '../../components/Layout'
import Api from '../../libs/Api'

const apiClient = new Api()

const Wallpaper = ({ wallpaper }) => {
  const { filename, title, copyright, date } = wallpaper
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
        <img className="img-fluid" src={`https://images.sonurai.com/${filename}.jpg`} alt={title}/>
      </a>
      <p className="px-3 px-lg-0">{copyright} - {moment(date, 'YYYYMMDD').format('MMMM Do YYYY')}</p>
    </Layout>
  )
}

Wallpaper.getInitialProps = async function({ query, res }) {
  try {
    const { id } = query
    const data = await apiClient.getWallpaper(id)

    if (!data.wallpaper) {
      res.statusCode = 404
      res.end('Not found')
      return
    }

    if (!isNaN(Number(id))) {
      if (res) {
        res.writeHead(301, {
          Location: `/bingwallpapers/${data.wallpaper.id}`
        })
        res.end()
      } else {
        Router.push(`/bingwallpapers/${data.wallpaper.id}`)
      }
    }

    return { wallpaper: data.wallpaper }
  } catch (err) {
    console.log(err)
  }
}

export default Wallpaper
