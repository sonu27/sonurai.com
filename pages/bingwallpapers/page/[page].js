import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import Layout from '../../../components/Layout'
import Api from '../../../libs/Api'

const apiClient = new Api()

const Wallpapers = props => (
  <Layout>
    <Head>
      <title key="title">Bing Wallpapers - Page {props.page} - Sonu Rai</title>
    </Head>
    <h1 className="title px-3 px-lg-0">Bing Wallpapers</h1>
    {props.wallpapers.map((wallpaper) => (
      <div className="wallpaper">
        <h3 className="px-3 px-lg-0">{wallpaper.desc}</h3>
        <Link href="/bingwallpapers/[id]" as={`/bingwallpapers/${wallpaper.id}`}>
          <a><img className="img-fluid" src={`https://images.sonurai.com/${wallpaper.name}_th.jpg`} alt={wallpaper.desc}/></a>
        </Link>
        <div className="px-3 px-lg-0">{moment(wallpaper.date, 'YYYYMMDD').format('MMMM Do YYYY')}</div>
      </div>
    ))}
  </Layout>
)

Wallpapers.getInitialProps = async function(context) {
  const { page } = context.query

  try {
    const data = await apiClient.getWallpapers(page)
    return {
      page: page,
      wallpapers: data.wallpapers
    }
  } catch (err) {
    console.log(err)
  }
}

export default Wallpapers
