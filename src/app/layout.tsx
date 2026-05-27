import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fieldof68.com'),
  title: {
    default: 'The Field of 68 — The Home of College Basketball',
    template: '%s | Field of 68',
  },
  description:
    'Breaking news, interviews, analysis, live shows, podcasts, and everything college hoops. The Field of 68 is the premier college basketball media network.',
  keywords: ['college basketball', 'NCAA', 'March Madness', 'bracketology', 'Jon Rothstein', 'Field of 68'],
  authors: [{ name: 'The Field of 68' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fieldof68.com',
    siteName: 'The Field of 68',
    title: 'The Field of 68 — The Home of College Basketball',
    description: 'Breaking news, interviews, analysis, live shows, podcasts, and everything college hoops.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The Field of 68' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TheFieldOf68',
    creator: '@JonRothstein',
    title: 'The Field of 68 — The Home of College Basketball',
    description: 'Breaking news, interviews, analysis, live shows, podcasts, and everything college hoops.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#1C1C1C] text-[#FAFAFA] font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
