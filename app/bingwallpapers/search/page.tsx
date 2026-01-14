import type { Metadata } from "next";
import { Search } from "@/components/WallpaperSearch";

export const metadata: Metadata = {
  title: `Search - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`,
  description: `Search Bing Wallpapers by keyword. Find and download free HD desktop wallpapers.`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/bingwallpapers/search`,
  },
};

export default function WallpaperSearch() {
  return (
    <>
      <h1 className="text-3xl mb-2 text-white content-margin">
        Search - Bing Wallpapers
      </h1>
      <Search />
    </>
  );
}
