import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getWallpapers } from "@/libs/Client";
import WallpaperList from "@/components/WallpaperList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`,
  description: `Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`,
  robots: { follow: true, index: false },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/bingwallpapers`,
  },
};

type PaginationCursor = { date: string; id: string };

function Pagination({ prev, next }: { prev: PaginationCursor; next: PaginationCursor }) {
  return (
    <div className="pagination my-4 mx-4 md:mx-0">
      <Link
        href={`/bingwallpapers/page/${prev.date}/${prev.id}/prev`}
        className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
      >
        Prev
      </Link>
      <Link
        href={`/bingwallpapers/page/${next.date}/${next.id}`}
        className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white ml-1"
      >
        Next
      </Link>
    </div>
  );
}

export default async function Page(props: {
  params: Promise<{ p?: string[] }>;
  searchParams: Promise<object>;
}) {
  const params = await props.params;
  const p = params?.p;
  let date;
  let id;
  let reverse = false;

  if (p) {
    if (
      (p.length > 0 && p[0] !== "page") ||
      p.length < 3 ||
      p.length > 4 ||
      (p.length === 4 && p[3] !== "prev")
    ) {
      redirect("/bingwallpapers");
    }

    date = p[1];
    id = p[2];

    // Both date and id are required for pagination
    if (!date || !id) {
      redirect("/bingwallpapers");
    }

    reverse = p[3] === "prev";
  }

  const data = await getWallpapers(date, id, reverse);
  if (data.wallpapers.length === 0 || !data.pagination) {
    notFound();
  }

  return (
    <>
      <h1 className="text-3xl mb-2 text-white mx-4 md:mx-0">Bing Wallpapers</h1>
      <WallpaperList wallpapers={data.wallpapers} />
      <Pagination prev={data.pagination.prev} next={data.pagination.next} />
    </>
  );
}
