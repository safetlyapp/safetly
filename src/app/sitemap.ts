import type { MetadataRoute } from 'next';

const publicRoutes = [
  '/',
  '/about-us',
  '/contact-us',
  '/faq',
  '/policy',
  '/policy/privacy-policy',
  '/policy/terms-of-service',
  '/policy/payment-and-refund-policy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://Seftly.app';

  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
