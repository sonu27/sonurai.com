import Link from 'next/link'
import { client } from '../../libs/Client'
import Layout from '../../components/Layout'
import WallpaperList from '../../components/WallpaperList'

export default function Wallpapers({ wallpapers, pagination }: any) {
  const pageTitle = `Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`
  return (
    <Layout pageTitle={pageTitle}>
      <h1 className="text-3xl mb-2 text-white mx-4 md:mx-0">Bing Wallpapers</h1>
      <WallpaperList wallpapers={wallpapers} />
      <Pagination pagination={pagination} />
    </Layout>
  )
}

function Pagination ({ pagination }: any) {
  const getUrlPrev = (p: any) => `/bingwallpapers?date=${p.date}&id=${p.id}&prev=1`
  const getUrlNext = (p: any) => `/bingwallpapers?date=${p.date}&id=${p.id}`

  return (
    <div className="pagination my-4 mx-4 md:mx-0">
      <Link href={getUrlPrev(pagination.prev)} className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white">Prev</Link>
      <Link href={getUrlNext(pagination.next)} className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white ml-1">Next</Link>
    </div>
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
