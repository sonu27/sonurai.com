const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

type WallpaperListResponse = {
  data?: Wallpaper[];
  links?: { next?: string };
};

// A 4xx means the resource is unknown or the request was malformed, which for
// this site is indistinguishable from "not found". A 5xx is an upstream outage
// and must keep throwing, so it is never cached and served as a 404.
async function fetchJson<T>(url: string, init: RequestInit): Promise<T | null> {
  const res = await fetch(url, init);

  if (res.status >= 400 && res.status < 500) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Request to ${url} failed with status ${res.status}`);
  }

  return (await res.json()) as T;
}

export type Wallpaper = {
  id: string;
  title: string;
  copyright: string;
  date: number;
  tags: Record<string, number>;
  colors?: string[];
  urlBase?: string;
};

export async function getWallpapers(
  startAfterDate?: string,
  startAfterID?: string,
  prev?: boolean,
) {
  let url = `${apiUrl}/wallpapers`;

  const isPaginated = Boolean(startAfterDate && startAfterID);

  if (startAfterDate && startAfterID) {
    const query = new URLSearchParams({ startAfterDate, startAfterID });

    if (prev) {
      query.set("prev", "1");
    }

    url = `${url}?${query}`;
  }

  const revalidate = isPaginated ? 86400 : 3600; // 24h for pagination, 1h for main
  const json = await fetchJson<WallpaperListResponse>(url, {
    next: { revalidate },
  });

  const wallpapers = json?.data ?? [];
  const first = wallpapers[0];
  const last = wallpapers[wallpapers.length - 1];

  if (!first || !last) {
    return { wallpapers: [] };
  }

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

export async function getWallpapersByTag(tag: string) {
  const json = await fetchJson<WallpaperListResponse>(
    `${apiUrl}/wallpapers/tags/${encodeURIComponent(tag)}`,
    { next: { revalidate: 604800 } },
  );

  return {
    wallpapers: json?.data ?? [],
    nextUrl: json?.links?.next || "",
  };
}

export async function getTags(): Promise<Record<string, number>> {
  const tags = await fetchJson<Record<string, number>>(
    `${apiUrl}/wallpapers/tags`,
    { cache: "force-cache" },
  );

  return tags ?? {};
}

export async function fetchNextPage(
  url: string,
): Promise<{ wallpapers: Wallpaper[]; nextUrl: string }> {
  const json = await fetchJson<WallpaperListResponse>(`${apiUrl}${url}`, {
    next: { revalidate: 604800 },
  });

  return {
    wallpapers: json?.data ?? [],
    nextUrl: json?.links?.next || "",
  };
}

export async function getWallpaper(id: string) {
  const wallpaper = await fetchJson<Wallpaper>(
    `${apiUrl}/wallpapers/${encodeURIComponent(id)}`,
    { next: { revalidate: 604800 } },
  );

  return { wallpaper };
}

export async function getRelatedWallpapers(
  currentId: string,
  tags: Record<string, number>,
  limit: number = 6
): Promise<Wallpaper[]> {
  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);
  if (sortedTags.length === 0) return [];

  const topTag = sortedTags[0][0];
  try {
    const data = await getWallpapersByTag(topTag);
    return data.wallpapers.filter((w) => w.id !== currentId).slice(0, limit);
  } catch {
    return [];
  }
}
