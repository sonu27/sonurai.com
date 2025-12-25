import Image from "next/image";
import Link from "next/link";
import { Wallpaper, colorsToDataURL } from "@/libs/Client";

export default function WallpaperList({
  wallpapers,
}: {
  wallpapers: Wallpaper[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
      {wallpapers.map(({ id, title, colors }, i) => (
        <figure key={id} className="wallpaper relative mb-12 md:mb-0 last:mb-0">
          <Link prefetch={false} href={`/bingwallpapers/${id}`} title={title}>
            <Image
              src={`https://images.sonurai.com/${id}.jpg`}
              width={1920}
              height={1200}
              priority={i < 3}
              alt={title}
              placeholder={colors?.length ? colorsToDataURL(colors) : undefined}
            />
            <figcaption className="caption md:hidden md:absolute md:bottom-0 md:left-0 mx-4 md:mx-0 md:p-4 mt-3 md:mt-0 md:h-full md:w-full md:text-2xl md:bg-black/80 md:text-white">
              {title}
            </figcaption>
          </Link>
        </figure>
      ))}
    </div>
  );
}
