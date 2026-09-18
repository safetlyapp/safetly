import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Seftly',
  description:
    'Contact the Seftly support team for help with parental controls, subscriptions, payments, or your account.',
  alternates: { canonical: '/contact-us' },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
