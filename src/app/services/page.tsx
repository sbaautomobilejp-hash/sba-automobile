import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ShoppingBag, ArrowRightLeft, Ship, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col selection:bg-japan-red selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-japan-red" />
            <span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">
              Automotive Business Operations
            </span>
            <span className="w-6 h-[2px] bg-japan-red" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Our Core Services
          </h1>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            SBA合同会社 and SBA Transport Service provide an uninterrupted chain of automotive procurement, domestic trade, worldwide export shipping, and dedicated carrier logistics.
          </p>
        </div>

        {/* Section 1: Buy Vehicles */}
        <div id="buy" className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-japan-lacquer/40 border border-japan-red/40 flex items-center justify-center text-japan-red">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-bold text-japan-red tracking-wider block">Division 01</span>
            <h2 className="text-3xl font-black text-white">Japanese Vehicle Procurement & Auction Bidding</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We provide international clients with direct live bidding access across all major Japanese auto auction networks, including USS Tokyo, USS Yokohama, TAA, CAA, JU, and ORIX. With a large volume of vehicles passing through Japanese auction markets every week, we help you find the exact grade, specification, and price point.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Line-by-line translation of official Japanese auction inspection sheets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Physical pre-bid yard inspection by our Tokyo field inspectors</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Zero hidden bidding fees and transparent commission structure</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-5 bg-obsidian-900 p-6 rounded-2xl border border-white/10 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Auction Networks Covered:</h3>
            <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono">
              <div className="p-2.5 rounded-lg bg-obsidian-850 border border-white/5">USS Auctions (19 halls)</div>
              <div className="p-2.5 rounded-lg bg-obsidian-850 border border-white/5">TAA (Toyota Auto Auction)</div>
              <div className="p-2.5 rounded-lg bg-obsidian-850 border border-white/5">CAA Auction Group</div>
              <div className="p-2.5 rounded-lg bg-obsidian-850 border border-white/5">JU Group Auctions</div>
              <div className="p-2.5 rounded-lg bg-obsidian-850 border border-white/5">Honda Auto Auction (HAA)</div>
              <div className="p-2.5 rounded-lg bg-obsidian-850 border border-white/5">Mirive & Aucnet</div>
            </div>
          </div>
        </div>

        {/* Section 2: Sell & Consign */}
        <div id="sell" className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
            <div className="w-12 h-12 rounded-xl bg-japan-lacquer/40 border border-japan-red/40 flex items-center justify-center text-japan-red">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-bold text-japan-red tracking-wider block">Division 02</span>
            <h2 className="text-3xl font-black text-white">Domestic Vehicle Purchase & Consignment</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Operating legally as SBA合同会社 in Ibaraki, Japan, we purchase quality vehicles directly from private Japanese owners, dealers, and corporate fleets. We provide immediate cash or bank wire settlement and complete all paperwork required for deregistration.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Fair real-time valuation using proprietary Japanese wholesale transaction databases</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Complete legal transfer of ownership (Meigi-henko) without liability to seller</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Immediate pickup via SBA Transport Service anywhere in Kanto & Greater Tokyo</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-5 bg-obsidian-900 p-6 rounded-2xl border border-white/10 space-y-3 text-xs order-1 lg:order-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Required Seller Documentation:</h3>
            <ul className="space-y-2 text-slate-400">
              <li>• Vehicle Inspection Certificate (Shakensho)</li>
              <li>• Seal Registration Certificate (Inkan Shomeisho)</li>
              <li>• Power of Attorney (Ininjyo) & Deed of Transfer (Jotoshodakusho)</li>
              <li>• Proof of Automobile Tax payment (Jidoshazei)</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Export Worldwide */}
        <div id="export" className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-japan-lacquer/40 border border-japan-red/40 flex items-center justify-center text-japan-red">
              <Ship className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-bold text-japan-red tracking-wider block">Division 03</span>
            <h2 className="text-3xl font-black text-white">Global Automotive Export Logistics</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We handle every step required by Japanese Customs (Nippon Zeikan) and the Ministry of Land, Infrastructure, Transport and Tourism (MLIT). From obtaining Export Deregistration Certificates (Yushutsu-massho) to booking vessel space with premier maritime carriers.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Ro-Ro (Roll-on / Roll-off) car carrier space on scheduled shipping lanes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Container stuffing (20ft single car or 40ft high cube multi-car vanning)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Pre-shipment roadworthiness inspection: JEVIC, JAAI, EAA, Bureau Veritas</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-5 bg-obsidian-900 p-6 rounded-2xl border border-white/10 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Major Export Corridors:</h3>
            <p className="text-slate-400">Regular vessel departures to:</p>
            <div className="flex flex-wrap gap-2 text-white font-mono text-[11px]">
              <span className="px-2.5 py-1 rounded bg-obsidian-850 border border-white/5">United Kingdom</span>
              <span className="px-2.5 py-1 rounded bg-obsidian-850 border border-white/5">New Zealand</span>
              <span className="px-2.5 py-1 rounded bg-obsidian-850 border border-white/5">Australia</span>
              <span className="px-2.5 py-1 rounded bg-obsidian-850 border border-white/5">Kenya & Tanzania</span>
              <span className="px-2.5 py-1 rounded bg-obsidian-850 border border-white/5">South Africa</span>
              <span className="px-2.5 py-1 rounded bg-obsidian-850 border border-white/5">UAE & Middle East</span>
              <span className="px-2.5 py-1 rounded bg-obsidian-850 border border-white/5">Caribbean Nations</span>
            </div>
          </div>
        </div>

        {/* Section 4: SBA Transport Service */}
        <div id="transport" className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
            <div className="w-12 h-12 rounded-xl bg-japan-lacquer/40 border border-japan-red/40 flex items-center justify-center text-japan-red">
              <Truck className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase font-bold text-japan-red tracking-wider block">Division 04</span>
            <h2 className="text-3xl font-black text-white">SBA Transport Service (Fleet Logistics)</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              The cornerstone of our speed and reliability. SBA Transport Service operates our own dedicated vehicle carrier trucks based out of Mito, Ibaraki. We manage inland transit between auction houses, our inspection facility, and Yokohama, Nagoya, and Kobe ports directly.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Zero subcontracting delays: cars move within 24-48 hours of auction victory</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Fully insured inland transit covering all potential accidental damage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                <span>Multi-car carrier efficiency eliminates third-party transport surcharges</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-5 bg-obsidian-900 p-6 rounded-2xl border border-white/10 space-y-3 text-xs order-1 lg:order-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Logistics Fleet Hub:</h3>
            <p className="text-slate-300">
              〒310-0832 茨城県水戸市吉田3066<br />
              Mito Depot & Transport Staging Yard
            </p>
            <div className="pt-2">
              <Link
                href="/#inquiry"
                className="w-full py-3 px-4 rounded-xl bg-japan-red hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow"
              >
                <span>Book Transport or Inquire</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
