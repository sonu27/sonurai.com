import { notFound } from "next/navigation";
import WallpaperList from "../../../../components/WallpaperList";
import { client } from "../../../../libs/Client";
import LoadWallpapers from "./tags";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `Tagged "${params.tag}" - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`,
  };
}

export default async function Page(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const limit = 36;
  const data = await client.getWallpapersByTag(params.tag);
  if (data.wallpapers.length === 0) {
    notFound();
  }
  return (
    <>
      <h1 className="text-3xl mb-2 text-white my-4 mx-4 md:mx-0">
        Wallpapers tagged with &quot;{params.tag}&quot;
      </h1>
      <WallpaperList wallpapers={data.wallpapers} />
      <LoadWallpapers nextUrl={data.nextUrl} limit={limit} />
    </>
  );
}
