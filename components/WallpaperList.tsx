import { Wallpaper } from "@/libs/Client";
import WallpaperCard from "@/components/WallpaperCard";

export default function WallpaperList({
  wallpapers,
}: {
  wallpapers: Wallpaper[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
      {wallpapers.map(({ id, title, colors, urlBase }, i) => (
        <WallpaperCard
          key={id}
          id={id}
          title={title}
          colors={colors}
          urlBase={urlBase}
          priority={i < 3}
        />
      ))}
    </div>
  );
}
