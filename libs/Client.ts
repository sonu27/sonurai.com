const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export type Wallpaper = {
  id: string;
  title: string;
  copyright: string;
  date: string;
  tags: string[];
};

function apiToWallpaper(v: Wallpaper): Wallpaper {
  return {
    id: v.id,
    title: v.title,
    copyright: v.copyright,
    date: v.date,
    tags: v.tags,
  };
}

class Client {
  async getWallpapers(
    startAfterDate?: string,
    startAfterID?: string,
    prev?: boolean,
  ) {
    let url = `${apiUrl}/wallpapers`;

    if (startAfterDate && startAfterID) {
      url = `${url}?startAfterDate=${startAfterDate}&startAfterID=${startAfterID}`;

      if (prev) {
        url = `${url}&prev=1`;
      }
    }

    const res = await fetch(url, { next: { revalidate: 0 } });
    if (res.status === 404) {
      return { wallpapers: [] };
    }

    const json = await res.json();
    const wallpapers = json.data.map(apiToWallpaper);

    const first = wallpapers[0];
    const last = wallpapers[wallpapers.length - 1];
    return {
      wallpapers: wallpapers,
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
    };
  }

  async getWallpapersByTag(tag: string) {
    const res = await fetch(`${apiUrl}/wallpapers/tags/${tag}`, {
      next: { revalidate: 604800 },
    });
    if (res.status === 404) {
      return { wallpapers: [] };
    }

    const json = await res.json();
    const wallpapers = json.data.map(apiToWallpaper);

    return {
      wallpapers: wallpapers,
      nextUrl: json.links?.next || "",
    };
  }

  async getTags() {
    const res = await fetch(`${apiUrl}/wallpapers/tags`, {
      cache: "force-cache",
    });
    const tags: object = await res.json();

    return tags;
  }

  async nextFn(
    url: string,
  ): Promise<{ wallpapers: Wallpaper[]; nextUrl: string }> {
    const res = await fetch(`${apiUrl}${url}`, {
      next: { revalidate: 604800 },
    });
    if (res.status === 404) {
      return { wallpapers: [], nextUrl: "" };
    }

    const json = await res.json();
    const wallpapers = json.data.map(apiToWallpaper);

    return {
      wallpapers: wallpapers,
      nextUrl: json.links?.next || "",
    };
  }

  async getWallpaper(id: string) {
    const res = await fetch(`${apiUrl}/wallpapers/${id}`, {
      next: { revalidate: 604800 },
    });
    if (res.status === 404) {
      return { wallpaper: null };
    }

    const json = await res.json();

    return {
      wallpaper: apiToWallpaper(json),
    };
  }
}

const client = new Client();

export { client };
