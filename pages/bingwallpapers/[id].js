import Head from 'next/head'
import moment from 'moment'
import Layout from '../../components/Layout'
import Api from '../../libs/Api'

const apiClient = new Api()

const Wallpaper = props => (
  <Layout>
    <Head>
      <title key="title">{props.wallpaper.desc} - Bing Wallpapers - Sonu Rai</title>
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:title" content={`${props.wallpaper.desc} - Bing Wallpapers - Sonu Rai}`} />
      <meta property="og:description" content={`${props.wallpaper.desc} ${props.wallpaper.copyright}`} />
      <meta property="og:image" content={`https://images.sonurai.com/${props.wallpaper.name}_th.jpg`} />
    </Head>
    <h1 className="title px-3 px-lg-0">{props.wallpaper.desc}</h1>
    <a href={`https://images.sonurai.com/${props.wallpaper.name}.jpg`}><img className="img-fluid" src={`https://images.sonurai.com/${props.wallpaper.name}.jpg`} alt={props.wallpaper.desc}/></a>
    <p className="px-3 px-lg-0">{props.wallpaper.copyright} - {moment(props.wallpaper.date, 'YYYYMMDD').format('MMMM Do YYYY')}</p>
  </Layout>
)

Wallpaper.getInitialProps = async function(context) {
  const { id } = context.query

  try {
    const data = await apiClient.getWallpaper(id)
    return { wallpaper: data.wallpaper }
  } catch (err) {
    console.log(err)
  }
}

export default Wallpaper
