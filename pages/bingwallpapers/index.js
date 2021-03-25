import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from 'components/Layout'
import { useAuth } from 'components/AuthProvider'
import client from 'libs/Client'
import { intToDate } from 'libs/date'

const getUrlPrev = (p) => `/bingwallpapers?startAfterDate=${p.startAfterDate}&startAfterID=${p.startAfterID}&prev=1`
const getUrlNext = (p) => `/bingwallpapers?startAfterDate=${p.startAfterDate}&startAfterID=${p.startAfterID}`

const Pagination = ({ pagination }) => (
  <ul className="col pagination px-3 px-lg-0">
    <li className="page-item"><Link href={getUrlPrev(pagination.prev)}><a className="page-link">Prev</a></Link></li>
    <li className="page-item"><Link href={getUrlNext(pagination.next)}><a className="page-link">Next</a></Link></li>
  </ul>
)

export default function Wallpapers({ wallpapers, pagination }) {
  const { user } = useAuth()
  console.log(user)
  return (
    <Layout>
      <Head>
        <title key="title">Bing Wallpapers - {process.env.NEXT_PUBLIC_NAME}</title>
        <meta name="description" content="Bing Wallpapers" />
      </Head>
      <h1 className="px-3 px-lg-0">Bing Wallpapers</h1>
      {wallpapers.map(({ id, title, date, filename }) => (
        <div key={id} className="wallpaper">
          <h2 className="px-3 px-lg-0">{title}</h2>
          <Link href={`/bingwallpapers/${id}`}>
            <a title={title}>
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

export async function getServerSideProps({ query }) {
  const { startAfterDate, startAfterID, prev } = query
  const reverse = (prev === '1')

  if (startAfterDate && startAfterID && (!startAfterDate || !startAfterID)) {
    return { redirect: { destination: '/bingwallpapers', permanent: false } }
  }

  const data = await client.getWallpapers(startAfterDate, startAfterID, reverse)
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
