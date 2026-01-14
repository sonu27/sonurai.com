import { Fragment } from "react";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { getWallpaper } from "@/libs/Client";
import { colorsToDataURL } from "@/libs/image";
import { intToDate } from "@/libs/date";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const data = await getWallpaper(params.id);
  if (!data.wallpaper) {
    return {};
  }

  const { id, title, copyright } = data.wallpaper;
  const pageTitle = `${title} Wallpaper`;
  const desc = `${title} ${copyright}. Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`;

  return {
    title: pageTitle,
    description: desc,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/bingwallpapers/${id}`,
    },
    openGraph: {
      title: pageTitle,
      description: desc,
      images: [`https://images.sonurai.com/${id}.jpg`],
      siteName: process.env.NEXT_PUBLIC_NAME,
      url: `${process.env.NEXT_PUBLIC_URL}/bingwallpapers/${id}`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const data = await getWallpaper(params.id);
  if (data.wallpaper == undefined) {
    notFound();
  }

  const { id, title, copyright, date, tags, colors } = data.wallpaper;

  if (!isNaN(Number(params.id))) {
    redirect(`/bingwallpapers/${id}`);
  }

  const t = Object.entries(tags).sort((a: any, b: any) => b[1] - a[1]);
  const tagFields = t.map((l, i) => (
    <Fragment key={i}>
      <Link
        prefetch={false}
        href={`/bingwallpapers/tags/${l[0]}`}
        className="leading-10 whitespace-nowrap px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
      >
        {l[0]}
      </Link>{" "}
    </Fragment>
  ));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: title,
    description: `${title} - ${copyright}`,
    contentUrl: `https://images.sonurai.com/${id}.jpg`,
    url: `${process.env.NEXT_PUBLIC_URL}/bingwallpapers/${id}`,
    datePublished: intToDate(date),
    width: 1920,
    height: 1200,
    encodingFormat: "image/jpeg",
    copyrightNotice: copyright,
    keywords: Object.keys(tags).join(", "),
    creditText: copyright,
    creator: {
      "@type": "Organization",
      name: "Microsoft Bing",
      url: "https://www.bing.com",
    },
    license: "https://www.microsoft.com/en-us/servicesagreement/",
    acquireLicensePage: "https://www.bing.com/gallery/",
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Image
        className="img-fluid"
        priority={true}
        unoptimized={true}
        src={`https://images.sonurai.com/${id}.jpg`}
        width={1920}
        height={1200}
        alt={`Bing Wallpaper: ${title}`}
        placeholder={colors?.length ? colorsToDataURL(colors) : undefined}
      />
      <h1 className="caption text-xl text-white mt-2 mx-4 md:mx-0 md:text-2xl">{title}</h1>
      <p className="text-gray-400 mx-4 md:mx-0">
        {copyright} - {intToDate(date)}
      </p>
      <p className="mt-2 mx-4 md:mx-0">{tagFields}</p>
    </>
  );
}
