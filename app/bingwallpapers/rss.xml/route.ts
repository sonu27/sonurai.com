import { getWallpapers, Wallpaper } from "@/libs/Client";
import { intToDate } from "@/libs/date";

const siteUrl = process.env.NEXT_PUBLIC_URL as string;
const siteName = process.env.NEXT_PUBLIC_NAME as string;

function escapeXml(text: string): string {
  return text.replace(/[&<>"']/g, (match) => {
    switch (match) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&apos;";
      default:
        return match;
    }
  });
}

function dateToRfc822(dateStr: string): string {
  // dateStr is in format YYYYMMDD
  const date = new Date(intToDate(dateStr));
  return date.toUTCString();
}

function generateRssItem(wallpaper: Wallpaper): string {
  const { id, title, copyright, date, urlBase } = wallpaper;
  const link = `${siteUrl}/bingwallpapers/${id}`;
  const imageUrl = urlBase
    ? `${urlBase}_UHD.jpg`
    : `https://images.sonurai.com/${id}.jpg`;
  const imageWidth = urlBase ? 3840 : 1920;
  const imageHeight = urlBase ? 2160 : 1200;
  const descriptionText = `${escapeXml(title)} - ${escapeXml(copyright)}`;
  const descriptionHtml = `<![CDATA[<img src="${imageUrl}" alt="${escapeXml(title)}" /><p>${descriptionText}</p>]]>`;

  return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${descriptionHtml}</description>
      <pubDate>${dateToRfc822(date)}</pubDate>
      <enclosure url="${imageUrl}" type="image/jpeg" length="0" />
      <media:content url="${imageUrl}" type="image/jpeg" medium="image" width="${imageWidth}" height="${imageHeight}" />
      <media:thumbnail url="${imageUrl}" width="${imageWidth}" height="${imageHeight}" />
    </item>`;
}

function generateRssFeed(wallpapers: Wallpaper[]): string {
  const items = wallpapers.map(generateRssItem).join("\n");
  const lastBuildDate = wallpapers.length > 0 ? dateToRfc822(wallpapers[0].date) : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Bing Wallpapers - ${escapeXml(siteName)}</title>
    <link>${siteUrl}/bingwallpapers</link>
    <description>Latest Bing Wallpapers from ${escapeXml(siteName)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/bingwallpapers/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/logo192.png</url>
      <title>Bing Wallpapers - ${escapeXml(siteName)}</title>
      <link>${siteUrl}/bingwallpapers</link>
    </image>
${items}
  </channel>
</rss>`;
}

export async function GET() {
  const data = await getWallpapers();
  const feed = generateRssFeed(data.wallpapers);

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}