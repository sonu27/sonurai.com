import { getTags } from "@/libs/Client";

const siteUrl = process.env.NEXT_PUBLIC_URL as string;

function generateSitemap(tags: string[]): string {
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" },
    { url: "/about", priority: "0.5", changefreq: "monthly" },
    { url: "/bingwallpapers", priority: "0.9", changefreq: "daily" },
    { url: "/bingwallpapers/tags", priority: "0.8", changefreq: "weekly" },
  ];

  const staticUrls = staticPages
    .map(
      (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("\n");

  const tagUrls = tags
    .map(
      (tag) => `  <url>
    <loc>${siteUrl}/bingwallpapers/tags/${encodeURIComponent(tag)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${tagUrls}
</urlset>`;
}

export async function GET() {
  const tagsObj = await getTags();
  const tags = Object.keys(tagsObj);

  const sitemap = generateSitemap(tags);

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}