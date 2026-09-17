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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col selection:bg-japan-red selection:text-white">
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
