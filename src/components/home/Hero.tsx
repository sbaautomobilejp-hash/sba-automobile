'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Anchor, Award, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-obsidian-950 overflow-hidden pt-8 pb-16">
      {/* Background Japanese Aesthetic Elements */}
      <div className="absolute inset-0 bg-japan-grid opacity-25 pointer-events-none" />
      
      {/* Red Radial Ambient Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-japan-red/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-japan-lacquer/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Japanese Kanji Watermark */}
      <div className="absolute right-6 top-20 text-[18vw] font-black text-white/[0.015] select-none pointer-events-none tracking-tighter">
        極上
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center sm:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-900 border border-white/10 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-japan-red animate-pulse" />
              <span className="text-slate-300">SBA合同会社 • Mito, Ibaraki, Japan</span>
              <span className="text-slate-600">|</span>
              <span className="text-japan-red font-bold">Official Automotive Exporter</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.05]">
              Premier Japanese <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Automobile Export
              </span>
              <br />
              <span className="text-japan-red drop-shadow-[0_0_25px_rgba(220,38,38,0.4)]">
                Worldwide
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Access to a wide range of vehicles through Japanese domestic auction networks and sourcing partners. In-house transport logistics with <strong className="text-white">SBA Transport Service</strong> from Tokyo & Yokohama yards straight to your destination port.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href="#inventory"
                className="w-full sm:w-auto px-8 py-4 bg-japan-red hover:bg-red-700 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-xl shadow-japan-red/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Browse Inventory</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#inquiry"
                className="w-full sm:w-auto px-8 py-4 bg-obsidian-900/90 hover:bg-obsidian-850 text-slate-200 hover:text-white font-bold text-sm uppercase tracking-wider rounded-xl border border-white/15 hover:border-japan-red/50 transition-all flex items-center justify-center gap-2"
              >
                <span>Custom Auction Order</span>
              </a>
            </div>

            {/* Core Trust Pillars */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-obsidian-900 border border-white/10 text-japan-red">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Mileage Transparency</h4>
                  <p className="text-slate-400">Documentation & inspection support</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-obsidian-900 border border-white/10 text-japan-red">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold">SBA Transport Fleet</h4>
                  <p className="text-slate-400">In-house port transport</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-lg bg-obsidian-900 border border-white/10 text-japan-red">
                  <Anchor className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Global Port Shipping</h4>
                  <p className="text-slate-400">Ro-Ro & 20ft/40ft container</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Card with Quick Stats */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-white/15">
              {/* Corner Red Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-japan-red/20 rounded-bl-full pointer-events-none" />

              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs uppercase font-bold text-japan-red tracking-wider">
                      Business Entity
                    </span>
                    <h3 className="text-xl font-black text-white">SBA合同会社</h3>
                  </div>
                  <span className="px-2 py-1 text-[10px] font-mono bg-japan-lacquer/60 text-japan-red border border-japan-red/30 rounded font-bold">
                    HQ: IBARAKI
                  </span>
                </div>

                {/* Key Metrics */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-slate-400">Weekly Auction Volume</p>
                      <p className="text-2xl font-black text-white">Wide auction selection</p>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-semibold">USS / TAA / CAA</span>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-slate-400">Global Shipping Ports</p>
                      <p className="text-2xl font-black text-white">65+ Ports</p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">Worldwide</span>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-slate-400">Logistics & Carrier Fleet</p>
                      <p className="text-2xl font-black text-white">SBA Transport</p>
                    </div>
                    <span className="text-[11px] text-japan-red font-semibold">Self-Operated</span>
                  </div>
                </div>

                {/* Address Snippet */}
                <div className="bg-obsidian-950/80 p-3 rounded-lg border border-white/5 text-[11px] text-slate-400">
                  <strong className="text-slate-200 block mb-0.5">Corporate Headquarters:</strong>
                  〒310-0832 茨城県水戸市吉田3066 (Yoshida 3066, Mito, Ibaraki, Japan)
                </div>

                <a
                  href="#process"
                  className="w-full py-3 bg-obsidian-850 hover:bg-obsidian-800 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-lg border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>See How Export Process Works</span>
                  <ChevronDown className="w-3.5 h-3.5 text-japan-red" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
