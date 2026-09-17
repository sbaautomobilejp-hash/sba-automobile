import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRightLeft, Ship, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServicesGrid() {
  const services = [
    {
      id: 'buy',
      title: 'Buy Vehicles',
      subtitle: 'Auction Sourcing & Private Purchases',
      icon: ShoppingBag,
      description:
        'Vehicle sourcing through Japanese auction networks and inspection partners, with auction-sheet and vehicle-condition review before purchase.',
      points: [
        'Live auction access (USS, TAA, CAA)',
        'Pre-auction physical inspection & translation',
        'Transparent bidding margin (No hidden fees)',
      ],
      badge: 'Wide auction selection Cars Weekly',
    },
    {
      id: 'sell',
      title: 'Sell & Consign',
      subtitle: 'Japanese Domestic Sales & Trade-In',
      icon: ArrowRightLeft,
      description:
        'Looking to sell or trade in vehicles within Japan? SBA合同会社 provides competitive valuation and rapid settlement for Japanese domestic car owners and corporate fleet liquidation.',
      points: [
        'Instant market appraisal based on live auction data',
        'Hassle-free ownership deregistration (Meigi-henko)',
        'Direct bank transfer upon inspection',
      ],
      badge: 'Highest Market Value',
    },
    {
      id: 'export',
      title: 'Export Worldwide',
      subtitle: 'Global Shipping Logistics & Customs',
      icon: Ship,
      description:
        'Complete end-to-end export documentation, Japanese customs clearance, Ministry of Land, Infrastructure, Transport and Tourism (MLIT) export certificates, and Ro-Ro or container shipping.',
      points: [
        'Official Export Deregistration Certificate (Yushutsu-massho)',
        'Pre-export inspection: JEVIC, JAAI, EAA, Bureau Veritas',
        'Vessel bookings to 65+ international ports',
      ],
      badge: 'Full Customs Clearance',
    },
    {
      id: 'transport',
      title: 'SBA Transport Service',
      subtitle: 'In-House Carrier Truck Logistics',
      icon: Truck,
      description:
        'Unlike brokers who rely on third-party carriers, SBA Transport Service operates our own carrier trucks, moving vehicles swiftly and safely from auction grounds to Yokohama, Nagoya, and Kobe ports.',
      points: [
        'Self-operated multi-car carrier transport fleet',
        'Eliminates third-party broker markups and delays',
        'Fully insured inland transit from auction to port yard',
      ],
      badge: 'Dedicated Transport Fleet',
    },
  ];

  return (
    <section id="services" className="py-20 bg-obsidian-900 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-japan-red"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">
              Integrated Automobile Solutions
            </span>
            <span className="w-6 h-[2px] bg-japan-red"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Our Business Divisions
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            SBA合同会社 and SBA Transport Service deliver complete automotive lifecycle management: from auction procurement and inland logistics to overseas port delivery.
          </p>
        </div>

        {/* 4 Core Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-japan-red/40 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Ambient Red Hover Gradient */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-japan-red/5 rounded-full blur-2xl group-hover:bg-japan-red/15 transition-colors pointer-events-none" />

                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-obsidian-850 border border-white/10 flex items-center justify-center text-japan-red group-hover:scale-110 group-hover:bg-japan-red group-hover:text-white transition-all shadow-lg shadow-black/40">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 text-[11px] font-mono font-semibold rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {s.badge}
                    </span>
                  </div>

                  <span className="text-xs uppercase font-bold text-japan-red tracking-wider block">
                    {s.subtitle}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {s.description}
                  </p>

                  <ul className="space-y-2 mb-6 border-t border-white/5 pt-4 text-xs text-slate-300">
                    {s.points.map((pt, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/services#${s.id}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 group-hover:text-japan-red transition-colors pt-2 uppercase tracking-wider"
                >
                  <span>Learn Detailed Capabilities</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
