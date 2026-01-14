import { Fragment } from "react";
import Link from "next/link";
import { getTags } from "@/libs/Client";
import type { Metadata } from "next";

const pageTitle = `Tags - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`;

export const metadata: Metadata = {
  title: pageTitle,
  description: "Browse all tags for Bing Wallpapers. Discover wallpapers organized by category, theme, and subject matter.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/bingwallpapers/tags`,
  },
};

export default async function Page() {
  const t = await getTags();
  const tags = Object.entries(t);
  const max = tags.reduce((a, c) => Math.max(a, c[1]), 0);
  const min = tags.reduce((a, c) => Math.min(a, c[1]), max);
  const tagFields = tags.map((l, i) => {
    const normalised = ((l[1] - min) / (max - min)) * 4.2 + 1;
    return (
      <Fragment key={i}>
        <Link
          prefetch={false}
          href={`/bingwallpapers/tags/${l[0]}`}
          className="px-2 py-1 leading-[3rem] rounded-md text-gray-300 hover:bg-slate-700 hover:text-white"
          style={{ fontSize: normalised + "em" }}
        >
          {l[0]}
        </Link>{" "}
      </Fragment>
    );
  });

  return (
    <>
      <h1 className="text-3xl mb-2 text-white mx-4 md:mx-0">
        Tags - Bing Wallpapers
      </h1>
      <div className="mx-2 md:mx-0">{tagFields}</div>
    </>
  );
}
