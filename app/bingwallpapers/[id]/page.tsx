import { Fragment } from 'react'
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import { client } from '../../../libs/Client'
import { intToDate } from '../../../libs/date'
import type { Metadata } from 'next'

const domain = process.env.NEXT_PUBLIC_URL

export async function generateMetadata({ params }: {
  params: { id: string },
}): Promise<Metadata> {
  const data = await client.getWallpaper(params.id)
  if (!data.wallpaper) {
    return {}
  }

  const { id, title, copyright, tags } = data.wallpaper
  const pageTitle = `${title} - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`
  const desc = `${title} ${copyright}`
  const t = Object.entries(tags).sort((a: any, b: any) => b[1] - a[1])

  return {
    title: pageTitle,
    description: desc,
    keywords: t.reduce((a, c) => `${a}, ${c[0]}`, ''),
    twitter: {
      card: "summary_large_image",
    },
    openGraph: {
      title: pageTitle,
      description: desc,
      images: [`https://images.sonurai.com/${id}.jpg`],
    }
  }
};

export default async function Page({ params }: {
  params: { id: string },
}) {
  const data = await client.getWallpaper(params.id)
  if (data.wallpaper == undefined) {
    notFound()
  }

  const { id, title, copyright, date, tags } = data.wallpaper

  if (!isNaN(Number(id))) {
    redirect(`/bingwallpapers/${id}`)
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
        src={`https://images.sonurai.com/${id}.jpg`}
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
