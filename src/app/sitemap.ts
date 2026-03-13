import { MetadataRoute } from 'next'
import { internetHistory } from '@/data/internetHistory';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://web-rewind-7jt2.vercel.app';

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/birthday-internet`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic Year Routes
  const yearRoutes = internetHistory.map((era) => ({
    url: `${baseUrl}/year/${era.year}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic Nostalgia Routes
  const nostalgiaRoutes = internetHistory.map((era) => ({
    url: `${baseUrl}/year/${era.year}/nostalgia`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...yearRoutes, ...nostalgiaRoutes];
}
