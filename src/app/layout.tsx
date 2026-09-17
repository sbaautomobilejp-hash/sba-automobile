import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'SBA Automobile & SBA Transport Service | Japanese Vehicle Export',
  description:
    'SBA合同会社 - Japanese vehicle sourcing, transport coordination and worldwide export support from Mito, Ibaraki, Japan.',
  keywords: [
    'SBA Automobile', 'SBA Transport Service', 'SBA合同会社', 'Japanese Car Export',
    'Buy Cars From Japan', 'JDM Export', 'Mito Ibaraki Car Export',
  ],
  openGraph: {
    title: 'SBA Automobile & SBA Transport Service | Japanese Vehicle Export',
    description: 'Japanese vehicle sourcing, transport coordination and worldwide export support from Mito, Ibaraki.',
    type: 'website',
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, maximumScale: 1 };

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
