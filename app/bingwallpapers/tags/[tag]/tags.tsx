"use client";
import { useState } from "react";
import WallpaperList from "@/components/WallpaperList";
import { fetchNextPage, Wallpaper } from "@/libs/Client";

export default function LoadWallpapers({
  nextUrl,
  limit,
}: {
  nextUrl: string;
  limit: number;
}) {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [next, setNext] = useState(nextUrl);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const res = await fetchNextPage(next);
      setNext(res.nextUrl);
      if (res.wallpapers.length > 0) {
        setWallpapers([...wallpapers, ...res.wallpapers]);
        if (res.wallpapers.length < limit) {
          setNext("");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <WallpaperList wallpapers={wallpapers} />
      <div className="pagination my-4 mx-4 md:mx-0">
        {next !== "" && (
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "More"}
          </button>
        )}
      </div>
    </>
  );
}
