import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { getWallpaper, getRelatedWallpapers } from "@/libs/Client";
import RelatedWallpapers from "@/components/RelatedWallpapers";
import TagList from "@/components/TagList";
import DownloadButton from "@/components/DownloadButton";
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

  const { id, title, copyright, urlBase } = data.wallpaper;
  const pageTitle = `${title} Wallpaper`;
  const desc = `${title} © ${copyright}. Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`;
  const imageUrl = urlBase
    ? `${urlBase}_1920x1080.jpg`
    : `https://images.sonurai.com/${id}.jpg`;

  return {
    title: pageTitle,
    description: desc,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/bingwallpapers/${id}`,
    },
    openGraph: {
      title: pageTitle,
      description: desc,
      images: [imageUrl],
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
  if (data.wallpaper === null) {
    notFound();
  }

  const { id, title, copyright, date, tags, colors, urlBase } = data.wallpaper;

  if (!isNaN(Number(params.id))) {
    redirect(`/bingwallpapers/${id}`);
  }

  const relatedWallpapers = await getRelatedWallpapers(id, tags);

  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  const imageUrl = urlBase
    ? `${urlBase}_UHD.jpg`
    : `https://images.sonurai.com/${id}.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: title,
    description: `${title} - © ${copyright}`,
    contentUrl: imageUrl,
    url: `${process.env.NEXT_PUBLIC_URL}/bingwallpapers/${id}`,
    datePublished: intToDate(date),
    width: urlBase ? 3840 : 1920,
    height: urlBase ? 2160 : 1200,
    encodingFormat: "image/jpeg",
    copyrightNotice: `© ${copyright}`,
    keywords: Object.keys(tags).join(", "),
    creditText: `© ${copyright}`,
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
      <a href={urlBase ? `${urlBase}_UHD.jpg` : `https://images.sonurai.com/${id}.jpg`}>
        <Image
          className="img-fluid"
          priority={true}
          unoptimized={true}
          src={urlBase ? `${urlBase}_UHD.jpg` : `https://images.sonurai.com/${id}.jpg`}
          width={3840}
          height={urlBase ? 2160 : 1200}
          alt={`Bing Wallpaper: ${title}`}
          placeholder={colors?.length ? colorsToDataURL(colors) : undefined}
        />
      </a>
      <div className="flex items-start justify-between gap-4 mt-2 content-margin">
        <h1 className="caption text-xl text-white md:text-2xl">{title}</h1>
        <DownloadButton url={imageUrl} filename={`${id}.jpg`} />
      </div>
      <p className="text-gray-400 content-margin">
        © {copyright} - {intToDate(date)}
      </p>
      <TagList tags={sortedTags} />
      <p className="mt-6 text-gray-400 content-margin">
        Like beautiful images? Browse my photography at{" "}
        <a
          href="https://amarjeet.photos/?ref=sonurai-wallpaper"
          target="_blank"
          rel="me"
          className="text-gray-300 hover:text-white"
        >
          amarjeet.photos
        </a>
      </p>
      <RelatedWallpapers wallpapers={relatedWallpapers} />
    </>
  );
}
