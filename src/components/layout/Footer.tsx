import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, MessageSquare, ShieldCheck, Truck, Globe, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian-950 border-t border-white/10 text-slate-400 text-sm mt-24">
      {/* Upper Footer: Core Business & Pillars */}
      <div className="border-b border-white/5 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Address */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-japan-lacquer border border-japan-red/60 flex items-center justify-center text-white font-black text-lg">
              SBA
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-wider block">SBA Automobile</span>
              <span className="text-xs text-japan-red font-semibold tracking-widest block">SBA合同会社</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Direct Japanese vehicle procurement, auction bidding, quality inspection, and dedicated transport logistics from Mito, Ibaraki to ports worldwide.
          </p>
          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-japan-red shrink-0 mt-0.5" />
              <span>
                〒310-0832 茨城県水戸市吉田3066<br />
                Mito-shi, Yoshida 3066, Ibaraki-ken, Japan
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-japan-red shrink-0" />
              <a href="mailto:sbaautomobile.jp@gmail.com" className="hover:text-white transition-colors">
                sbaautomobile.jp@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-japan-red shrink-0" />
              <span>+81 80-6665-1199</span>
            </div>
          </div>
        </div>

        {/* Divisions & Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 border-l-2 border-japan-red pl-2.5">
            Core Divisions
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/services#buy" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-japan-red"></span>
                Buy Japanese Vehicles (Auction)
              </Link>
            </li>
            <li>
              <Link href="/services#sell" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-japan-red"></span>
                Sell & Consign in Japan
              </Link>
            </li>
            <li>
              <Link href="/services#export" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-japan-red"></span>
                Global Export (Ro-Ro & Container)
              </Link>
            </li>
            <li>
              <Link href="/services#transport" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-japan-red"></span>
                SBA Transport Service (Fleet Logistics)
              </Link>
            </li>
          </ul>
        </div>

        {/* Global Export Ports */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 border-l-2 border-japan-red pl-2.5">
            Export Destinations
          </h4>
          <p className="text-xs text-slate-400">
            Regular vessel departures from Yokohama, Nagoya, Kobe & Hakata ports to:
          </p>
          <ul className="grid grid-cols-2 gap-1 text-xs text-slate-300">
            <li>• United Kingdom</li>
            <li>• New Zealand</li>
            <li>• Australia</li>
            <li>• Kenya & Tanzania</li>
            <li>• UAE & Middle East</li>
            <li>• Caribbean Islands</li>
            <li>• Cyprus & Europe</li>
            <li>• South Africa</li>
          </ul>
        </div>

        {/* Compliance & Admin */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 border-l-2 border-japan-red pl-2.5">
            Compliance & Portal
          </h4>
          <p className="text-xs text-slate-400">
            Pre-export inspection options, subject to destination-country requirements:
          </p>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-850 border border-white/10 text-slate-300 rounded">
              JEVIC Inspection Option
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-850 border border-white/10 text-slate-300 rounded">
              JAAI Inspection Option
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-850 border border-white/10 text-slate-300 rounded">
              EAA Inspection Option
            </span>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-japan-red hover:underline font-semibold"
            >
              <span>Access SBA Admin Dashboard</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Notice Banner - Requirement #8 */}
      <div className="bg-obsidian-900/80 border-y border-amber-500/20 py-2.5 px-4 text-center">
        <p className="text-xs text-amber-300/90 font-medium">
          ⚠️ <strong>Notice:</strong> Vehicles marked with &quot;DEMO LISTING&quot; are currently illustrative placeholders for system demonstration. Official SBA inventory will be added via the secure Admin Dashboard.
        </p>
      </div>

      {/* Copyright & Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
        <p>
          © {currentYear} SBA合同会社 (SBA LLC). All rights reserved. 茨城県水戸市吉田3066.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/company" className="hover:text-slate-400">Legal Information</Link>
          <span>•</span>
          <Link href="/export" className="hover:text-slate-400">Export Terms</Link>
          <span>•</span>
          <Link href="/admin" className="hover:text-slate-400">Management</Link>
        </div>
      </div>
    </footer>
  );
}
