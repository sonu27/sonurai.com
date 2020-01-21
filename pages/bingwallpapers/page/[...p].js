import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import Layout from '../../../components/Layout'
import Api from '../../../libs/Api'

const apiClient = new Api()

const url = '/bingwallpapers/page/[...p]'
const getUrl = (page) => `/bingwallpapers/page/${page}`
const getUrl2 = (p) => `/bingwallpapers/page/${p.page}/${p.startAfterDate}/${p.startAfterID}`

const Pagination = ({ pagination }) => (
  <ul className="col pagination">
    <li className={pagination.prev.page < 1 ? "page-item disabled" : "page-item"}><Link href={url} as={getUrl(pagination.prev.page)}><a className="page-link">Prev</a></Link></li>
    <li className="page-item"><Link href={url} as={getUrl2(pagination.next)}><a className="page-link">Next</a></Link></li>
  </ul>
)

const Wallpapers = ({ page, wallpapers, pagination }) => (
  <Layout>
    <Head>
      <title key="title">Bing Wallpapers - Page {page} - Sonu Rai</title>
    </Head>
    <h1 className="title px-3 px-lg-0">Bing Wallpapers</h1>
    {wallpapers.map(({ id, title, date, filename }) => (
      <div key={id} className="wallpaper">
        <h3 className="px-3 px-lg-0">{title}</h3>
        <Link href="/bingwallpapers/[id]" as={`/bingwallpapers/${id}`}>
          <a><img className="img-fluid" src={`https://images.sonurai.com/${filename}_th.jpg`} alt={title}/></a>
        </Link>
        <div className="px-3 px-lg-0">{moment(date, 'YYYYMMDD').format('MMMM Do YYYY')}</div>
      </div>
    ))}
    <Pagination pagination={pagination} />
  </Layout>
)

Wallpapers.getInitialProps = async function({ query, res }) {
  try {
    const { p } = query
    const page = p[0]

    if (page < 1) {
      res.statusCode = 404
      res.end('Not found')
      return
    }

    const data = await apiClient.getWallpapers(page, p[1], p[2])

    if (data.wallpapers.length === 0) {
      res.statusCode = 404
      res.end('Not found')
      return
    }

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
