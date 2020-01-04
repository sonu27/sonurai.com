import algoliasearch from 'algoliasearch'

const client = algoliasearch('QAQQSPXMWF', '9d20f264afd11c7c1507a7ab36225b59')
const index = client.initIndex('prod_wallpapers')

const attributesToRetrieve = [
  'description',
  'copyright',
  'date',
  'name',
  'oldId',
];

async function getWallpapers(page) {
  return index.search(
    {
      query: '',
      attributesToRetrieve: attributesToRetrieve,
      hitsPerPage: 10,
      page: page - 1,
    }
  )
}

async function getWallpaper(id) {
  return index.search(
    {
      query: '',
      numericFilters: [`oldId=${id}`],
      attributesToRetrieve: attributesToRetrieve,
    }
  )
  // return index.getObject(id, attributesToRetrieve)
}

function toWallpaper(v) {
  return {
    id: v.oldId,
    name: v.name,
    desc: v.description,
    copyright: v.copyright,
    date: v.date,
  }
}

function hitsToWallpapers(hits) {
  return hits.map(toWallpaper)
}

export default class Api {
  async getWallpapers(page) {
    const res = await getWallpapers(page)
    const wallpapers = hitsToWallpapers(res.hits)

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
    const res = await getWallpaper(id)

    return {
      wallpaper: hitsToWallpapers(res.hits)[0],
    }
  }
}
