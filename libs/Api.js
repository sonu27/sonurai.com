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
  async getWallpapers(page, startAfterDate, startAfterID) {
    const offset = (page * 10) - 10
    let url = `${apiUrl}/wallpapers?offset=${offset}`
    if (startAfterDate && startAfterID) {
      url = `${apiUrl}/wallpapers?startAfterDate=${startAfterDate}&startAfterID=${startAfterID}`
    }
    const res = await fetch(url)
    const json = await res.json()
    const wallpapers = json.data.map(apiToWallpaper)

    // const first = wallpapers[0]
    const last = wallpapers[wallpapers.length - 1]
    return {
      pagination: {
        prev: {
          page: parseInt(page) - 1,
          // startAfterDate: first.date,
          // startAfterID: first.id,
        },
        next: {
          page: parseInt(page) + 1,
          startAfterDate: last.date,
          startAfterID: last.id,
        },
      },
      wallpapers: wallpapers
    }
  }

  async getWallpaper(id) {
    const res = await fetch(`${apiUrl}/wallpapers/${id}`)
    if (res.status === 404) {
      return { wallpaper: null }
    }

    const json = await res.json()

    return {
      wallpaper: apiToWallpaper(json),
    }
  }
}
