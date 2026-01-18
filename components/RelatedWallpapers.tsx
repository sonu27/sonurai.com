import WallpaperList from "@/components/WallpaperList";
import { Wallpaper } from "@/libs/Client";

export default function RelatedWallpapers({
  wallpapers,
}: {
  wallpapers: Wallpaper[];
}) {
  if (wallpapers.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-xl text-white mb-4 content-margin md:text-2xl">
        Related Wallpapers
      </h2>
      <WallpaperList wallpapers={wallpapers} />
    </section>
  );
}
