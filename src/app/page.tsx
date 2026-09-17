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
import { INITIAL_DEMO_VEHICLES } from '@/lib/demoData';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col selection:bg-japan-red selection:text-white">
      {/* Public Responsive Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Interactive 3D Car Showroom (Three.js WebGL) */}
        <Showroom3D />

        {/* Inventory System (Search, Filter, Currency Conversion) */}
        <InventoryGrid initialVehicles={INITIAL_DEMO_VEHICLES} />

        {/* Business Divisions (Buy, Sell, Export, SBA Transport Service) */}
        <ServicesGrid />

        {/* Japan to Worldwide Export Network */}
        <ExportWorldwide />

        {/* 5-Step Buying Process */}
        <ProcessFlow />

        {/* Why Choose SBA */}
        <WhyChooseSBA />

        {/* Contact & Custom Vehicle Inquiry */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}