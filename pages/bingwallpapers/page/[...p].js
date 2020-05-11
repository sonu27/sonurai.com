import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import Layout from 'components/Layout'
import Api from 'libs/Api'

const apiClient = new Api()

const url = '/bingwallpapers/page/[...p]'
const getUrlPrev = (p) => `/bingwallpapers/page/prev/${p.startAfterDate}/${p.startAfterID}`
const getUrlNext = (p) => `/bingwallpapers/page/next/${p.startAfterDate}/${p.startAfterID}`

const Pagination = ({ pagination }) => (
  <ul className="col pagination">
    <li className="page-item"><Link href={url} as={getUrlPrev(pagination.prev)}><a className="page-link">Prev</a></Link></li>
    <li className="page-item"><Link href={url} as={getUrlNext(pagination.next)}><a className="page-link">Next</a></Link></li>
  </ul>
)

const Wallpapers = ({ page, wallpapers, pagination }) => (
  <Layout>
    <Head>
      <title key="title">Bing Wallpapers - Sonu Rai</title>
    </Head>
    <h1 className="px-3 px-lg-0">Bing Wallpapers</h1>
    {wallpapers.map(({ id, title, date, filename }) => (
      <div key={id} className="wallpaper">
        <h2 className="px-3 px-lg-0">{title}</h2>
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
    const startAfterDate = p[1]
    const startAfterID = p[2]
    const prev = (page === 'prev')

    if (page !== '1' && (!startAfterDate || !startAfterID)) {
      if (res) {
        res.writeHead(302, {
          Location: '/bingwallpapers/page/1'
        })
        res.end()
      } else {
        Router.push('/bingwallpapers/page/1')
      }
    }

    const data = await apiClient.getWallpapers(startAfterDate, startAfterID, prev)

    if (data.wallpapers.length === 0) {
      if (res) {
        res.statusCode = 404
        res.end('Not found')
      }
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
