import Head from 'next/head'
import Link from 'next/link'
import { client } from '../../libs/Client'
import Layout from '../../components/Layout'
import WallpaperList from '../../components/WallpaperList'

const getUrlPrev = (p: any) => `/bingwallpapers?date=${p.date}&id=${p.id}&prev=1`
const getUrlNext = (p: any) => `/bingwallpapers?date=${p.date}&id=${p.id}`

const Pagination = ({ pagination }: any) => (
  <div className="my-4 mx-2 md:mx-0">
    <Link href={getUrlPrev(pagination.prev)}><a className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white">Prev</a></Link>
    <Link href={getUrlNext(pagination.next)}><a className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white ml-1">Next</a></Link>
  </div>
)

export default function Wallpapers({ wallpapers, pagination }: any) {
  return (
    <Layout>
      <Head>
        <title key="title">Bing Wallpapers - {process.env.NEXT_PUBLIC_NAME}</title>
        <meta name="description" content="Bing Wallpapers" />
      </Head>
      <h1 className="text-3xl mb-2 text-white mx-2 md:mx-0">Bing Wallpapers</h1>
      <WallpaperList wallpapers={wallpapers} />
      <Pagination pagination={pagination} />
    </Layout>
  )
}

export async function getServerSideProps({ query }: any) {
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
