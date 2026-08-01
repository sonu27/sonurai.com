import { notFound } from "next/navigation";
import WallpaperList from "@/components/WallpaperList";
import { getWallpapersByTag } from "@/libs/Client";
import LoadWallpapers from "./LoadWallpapers";
import type { Metadata } from "next";

// Next hands the page component the raw path segment but hands
// generateMetadata an already-decoded one, so an incoming value is not
// guaranteed to be valid percent-encoding. Fall back to it unchanged rather
// than letting decodeURIComponent throw, which would turn a tag such as
// "100%" into a 500.
function decodeTag(tag: string): string {
  try {
    return decodeURIComponent(tag);
  } catch {
    return tag;
  }
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const decodedTag = decodeTag(params.tag);
  return {
    title: `Tagged "${decodedTag}" - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`,
    description: `Browse and download free HD wallpapers tagged with "${decodedTag}" from Bing's daily wallpaper collection.`,
    alternates: {
      // Re-encode rather than echoing the incoming segment, so alternative
      // encodings of the same tag all point at one canonical URL.
      canonical: `${process.env.NEXT_PUBLIC_URL}/bingwallpapers/tags/${encodeURIComponent(decodedTag)}`,
    },
  };
}

export default async function Page(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const decodedTag = decodeTag(params.tag);
  const limit = 36;
  const data = await getWallpapersByTag(decodedTag);
  if (data.wallpapers.length === 0) {
    notFound();
  }
  return (
    <>
      <h1 className="text-3xl mb-2 text-white my-4 content-margin">
        Wallpapers tagged with &quot;{decodedTag}&quot;
      </h1>
      <WallpaperList wallpapers={data.wallpapers} />
      <LoadWallpapers nextUrl={data.nextUrl} limit={limit} />
    </>
  );
}
