import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from 'components/Layout'
import LikesContext from 'components/LikesContext'
import WallpaperList from 'components/WallpaperList'
import client from 'libs/Client'

export default function Likes() {
  const likesContext = useContext(LikesContext)
  const likes = likesContext.likes
  const [wallpapers, setWallpapers] = useState([])

  useEffect(() => {
    let l = Object.entries(likes)
    l.sort((a, b) => a[1] - b[1])
    let wallpaperPromises = l.map(async (like) => {
      const res = await client.getWallpaper(like[0])
      return res.wallpaper
    })
    
    Promise.all(wallpaperPromises).then((values) => {
      setWallpapers(values)
    })
  }, [likes])

  return (
    <Layout>
      <Head>
        <title key="title">
          Your Likes - Bing Wallpapers - {process.env.NEXT_PUBLIC_NAME}
        </title>
      </Head>
      <h1 className="px-3 px-lg-0">Your Likes - Bing Wallpapers</h1>
      <WallpaperList wallpapers={wallpapers} />
    </Layout>
  )
}
