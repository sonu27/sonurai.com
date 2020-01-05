import Head from 'next/head'
import moment from 'moment'
import Layout from '../../components/Layout'
import Api from '../../libs/Api'

const apiClient = new Api()

const Wallpaper = ({ wallpaper }) => {
  const { desc, name, copyright, date } = wallpaper
  return (
    <Layout>
      <Head>
        <title key="title">{desc} - Bing Wallpapers - Sonu Rai</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content={`${desc} - Bing Wallpapers - Sonu Rai}`} />
        <meta property="og:description" content={`${desc} ${copyright}`} />
        <meta property="og:image" content={`https://images.sonurai.com/${name}_th.jpg`} />
      </Head>
      <h1 className="title px-3 px-lg-0">{desc}</h1>
      <a href={`https://images.sonurai.com/${name}.jpg`}>
        <img className="img-fluid" src={`https://images.sonurai.com/${name}.jpg`} alt={desc}/>
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

    return { wallpaper: data.wallpaper }
  } catch (err) {
    console.log(err)
  }
}

export default Wallpaper
