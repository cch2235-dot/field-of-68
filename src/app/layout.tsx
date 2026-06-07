import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://field-of-68.vercel.app'),
  title: { default: 'The Field of 68 — The Home of College Basketball', template: '%s | Field of 68' },
  description: 'Breaking news, interviews, analysis, live shows, podcasts, and everything college hoops.',
  openGraph: { type: 'website', siteName: 'The Field of 68', title: 'The Field of 68 — The Home of College Basketball', description: 'Breaking news, interviews, analysis, live shows, podcasts, and everything college hoops.' },
  twitter: { card: 'summary_large_image', site: '@TheFieldOf68' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0A] text-[#FAFAFA] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
