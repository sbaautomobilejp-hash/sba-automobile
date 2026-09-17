import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { MapPin, Building, ShieldCheck, Mail, Phone, MessageSquare, Award, Clock } from 'lucide-react';

export default function CompanyPage() {
  const whatsappNumber = '+818066651199';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20SBA%20Automobile,%20I%20am%20contacting%20regarding%20corporate%20vehicle%20export.`;

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col selection:bg-japan-red selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-japan-red" />
            <span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">
              Corporate Profile
            </span>
            <span className="w-6 h-[2px] bg-japan-red" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            SBA合同会社
          </h1>
          <p className="text-sm text-japan-red font-semibold tracking-wider mt-1 uppercase">
            SBA Automobile • SBA Transport Service
          </p>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Registered Japanese corporation headquartered in Mito, Ibaraki Prefecture. Dedicated to connecting global car enthusiasts, importers, and commercial fleets with premier Japanese vehicles.
          </p>
        </div>

        {/* Corporate Fact Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-wider border-b border-white/10 pb-4">
              Company Overview & Legal Registration
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-obsidian-900 p-4 rounded-xl border border-white/5">
                <span className="text-slate-400 block mb-1">Company Name (Japanese):</span>
                <span className="font-bold text-white text-sm">SBA合同会社 (SBA Goudou Kaisha / LLC)</span>
              </div>

              <div className="bg-obsidian-900 p-4 rounded-xl border border-white/5">
                <span className="text-slate-400 block mb-1">Trade Names:</span>
                <span className="font-bold text-white text-sm">SBA Automobile / SBA Transport Service</span>
              </div>

              <div className="bg-obsidian-900 p-4 rounded-xl border border-white/5 sm:col-span-2">
                <span className="text-slate-400 block mb-1">Corporate Headquarters & Yard:</span>
                <span className="font-bold text-white text-sm">
                  〒310-0832 茨城県水戸市吉田3066 Japan<br />
                  (3066 Yoshida, Mito-shi, Ibaraki-ken 310-0832, Japan)
                </span>
              </div>

              <div className="bg-obsidian-900 p-4 rounded-xl border border-white/5">
                <span className="text-slate-400 block mb-1">Main Business Activities:</span>
                <span className="text-slate-300">
                  Vehicle Procurement, Auction Bidding, Domestic Purchase, Export Clearance, Inland Fleet Carrier Transport
                </span>
              </div>

              <div className="bg-obsidian-900 p-4 rounded-xl border border-white/5">
                <span className="text-slate-400 block mb-1">Banking Settlement:</span>
                <span className="text-slate-300">
                  Telegraphic Transfer (TT) in JPY, USD, EUR directly to Japanese Corporate Bank Account
                </span>
              </div>
            </div>

            {/* Strategic Location */}
            <div className="border-t border-white/10 pt-6 space-y-3 text-xs">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Strategic Logistics in Ibaraki Prefecture:
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Mito City is located in the northern Kanto region, providing immediate highway corridor access to Tokyo, Saitama, and Chiba auto auction yards, as well as high-speed carrier routes to the deepwater maritime terminals of Yokohama, Kawasaki, and Tokyo ports.
              </p>
            </div>
          </div>

          {/* Quick Contact & WhatsApp */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 space-y-4 text-xs">
              <h3 className="text-base font-bold text-white">Direct Communication</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-japan-red shrink-0 mt-0.5" />
                  <span className="text-slate-300">〒310-0832 茨城県水戸市吉田3066</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-japan-red shrink-0" />
                  <span className="text-slate-300">sbaautomobile.jp@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-japan-red shrink-0" />
                  <span className="text-slate-300">+81 80-6665-1199</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-japan-red shrink-0" />
                  <span className="text-slate-300">Mon - Sat: 09:00 - 19:00 JST</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Message</span>
                </a>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-japan-red font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Compliance Information</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                All business contracts and export vehicles handled by SBA合同会社 comply with Japanese Commercial Code and export regulations administered by METI & MLIT.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
