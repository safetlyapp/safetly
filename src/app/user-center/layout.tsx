import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Center',
  description:
    'Manage your Safetly account, products, and subscription details.',
  robots: { index: false, follow: false },
};

export default function UserCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
