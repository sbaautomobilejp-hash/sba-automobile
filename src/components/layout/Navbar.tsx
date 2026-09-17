'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCurrency, CURRENCY_CONFIGS } from '@/context/CurrencyContext';
import { SupportedCurrency } from '@/types';
import { Menu, X, Shield, Phone, MessageSquare, Globe, ChevronDown, Car } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  const whatsappNumber = '+818066651199';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20SBA%20Automobile,%20I%20am%20interested%20in%20importing%20a%20vehicle%20from%20Japan.`;

  return (
    <header className="sticky top-0 z-50 w-full bg-obsidian-950/90 backdrop-blur-md border-b border-white/10 transition-all">
      {/* Top Banner with Company Info & WhatsApp Link */}
      <div className="bg-obsidian-900 border-b border-white/5 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2 text-slate-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-japan-red font-semibold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-japan-red animate-pulse"></span>
              JAPAN EXPORT PORTAL
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline">SBA合同会社 • 茨城県水戸市 (Mito, Ibaraki)</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-slate-500" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Japanese Hanko Style Emblem */}
          <div className="w-11 h-11 rounded-lg bg-japan-lacquer border border-japan-red/60 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-japan-red/20 group-hover:scale-105 transition-transform">
            <span className="tracking-tighter">SBA</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider text-white group-hover:text-slate-100 uppercase">
                SBA Automobile
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-japan-red text-white rounded uppercase tracking-widest">
                JAPAN
              </span>
            </div>
            <p className="text-[11px] tracking-widest text-slate-400 uppercase font-medium">
              SBA Transport Service • SBA合同会社
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7">
          <Link
            href="/#inventory"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors hover:border-b-2 hover:border-japan-red py-1"
          >
            Inventory
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors hover:border-b-2 hover:border-japan-red py-1"
          >
            Services
          </Link>
          <Link
            href="/export"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors hover:border-b-2 hover:border-japan-red py-1"
          >
            Global Export
          </Link>
          <Link
            href="/#process"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors hover:border-b-2 hover:border-japan-red py-1"
          >
            How It Works
          </Link>
          <Link
            href="/company"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors hover:border-b-2 hover:border-japan-red py-1"
          >
            Company
          </Link>
        </div>

        {/* Right side tools: Currency Switcher & Inquire CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-obsidian-850 border border-white/10 hover:border-white/20 text-slate-200 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-japan-red" />
              <span>{currency} ({CURRENCY_CONFIGS[currency].symbol})</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {currencyDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-lg bg-obsidian-900 border border-white/15 shadow-xl py-1 z-50"
                onClick={() => setCurrencyDropdownOpen(false)}
              >
                {(Object.keys(CURRENCY_CONFIGS) as SupportedCurrency[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => setCurrency(code)}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between transition-colors ${
                      currency === code
                        ? 'bg-japan-red/20 text-japan-red font-bold'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{CURRENCY_CONFIGS[code].label}</span>
                    <span className="font-mono text-slate-400">{CURRENCY_CONFIGS[code].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Inquiry CTA */}
          <Link
            href="/#inquiry"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-japan-red hover:bg-red-700 text-white rounded-md shadow-lg shadow-japan-red/25 transition-all"
          >
            <span>Inquire Now</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile currency quick button */}
          <button
            onClick={() => {
              const keys = Object.keys(CURRENCY_CONFIGS) as SupportedCurrency[];
              const nextIndex = (keys.indexOf(currency) + 1) % keys.length;
              setCurrency(keys[nextIndex]);
            }}
            className="px-2.5 py-1 text-xs font-bold rounded bg-obsidian-850 border border-white/10 text-japan-red"
          >
            {currency}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-md bg-obsidian-850 border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-obsidian-950/98 border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/#inventory"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 border-b border-white/5"
          >
            Vehicle Inventory
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 border-b border-white/5"
          >
            Services (Buy / Sell / Export / Transport)
          </Link>
          <Link
            href="/export"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 border-b border-white/5"
          >
            Global Export & Shipping Routes
          </Link>
          <Link
            href="/#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 border-b border-white/5"
          >
            How The Buying Process Works
          </Link>
          <Link
            href="/company"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 border-b border-white/5"
          >
            About SBA合同会社 (Mito, Ibaraki)
          </Link>
          <Link
            href="/admin/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-japan-red border-b border-white/5"
          >
            Admin Management Portal
          </Link>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 px-4 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <Link
              href="/#inquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 rounded-md bg-japan-red hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider shadow"
            >
              Send Vehicle Inquiry
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
