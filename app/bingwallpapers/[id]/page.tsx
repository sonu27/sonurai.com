import { Fragment } from 'react'
import { notFound } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import { client, Wallpaper } from '../../../libs/Client'
import { intToDate } from '../../../libs/date'

const domain = process.env.NEXT_PUBLIC_URL

export default async function Page({ params }: {
  params: { id: string },
}) {
  const data = await client.getWallpaper(params.id)
  if (!data.wallpaper) {
    return notFound()
  }

  const { id, filename, title, copyright, date, tags } = data.wallpaper

  if (!isNaN(Number(id))) {
    return { redirect: { destination: `/bingwallpapers/${id}`, permanent: true } }
  }

  const t = Object.entries(tags).sort((a: any, b: any) => b[1] - a[1])
  const tagFields = t.map((l, i) => (
    <Fragment key={i}><Link prefetch={false} href={`/bingwallpapers/tags/${l[0]}`} className="leading-10 whitespace-nowrap px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white">{l[0]}</Link> </Fragment>
  ))

  return (
    <>
      <Image
        className="img-fluid"
        priority={true}
        unoptimized={true}
        src={`https://images.sonurai.com/${filename}.jpg`}
        width={1920}
        height={1200}
        alt={title}
      />
      <h1 className="caption text-2xl text-white mx-4 md:mx-0">{title}</h1>
      <p className="text-gray-400 mx-4 md:mx-0">{copyright} - {intToDate(date)}</p>
      <p className="mt-2 mx-4 md:mx-0">{tagFields}</p>
    </>
  )
}

//todo: revalidate: 604800
