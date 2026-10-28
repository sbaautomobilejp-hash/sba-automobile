import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vermillion-tanuki-c5d321.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  title: 'SBA Automobile | Japanese Vehicles for Sale in Japan & Worldwide',
  description:
    'SBA合同会社 - Browse Japanese vehicles for sale, ask about domestic purchase in Japan, and request optional export and transport support from Mito, Ibaraki.',
  keywords: [
    'SBA Automobile', 'SBA Transport Service', 'SBA合同会社', 'Japanese Cars for Sale',
    'Buy Cars in Japan', 'Buy Cars From Japan', 'Domestic Vehicle Sales', 'Japanese Car Export',
  ],
  openGraph: {
    url: siteUrl,
    siteName: 'SBA Automobile',
    locale: 'en_US',
    title: 'SBA Automobile | Japanese Vehicles for Sale in Japan & Worldwide',
    description: 'Japanese vehicles for sale in Japan and overseas, with optional export and transport support from Mito, Ibaraki.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SBA Automobile | Japanese Vehicles for Sale',
    description: 'Browse Japanese vehicles for sale in Japan. Ask SBA合同会社 about domestic purchases, sourcing, transport and optional export.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-obsidian-950 text-slate-100 min-h-screen antialiased selection:bg-japan-red selection:text-white">
        <Script id="google-translate-init" strategy="beforeInteractive">
          {`window.googleTranslateElementInit = function () {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,ja',
              autoDisplay: false,
            }, 'google_translate_element');
          };`}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <div id="google_translate_element" className="google-translate-hidden" aria-hidden="true" />
        <AuthProvider>
          <LanguageProvider>
            <CurrencyProvider>{children}</CurrencyProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
