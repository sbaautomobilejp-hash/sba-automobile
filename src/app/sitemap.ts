import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vermillion-tanuki-c5d321.netlify.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/company`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/export`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
