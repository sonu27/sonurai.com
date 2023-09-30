import Link from 'next/link'
import Head from 'next/head'
import { client } from '../../libs/Client'
import Layout from '../../components/Layout'
import WallpaperList from '../../components/WallpaperList'

export default function Wallpapers({ wallpapers, pagination }: any) {
  const pageTitle = `Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`
  return (
    <Layout pageTitle={pageTitle}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <h1 className="text-3xl mb-2 text-white mx-4 md:mx-0">Bing Wallpapers</h1>
      <p className="mb-2 mt-2 mx-4 md:mx-0">This project is looking for sponsorship for hosting costs. Email me on sonu [at] sonurai.com if interested</p>
      <WallpaperList wallpapers={wallpapers} />
      <Pagination pagination={pagination} />
    </Layout>
  )
}

function Pagination ({ pagination }: any) {
  const getUrlPrev = (p: any) => `/bingwallpapers/page/${p.date}/${p.id}/prev`
  const getUrlNext = (p: any) => `/bingwallpapers/page/${p.date}/${p.id}`

  return (
    <div className="pagination my-4 mx-4 md:mx-0">
      <Link href={getUrlPrev(pagination.prev)} className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white">Prev</Link>
      <Link href={getUrlNext(pagination.next)} className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white ml-1">Next</Link>
    </div>
  )
}

export async function getServerSideProps({ query }: {
  query: { p?: string[] },
}) {
  const p = query?.p
  let date
  let id
  let reverse = false

  if (p) {
    if (p.length > 0 && p[0] !== 'page' || p.length < 3 || p.length > 4 || (p.length === 4 && p[3] !== 'prev')) {
      return { redirect: { destination: '/bingwallpapers', permanent: false } }
    }

    date = p[1]
    id = p[2]
    reverse = (p[3] === 'prev')
  }


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
