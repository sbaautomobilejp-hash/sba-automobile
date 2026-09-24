import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ExportWorldwide from '@/components/home/ExportWorldwide';
import ProcessFlow from '@/components/home/ProcessFlow';
import Link from 'next/link';
import { Ship, FileText, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ExportPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col selection:bg-japan-red selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-japan-red" />
            <span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">
              Global Maritime Logistics
            </span>
            <span className="w-6 h-[2px] bg-japan-red" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            International Vehicle Export & Logistics
          </h1>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            SBA合同会社 provides export and shipping coordination according to vehicle, destination-country requirements and carrier availability.
          </p>
        </div>

        {/* Shipping Modes Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-japan-red tracking-wider">Method A</span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">Common Option</span>
            </div>
            <h3 className="text-2xl font-black text-white">Ro-Ro (Roll-on / Roll-off)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Vehicles are driven directly onto specialized multi-deck car carrier vessels and securely strapped down inside weather-sealed vehicle cargo decks.
            </p>
            <ul className="space-y-2 text-xs text-slate-400 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Often used for standard vehicle shipments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Sailing schedules depend on route and carrier availability</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Arrival handling depends on the destination port</span>
              </li>
            </ul>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-japan-red tracking-wider">Method B</span>
              <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-400 text-[11px] font-bold">Alternative Option</span>
            </div>
            <h3 className="text-2xl font-black text-white">Containerized Shipping (20ft / 40ft)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              For high-value collector classics (GT-R, Supra, RX-7) or multi-vehicle consignments. Vehicles are strapped and chocked inside sealed maritime steel containers.
            </p>
            <ul className="space-y-2 text-xs text-slate-400 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Sealed container transport can be suitable for certain vehicles and cargo</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Can ship spare parts, wheels, and accessories inside container</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Port and inland options depend on the route and carrier</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Export Section */}
        <ExportWorldwide />

        {/* Process Flow */}
        <ProcessFlow />

        {/* Bottom CTA */}
        <div className="glass-panel p-10 rounded-3xl border border-white/10 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl font-black text-white">Ready to Export Your Vehicle?</h3>
          <p className="text-xs text-slate-400">
            Contact SBA合同会社 in Mito, Ibaraki for custom freight quotations and auction search.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/#inventory"
              className="px-6 py-3 bg-japan-red hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow"
            >
              Browse Stock
            </Link>
            <Link
              href="/#inquiry"
              className="px-6 py-3 bg-obsidian-850 hover:bg-obsidian-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/10"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
