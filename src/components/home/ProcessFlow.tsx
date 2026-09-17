import React from 'react';
import { Search, ClipboardCheck, CreditCard, Truck, Ship, ArrowRight } from 'lucide-react';

export default function ProcessFlow() {
  const steps = [
    {
      step: '01',
      title: 'Select or Request',
      subtitle: 'Stock / Custom Auction',
      icon: Search,
      desc: 'Browse our ready export inventory or submit a custom search request with your desired model, year, and target budget across Japanese auction markets.',
    },
    {
      step: '02',
      title: 'Inspect & Translate',
      subtitle: 'Physical Yard Verification',
      icon: ClipboardCheck,
      desc: 'We review available auction sheets and vehicle information, with inspection and translation support arranged as required.',
    },
    {
      step: '03',
      title: 'Invoice & TT Deposit',
      subtitle: 'Official Japanese Contract',
      icon: CreditCard,
      desc: 'We issue an official Proforma Invoice under SBA合同会社. Payment is remitted securely via international bank Telegraphic Transfer (TT) to our Japanese corporate account.',
    },
    {
      step: '04',
      title: 'SBA Transport & Port',
      subtitle: 'Inland Fleet Logistics',
      icon: Truck,
      desc: 'Our dedicated carrier trucks (SBA Transport Service) collect the car and deliver it directly to Yokohama or Kobe port. Customs clearance and JEVIC inspections are finalized.',
    },
    {
      step: '05',
      title: 'Shipping & Documents',
      subtitle: 'Express DHL Document Delivery',
      icon: Ship,
      desc: 'Vehicle boards the Ro-Ro or container vessel. Original Bill of Lading (B/L), Japanese Export Certificate, and commercial invoice are couriered via DHL for port clearance.',
    },
  ];

  return (
    <section id="process" className="py-20 bg-obsidian-950 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-japan-red"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">
              Transparent 5-Step Journey
            </span>
            <span className="w-6 h-[2px] bg-japan-red"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            How The Buying Process Works
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Importing from Japan is easier when vehicle sourcing, inland transport and export coordination are handled through one team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="glass-panel p-6 rounded-2xl border border-white/10 relative flex flex-col justify-between group hover:border-japan-red/50 transition-all"
              >
                {/* Step Number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-japan-red">
                    {s.step}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-obsidian-850 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-japan-red group-hover:text-white transition-all shadow">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    {s.subtitle}
                  </span>
                  <h3 className="text-base font-black text-white mt-0.5 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {s.desc}
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
