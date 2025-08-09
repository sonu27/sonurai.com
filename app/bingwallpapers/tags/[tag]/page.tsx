import { notFound } from "next/navigation";
import WallpaperList from "@/components/WallpaperList";
import { client } from "@/libs/Client";
import LoadWallpapers from "./tags";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag);
  return {
    title: `Tagged "${decodedTag}" - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`,
    description: `Download wallpapers tagged with "${decodedTag}" from Bing.`,
  };
}

export default async function Page({ params }: { params: { tag: string } }) {
  const decodedTag = decodeURIComponent(params.tag);
  const limit = 36;
  const data = await client.getWallpapersByTag(decodedTag);
  if (data.wallpapers.length === 0) {
    notFound();
  }
  return (
    <>
      <h1 className="text-3xl mb-2 text-white my-4 mx-4 md:mx-0">
        Wallpapers tagged with &quot;{decodedTag}&quot;
      </h1>
      <WallpaperList wallpapers={data.wallpapers} />
      <LoadWallpapers nextUrl={data.nextUrl} limit={limit} />
    </>
  );
}
