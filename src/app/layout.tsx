import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Footer from '@/components/footer';
import Header from '@/components/header';
import ScrollToTop from '@/components/scroll-to-top';

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const fallbackMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://Seftly.app'
  ),
  title: {
    default: 'Seftly | Smart Parental Control & Family Safety',
    template: '%s | Seftly',
  },
  description:
    'Seftly helps parents keep children safer with parental controls, screen-time tools, location monitoring, and family protection.',
  keywords: [
    'parental control app',
    'family safety app',
    'child safety',
    'screen time management',
    'Seftly',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Seftly',
    title: 'Seftly | Smart Parental Control & Family Safety',
    description:
      'Smart tools that help families stay connected, protected, and in control.',
    url: '/',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'Seftly family safety app',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seftly | Smart Parental Control & Family Safety',
    description:
      'Smart tools that help families stay connected, protected, and in control.',
    images: ['/hero.png'],
  },
  robots: { index: true, follow: true },
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(
      new URL(
        '/api/seo',
        process.env.BACKEND_API_URL ?? 'http://127.0.0.1:4000'
      ),
      { cache: 'no-store' }
    );
    if (!response.ok) return fallbackMetadata;
    const data = (await response.json()) as {
      settings?: {
        homepageTitle?: string;
        homepageDescription?: string;
        keywords?: string[];
        ogImage?: string | null;
        twitterTitle?: string | null;
        canonicalSiteUrl?: string | null;
      };
    };
    const settings = data.settings;
    if (!settings?.homepageTitle || !settings.homepageDescription)
      return fallbackMetadata;
    const siteUrl =
      settings.canonicalSiteUrl ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      'https://Seftly.app';
    const image = settings.ogImage ?? '/hero.png';
    return {
      ...fallbackMetadata,
      title: { default: settings.homepageTitle, template: '%s | Seftly' },
      description: settings.homepageDescription,
      keywords: settings.keywords,
      metadataBase: new URL(siteUrl),
      alternates: { canonical: '/' },
      openGraph: {
        ...fallbackMetadata.openGraph,
        title: settings.homepageTitle,
        description: settings.homepageDescription,
        images: [{ url: image, alt: 'Seftly family safety app' }],
      },
      twitter: {
        ...fallbackMetadata.twitter,
        title: settings.twitterTitle ?? settings.homepageTitle,
        description: settings.homepageDescription,
        images: [image],
      },
    };
  } catch {
    return fallbackMetadata;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn('h-full ', 'antialiased hydrated ', figtree.variable)}
      data-scroll-behavior="smooth"
      data-arp=""
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
