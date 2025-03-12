
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Fences Texas | DFW\'s Premier Fence Installation Experts',
  description: 'Expert fence installation across Dallas/Fort Worth. Residential, commercial, sports courts, and automatic gates. Transform your space with a fence you\'ll love! Get a free quote today!',
  metadataBase: new URL('https://fencestexas.com'),
  openGraph: {
    title: 'Fences Texas | DFW\'s Premier Fence Installation Experts',
    description: 'Expert fence installation across Dallas/Fort Worth. Get a free quote today!',
    url: 'https://fencestexas.com',
    siteName: 'Fences Texas',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fences Texas | DFW\'s Premier Fence Installation Experts',
    description: 'Expert fence installation across Dallas/Fort Worth. Get a free quote today!',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
