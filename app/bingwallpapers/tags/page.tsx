import { getTags } from "@/libs/Client";
import TagCloud from "./TagCloud";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Tags - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`,
  description: "Browse all tags for Bing Wallpapers. Discover wallpapers organized by category, theme, and subject matter.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/bingwallpapers/tags`,
  },
};

export default async function Page() {
  const t = await getTags();
  const tags = Object.entries(t).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <h1 className="text-3xl mb-4 text-white content-margin">Tags</h1>
      <TagCloud tags={tags} />
    </>
  );
}
