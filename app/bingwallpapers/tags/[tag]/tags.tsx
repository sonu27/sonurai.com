"use client";
import { useState } from "react";
import WallpaperList from "@/components/WallpaperList";
import { client, Wallpaper } from "@/libs/Client";

export default function LoadWallpapers({
  nextUrl,
  limit,
}: {
  nextUrl: string;
  limit: number;
}) {
  const [wallpapers, setWallpapers] = useState([] as Wallpaper[]);
  const [next, setNext] = useState(nextUrl);
  const moreFn = async () => {
    const res = await client.nextFn(next);
    setNext(res.nextUrl);
    if (res.wallpapers.length > 0) {
      setWallpapers([...wallpapers, ...res.wallpapers]);
      if (res.wallpapers.length < limit) {
        setNext("");
      }
    }
  };
  return (
    <>
      <WallpaperList wallpapers={wallpapers} />
      <div className="pagination my-4 mx-4 md:mx-0">
        {next !== "" && (
          <button
            onClick={moreFn}
            className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
          >
            More
          </button>
        )}
      </div>
    </>
  );
}
