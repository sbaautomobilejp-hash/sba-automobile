import React from 'react';
import { Truck, ShieldCheck, FileCheck, Anchor, MapPin, Award } from 'lucide-react';

export default function WhyChooseSBA() {
  const reasons = [
    {
      icon: Truck,
      title: 'Dedicated Transport Fleet (SBA Transport Service)',
      desc: 'We operate our own multi-vehicle transport trucks. While other brokers wait weeks for third-party subcontractors, our fleet moves auction cars immediately to the export terminal.',
    },
    {
      icon: FileCheck,
      title: 'Auction Sheet & Mileage Transparency',
      desc: 'We provide available Japanese auction inspection sheets and vehicle documentation, with translation support where applicable.',
    },
    {
      icon: MapPin,
      title: 'Strategic Ibaraki & Tokyo Port Logistics Hub',
      desc: 'Headquartered in Mito, Ibaraki (〒310-0832 茨城県水戸市吉田3066), directly positioned between northern auction yards and Yokohama & Tokyo major export harbors.',
    },
    {
      icon: ShieldCheck,
      title: 'Official Japanese Business Entity (SBA合同会社)',
      desc: 'Deal directly with a fully compliant Japanese domestic corporation. All commercial invoices, contracts, and export documentation conform to Japanese commercial law.',
    },
    {
      icon: Anchor,
      title: 'Established Ro-Ro & Container Shipping Lines',
      desc: 'Preferential shipping vessel allocations to Africa, the Caribbean, United Kingdom, Oceania, and the Middle East with premier carriers (NYK, MOL, K-Line, Hoegh).',
    },
    {
      icon: Award,
      title: 'Complete Government & Port Certifications',
      desc: 'Turnkey pre-shipment compliance for destination country requirements: JEVIC inspection, JAAI roadworthiness certificates, and EAA verification.',
    },
  ];

  return (
    <section className="py-20 bg-obsidian-950 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-japan-red"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">
              The SBA Advantage
            </span>
            <span className="w-6 h-[2px] bg-japan-red"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Why Importers Choose SBA合同会社
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Combining direct Japanese auction access with dedicated inland carrier logistics to deliver pristine vehicles to your port with total transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-japan-red/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-obsidian-850 border border-white/10 flex items-center justify-center text-japan-red group-hover:scale-110 group-hover:bg-japan-red group-hover:text-white transition-all mb-4 shadow">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {r.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
