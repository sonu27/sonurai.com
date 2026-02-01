"use client";

import Image from "next/image";
import Link from "next/link";
import { Wallpaper } from "@/libs/Client";
import { bingLoader, colorsToDataURL } from "@/libs/image";

export default function WallpaperList({
  wallpapers,
}: {
  wallpapers: Wallpaper[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
      {wallpapers.map(({ id, title, colors, urlBase }, i) => (
        <figure key={id} className="wallpaper relative mb-12 md:mb-0 last:mb-0">
          <Link prefetch={false} href={`/bingwallpapers/${id}`} title={title}>
            {urlBase ? (
              <Image
                src={urlBase}
                loader={bingLoader}
                width={1920}
                height={1080}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                priority={i < 3}
                alt={`Bing Wallpaper: ${title}`}
                placeholder={colors?.length ? colorsToDataURL(colors) : undefined}
              />
            ) : (
              <Image
                src={`https://images.sonurai.com/${id}.jpg`}
                width={1920}
                height={1200}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                priority={i < 3}
                alt={`Bing Wallpaper: ${title}`}
                placeholder={colors?.length ? colorsToDataURL(colors) : undefined}
              />
            )}
            <figcaption className="caption md:hidden md:absolute md:bottom-0 md:left-0 content-margin md:p-4 mt-3 md:mt-0 md:h-full md:w-full md:text-2xl md:bg-black/80 md:text-white">
              {title}
            </figcaption>
          </Link>
        </figure>
      ))}
    </div>
  );
}
