"use client";

import Image from "next/image";
import Link from "next/link";
import { Wallpaper } from "@/libs/Client";
import { colorsToDataURL } from "@/libs/image";

// Bing image sizes with ~16:9 aspect ratio only
const BING_SIZES = [
  { width: 1366, suffix: "1366x768" },
  { width: 1920, suffix: "1920x1080" },
  { width: 3840, suffix: "UHD" },
] as const;

function bingLoader({ src, width }: { src: string; width: number }): string {
  const match = BING_SIZES.find((s) => s.width >= width);
  const suffix = match ? match.suffix : "UHD";
  const httpsUrl = src.replace("http://", "https://");
  return `${httpsUrl}_${suffix}.jpg`;
}

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
