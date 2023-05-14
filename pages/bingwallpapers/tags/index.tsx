import { Fragment } from 'react'
import Link from 'next/link'
import Layout from '../../../components/Layout'
import { client } from '../../../libs/Client'

export default function T({ tags, min, max }: { tags: [string, number][], min: number, max: number }) {
  const tagFields = tags.map((l, i) => {
    const normalised = (l[1] - min) / (max - min) * 4.2 + 1
    return (
      <Fragment key={i}><Link prefetch={false} href={`/bingwallpapers/tags/${l[0]}`} className="px-2 py-1 leading-[3rem] rounded-md text-gray-300 hover:bg-slate-700 hover:text-white" style={{"fontSize": normalised+"em"}}>{l[0]}</Link> </Fragment>
    )
  })

  const pageTitle = `Tags - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`
  return (
    <Layout pageTitle={pageTitle}>
      <h1 className="text-3xl mb-2 text-white mx-4 md:mx-0">Tags - Bing Wallpapers</h1>
      <div className="mx-2 md:mx-0">{tagFields}</div>
    </Layout>
  )
}

export async function getStaticProps() {
  const t = await client.getTags()
  let min = Number.MAX_VALUE
  let max = 0

  const tags: [string, number][] = []
  for (const [k, v] of Object.entries(t)) {
    if (v > max) {
      max = v
    }
    if (v < min) {
      min = v
    }
    tags.push([k, v])
  }

  return {
    props: {
      tags,
      min,
      max,
    },
    revalidate: 604800,
  }
}
