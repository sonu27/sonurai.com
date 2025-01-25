import type { Metadata } from "next";
import { Search } from "@/components/WallpaperSearch";

export const metadata: Metadata = {
  title: `Search - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`,
  description: `Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`,
  robots: { follow: true, index: false },
};

export default function WallpaperSearch() {
  return (
    <>
      <h1 className="text-3xl mb-2 text-white mx-4 md:mx-0">
        Search - Bing Wallpapers
      </h1>
      <Search />
    </>
  );
}
