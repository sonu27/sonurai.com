"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { bingLoader, colorsToDataURL } from "@/libs/image";

type WallpaperCardProps = {
  id: string;
  title: string;
  colors?: string[];
  urlBase?: string;
  priority?: boolean;
  // The search results highlight the matched part of the title, so they render
  // their own caption instead of the plain string.
  caption?: ReactNode;
  onClick?: () => void;
};

export default function WallpaperCard({
  id,
  title,
  colors,
  urlBase,
  priority = false,
  caption,
  onClick,
}: WallpaperCardProps) {
  // Bing serves 16:9 and resizes through the loader; the legacy host only has
  // the one 1920x1200 original.
  const imageProps = urlBase
    ? { src: urlBase, loader: bingLoader, height: 1080 }
    : { src: `https://images.sonurai.com/${id}.jpg`, height: 1200 };

  return (
    <figure className="wallpaper relative mb-12 md:mb-0 last:mb-0">
      <Link
        prefetch={false}
        href={`/bingwallpapers/${id}`}
        title={title}
        onClick={onClick}
      >
        <Image
          {...imageProps}
          width={1920}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={priority}
          alt={`Bing Wallpaper: ${title}`}
          placeholder={colors?.length ? colorsToDataURL(colors) : undefined}
        />
        <figcaption className="caption md:hidden md:absolute md:bottom-0 md:left-0 content-margin md:p-4 mt-3 md:mt-0 md:h-full md:w-full md:text-2xl md:bg-black/80 md:text-white">
          {caption ?? title}
        </figcaption>
      </Link>
    </figure>
  );
}
