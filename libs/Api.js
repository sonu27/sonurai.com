import fetch from 'isomorphic-unfetch'

const apiUrl = process.env.API_URL

function toWallpaper(v) {
  return {
    id: v.oldId,
    name: v.name,
    desc: v.description,
    copyright: v.copyright,
    date: v.date,
  }
}

function apiToWallpaper(v) {
  return {
    id: v.id,
    title: v.title,
    copyright: v.copyright,
    date: v.date,
    filename: v.filename,
    labelAnnotations: v.labelAnnotations || [],
  }
}

export default class Api {
  async getWallpapers(page) {
    const offset = (page * 10) - 10
    const res = await fetch(`${apiUrl}/wallpapers?offset=${offset}`)
    const json = await res.json()
    const wallpapers = json.data.map(apiToWallpaper)

    return {
      pagination: {
        prev: parseInt(page) - 1,
        current: page,
        next: parseInt(page) + 1,
      },
      wallpapers: wallpapers
    }
  }

  async getWallpaper(id) {
    const res = await fetch(`${apiUrl}/wallpapers/${id}`)
    const json = await res.json()

    return {
      wallpaper: apiToWallpaper(json),
    }
  }
}
