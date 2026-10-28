import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Showroom3D from '@/components/home/Showroom3D';
import InventoryGrid from '@/components/home/InventoryGrid';
import ServicesGrid from '@/components/home/ServicesGrid';
import WhyChooseSBA from '@/components/home/WhyChooseSBA';
import ExportWorldwide from '@/components/home/ExportWorldwide';
import ProcessFlow from '@/components/home/ProcessFlow';
import ContactSection from '@/components/home/ContactSection';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sba-automobile.netlify.app';
const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'SBA Automobile',
  alternateName: 'SBA合同会社',
  url: siteUrl,
  email: 'sbaautomobile.jp@gmail.com',
  telephone: '+81-80-6665-1199',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Yoshida 3066',
    addressLocality: 'Mito',
    addressRegion: 'Ibaraki',
    postalCode: '310-0832',
    addressCountry: 'JP',
  },
  areaServed: ['Japan', 'International markets'],
  knowsAbout: ['Japanese vehicles', 'Vehicle sourcing', 'Domestic vehicle sales', 'Vehicle transport', 'Vehicle export support'],
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col selection:bg-japan-red selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema).replace(/</g, '\\u003c') }} />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Showroom3D />
        <InventoryGrid />
        <ServicesGrid />
        <ExportWorldwide />
        <ProcessFlow />
        <WhyChooseSBA />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
