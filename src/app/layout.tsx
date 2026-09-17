import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'SBA Automobile & SBA Transport Service | Premium Japanese Vehicle Export (SBA合同会社)',
  description:
    'SBA合同会社 - Japan-based vehicle sourcing, transport coordination and worldwide export support from Mito, Ibaraki, Japan.',
  keywords: [
    'SBA Automobile',
    'SBA Transport Service',
    'SBA合同会社',
    'Japanese Car Export',
    'Buy Cars From Japan',
    'USS Auction Japan',
    'Land Cruiser Japan',
    'JDM Export',
    'Mito Ibaraki Car Exporter',
  ],
  openGraph: {
    title: 'SBA Automobile & SBA Transport Service | Japanese Vehicle Export & Transport',
    description:
      'Source Japanese vehicles and arrange worldwide export support through SBA合同会社 (Mito, Ibaraki).',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-obsidian-950 text-slate-100 min-h-screen antialiased selection:bg-japan-red selection:text-white">
        <AuthProvider>
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
