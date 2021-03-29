import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/Layout'
import WallpaperList from 'components/WallpaperList'
import client from 'libs/Client'

const getUrlPrev = (p) => `/bingwallpapers?date=${p.date}&id=${p.id}&prev=1`
const getUrlNext = (p) => `/bingwallpapers?date=${p.date}&id=${p.id}`

const Pagination = ({ pagination }) => (
  <ul className="pagination px-3 px-lg-0">
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
      <WallpaperList wallpapers={wallpapers} />
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
