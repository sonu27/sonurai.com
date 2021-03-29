import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from 'components/Layout'
import client from 'libs/Client'
import { intToDate } from 'libs/date'

const getUrlPrev = (p) => `/bingwallpapers?date=${p.date}&id=${p.id}&prev=1`
const getUrlNext = (p) => `/bingwallpapers?date=${p.date}&id=${p.id}`

const Pagination = ({ pagination }) => (
  <ul className="col pagination px-3 px-lg-0">
    <li className="page-item"><Link href={getUrlPrev(pagination.prev)}><a className="page-link">Prev</a></Link></li>
    <li className="page-item"><Link href={getUrlNext(pagination.next)}><a className="page-link">Next</a></Link></li>
  </ul>
)

export default function Wallpapers({ wallpapers, pagination }) {
  return (
    <Layout>
      <Head>
        <title key="title">Bing Wallpapers - {process.env.NEXT_PUBLIC_NAME}</title>
        <meta name="description" content="Bing Wallpapers" />
      </Head>
      <h1 className="px-3 px-lg-0">Bing Wallpapers</h1>
      <div className="flex-container">
        {wallpapers.map(({ id, title, date, filename }) => (
          <div key={id} className="wallpaper flex-item">
            {/* <h2 className="px-3 px-lg-0">{title}</h2> */}
            <Link href={`/bingwallpapers/${id}`}>
              <a title={title}>
                <Image
                  className="img-fluid"
                  src={`https://images.sonurai.com/${filename}.jpg`}
                  width="1920"
                  height="1200"
                  alt={title}
                />
              </a>
            </Link>
            {/* <div className="px-3 px-lg-0">{intToDate(date)}</div> */}
          </div>
        ))}
      </div>
      <Pagination pagination={pagination} />
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const { date, id, prev } = query
  const reverse = (prev === '1')

  if (date && id && (!date || !id)) {
    return { redirect: { destination: '/bingwallpapers', permanent: false } }
  }

  const data = await client.getWallpapers(date, id, reverse)
  if (data.wallpapers.length === 0) {
    return { notFound: true }
  }

  return {
    props: {
      wallpapers: data.wallpapers,
      pagination: data.pagination,
    }
  }
}
