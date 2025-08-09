import { MetadataRoute } from 'next'
import { client } from '@/libs/Client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL as string;

  const tags = await client.getTags();
  const tagEntries: MetadataRoute.Sitemap = Object.keys(tags).map(tag => ({
    url: `${baseUrl}/bingwallpapers/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/bingwallpapers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  return [...staticPages, ...tagEntries];
}
