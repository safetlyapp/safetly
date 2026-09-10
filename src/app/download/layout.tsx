import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Safetly',
  description: 'Download Safetly for your family devices.',
  robots: { index: false, follow: false },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
