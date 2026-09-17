'use client';

import React, { useState } from 'react';
import { Globe, Ship, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const REGIONS = [
  {
    id: 'uk-europe',
    name: 'United Kingdom & Europe',
    ports: 'Southampton, Bristol, Dublin, Limassol (Cyprus), Zeebrugge',
    transit: '32 – 42 Days',
    inspection: 'IVA roadworthiness & Radiation check',
    popularModels: 'Toyota Land Cruiser, Nissan Skyline/GT-R, Honda Civic Type R, Alphard',
  },
  {
    id: 'africa',
    name: 'East & Southern Africa',
    ports: 'Mombasa (Kenya), Dar es Salaam (Tanzania), Durban, Walvis Bay',
    transit: '28 – 35 Days',
    inspection: 'JEVIC / QISJ / EAA pre-export inspection',
    popularModels: 'Land Cruiser Prado, Harrier, Premio, Axio, Canter Trucks, HiAce',
  },
  {
    id: 'oceania',
    name: 'New Zealand & Australia',
    ports: 'Auckland, Lyttelton, Melbourne, Sydney, Brisbane, Fremantle',
    transit: '18 – 24 Days',
    inspection: 'MPI / DAFF Biosecurity quarantine wash & heat treatment',
    popularModels: 'JDM Classics, Leaf EV, Aqua, RAV4 Hybrid, HiAce Van',
  },
  {
    id: 'caribbean',
    name: 'Caribbean Basin',
    ports: 'Kingston (Jamaica), Port of Spain (Trinidad), Nassau, Georgetown (Guyana)',
    transit: '40 – 48 Days',
    inspection: 'Country-specific age limit inspection & deregistration',
    popularModels: 'Voxy, Noah, Probox, AD Van, Fit, Swift, Axela',
  },
  {
    id: 'middle-east',
    name: 'Middle East & Gulf',
    ports: 'Jebel Ali (Dubai), Sharjah, Abu Dhabi, Muscat, Bahrain',
    transit: '22 – 28 Days',
    inspection: 'Japanese Customs Export Clearance & Certificate of Origin',
    popularModels: 'Land Cruiser 300, Lexus LX600, Patrol Super Safari, Hilux',
  },
];

export default function ExportWorldwide() {
  const [activeRegion, setActiveRegion] = useState(REGIONS[0]);

  return (
    <section id="export" className="py-20 bg-obsidian-900 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-japan-red"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">
              Global Shipping Network
            </span>
            <span className="w-6 h-[2px] bg-japan-red"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Japan to Worldwide Vehicle Export
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Scheduled Ro-Ro (Roll-on / Roll-off) car carrier vessels and secure 20ft / 40ft shipping containers departing weekly from major Japanese ports.
          </p>
        </div>

        {/* Departure Ports Bar */}
        <div className="mb-10 p-4 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Ship className="w-4 h-4 text-japan-red shrink-0" />
            <span className="font-semibold text-white">Main Japanese Departure Harbors:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {['Yokohama Port', 'Nagoya Port', 'Kobe Port', 'Osaka Port', 'Kawasaki Port', 'Hakata Port'].map(
              (p) => (
                <span
                  key={p}
                  className="px-3 py-1 bg-obsidian-850 border border-white/10 rounded-full text-slate-300 font-mono text-[11px]"
                >
                  {p}
                </span>
              )
            )}
          </div>
        </div>

        {/* Interactive Region Selector & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Region Tabs */}
          <div className="lg:col-span-4 space-y-2">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRegion(r)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                  activeRegion.id === r.id
                    ? 'bg-japan-lacquer/40 border-japan-red text-white shadow-lg shadow-japan-red/10'
                    : 'bg-obsidian-850 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm">{r.name}</h4>
                  <span className="text-[11px] text-slate-400">Transit: {r.transit}</span>
                </div>
                <ArrowRight
                  className={`w-4 h-4 transition-transform ${
                    activeRegion.id === r.id ? 'text-japan-red translate-x-1' : 'text-slate-600'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Region Detailed Display */}
          <div className="lg:col-span-8 glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
              <div>
                <span className="text-xs uppercase font-bold text-japan-red tracking-wider">
                  Target Destination
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {activeRegion.name}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-850 border border-white/10 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-japan-red" />
                <span>Transit: {activeRegion.transit}</span>
              </div>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Destination Discharge Ports
                </h5>
                <p className="text-white font-semibold bg-obsidian-850 p-3 rounded-xl border border-white/5">
                  {activeRegion.ports}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Pre-Export Inspection & Biosecurity
                </h5>
                <div className="flex items-center gap-2 text-slate-300 bg-obsidian-850 p-3 rounded-xl border border-white/5">
                  <CheckCircle className="w-4 h-4 text-japan-red shrink-0" />
                  <span>{activeRegion.inspection}</span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  High-Demand Japanese Export Models
                </h5>
                <p className="text-slate-300 bg-obsidian-850 p-3 rounded-xl border border-white/5 text-xs">
                  {activeRegion.popularModels}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-400">
                  Need a CIF or C&F shipping quotation to this destination?
                </p>
                <a
                  href="#inquiry"
                  className="px-5 py-2.5 bg-japan-red hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-japan-red/25"
                >
                  Get Shipping Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
