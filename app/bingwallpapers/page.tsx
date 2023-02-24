import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { client } from '../../libs/Client'
import WallpaperList from '../../components/WallpaperList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`,
  description: `Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`,
};

function Pagination({ pagination }: any) {
  const getUrlPrev = (p: any) => `/bingwallpapers?date=${p.date}&id=${p.id}&prev=1`
  const getUrlNext = (p: any) => `/bingwallpapers?date=${p.date}&id=${p.id}`
  return (
    <div className="pagination my-4 mx-4 md:mx-0">
      <Link href={getUrlPrev(pagination.prev)} className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white">Prev</Link>
      <Link href={getUrlNext(pagination.next)} className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white ml-1">Next</Link>
    </div>
  )
}

export default async function Page({ params, searchParams }: {
  params: {},
  searchParams?: { id: string, date: string, prev: string }
}) {
  const date = searchParams?.date
  const id = searchParams?.id
  const prev = searchParams?.prev
  const reverse = (prev === '1')

  if (date && id && (!date || !id)) {
    redirect('/bingwallpapers')
  }

  const data = await client.getWallpapers(date, id, reverse)
  if (data.wallpapers.length === 0) {
    notFound()
  }

  return (
    <>
      <h1 className="text-3xl mb-2 text-white mx-4 md:mx-0">Bing Wallpapers</h1>
      <WallpaperList wallpapers={data.wallpapers} />
      <Pagination pagination={data.pagination} />
    </>
  )
}
