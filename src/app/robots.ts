import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://Seftly.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/checkout',
          '/login',
          '/user-center',
          '/download',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
