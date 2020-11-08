import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from 'components/Layout'
import Api from 'libs/Api'
import { intToDate } from 'libs/date'

const apiClient = new Api()

const getUrlPrev = (p) => `/bingwallpapers/page/prev/${p.startAfterDate}/${p.startAfterID}`
const getUrlNext = (p) => `/bingwallpapers/page/next/${p.startAfterDate}/${p.startAfterID}`

const Pagination = ({ pagination }) => (
  <ul className="col pagination">
    <li className="page-item"><Link href={getUrlPrev(pagination.prev)}><a className="page-link">Prev</a></Link></li>
    <li className="page-item"><Link href={getUrlNext(pagination.next)}><a className="page-link">Next</a></Link></li>
  </ul>
)

export default function Wallpapers({ page, wallpapers, pagination }) {
  return (
    <Layout>
      <Head>
        <title key="title">Bing Wallpapers - Sonu Rai</title>
      </Head>
      <h1 className="px-3 px-lg-0">Bing Wallpapers</h1>
      {wallpapers.map(({ id, title, date, filename }) => (
        <div key={id} className="wallpaper">
          <h2 className="px-3 px-lg-0">{title}</h2>
          <Link href={`/bingwallpapers/${id}`}>
            <a>
              <Image
                className="img-fluid"
                src={`https://images.sonurai.com/${filename}_th.jpg`}
                width="1920"
                height="1080"
                alt={title}
              />
            </a>
          </Link>
          <div className="px-3 px-lg-0">{intToDate(date)}</div>
        </div>
      ))}
      <Pagination pagination={pagination} />
    </Layout>
  )
}

export async function getServerSideProps({ query, res }) {
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
    props: {
      page: page,
      wallpapers: data.wallpapers,
      pagination: data.pagination,
    }
  }
}
