const apiUrl = process.env.NEXT_PUBLIC_API_URL

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

class Client {
  async getWallpapers(startAfterDate, startAfterID, prev) {
    let url = `${apiUrl}/wallpapers`

    if (startAfterDate && startAfterID) {
      url = `${url}?startAfterDate=${startAfterDate}&startAfterID=${startAfterID}`

      if (prev) {
        url = `${url}&prev=1`
      }
    }

    const res = await fetch(url)
    const json = await res.json()

    if (json.data === null) {
      return {
        wallpapers: []
      }
    }

    const wallpapers = json.data.map(apiToWallpaper)

    const first = wallpapers[0]
    const last = wallpapers[wallpapers.length - 1]
    return {
      pagination: {
        prev: {
          date: first.date,
          id: first.id,
        },
        next: {
          date: last.date,
          id: last.id,
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

const client = new Client()

export default client
