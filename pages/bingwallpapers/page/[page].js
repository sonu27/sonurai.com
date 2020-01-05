import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import moment from 'moment'
import Layout from '../../../components/Layout'
import Pagination from '../../../components/Pagination'
import Api from '../../../libs/Api'

const apiClient = new Api()

const handlePageClick = (page) => {
  Router.push(`/bingwallpapers/page/${page}`)
}

const Wallpapers = ({ page, wallpapers, pagination }) => (
  <Layout>
    <Head>
      <title key="title">Bing Wallpapers - Page {page} - Sonu Rai</title>
    </Head>
    <h1 className="title px-3 px-lg-0">Bing Wallpapers</h1>
    {wallpapers.map((wallpaper) => (
      <div key={wallpaper.id} className="wallpaper">
        <h3 className="px-3 px-lg-0">{wallpaper.desc}</h3>
        <Link href="/bingwallpapers/[id]" as={`/bingwallpapers/${wallpaper.id}`}>
          <a><img className="img-fluid" src={`https://images.sonurai.com/${wallpaper.name}_th.jpg`} alt={wallpaper.desc}/></a>
        </Link>
        <div className="px-3 px-lg-0">{moment(wallpaper.date, 'YYYYMMDD').format('MMMM Do YYYY')}</div>
      </div>
    ))}
    <Pagination pagination={pagination} handlePageChange={handlePageClick} />
  </Layout>
)

Wallpapers.getInitialProps = async function({ query, res }) {
  try {
    const { page } = query
    const data = await apiClient.getWallpapers(page)
    return {
      page: page,
      wallpapers: data.wallpapers,
      pagination: data.pagination,
    }
  } catch (err) {
    console.log(err)
  }
}

export default Wallpapers
