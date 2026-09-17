'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  MessageSquare,
  LogOut,
  Globe,
  Shield,
} from 'lucide-react';

export default function AdminNav() {
  const pathname = usePathname();
  const { user, signOut, isFirebaseActive } = useAuth();

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Inventory', href: '/admin/vehicles', icon: Car },
    { label: 'Add Car', href: '/admin/vehicles/new', icon: PlusCircle },
    { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  ];

  return (
    <>
      {/* Top Bar (Desktop & Mobile) */}
      <header className="sticky top-0 z-40 bg-obsidian-900 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-japan-lacquer border border-japan-red flex items-center justify-center text-white font-black text-sm">
              SBA
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-wider">
                ADMIN PORTAL
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                SBA合同会社 • Mito, Japan
              </span>
            </div>
          </Link>

          {/* Database Status Indicator */}
          <span
            className={`hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
              isFirebaseActive
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isFirebaseActive ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
              }`}
            />
            {isFirebaseActive ? 'Firebase Live' : 'Demo Local Storage'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-japan-red" />
            <span>Public Site</span>
          </Link>

          <span className="hidden md:inline text-slate-400 text-[11px] truncate max-w-[150px]">
            {user?.email}
          </span>

          <button
            onClick={() => signOut()}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-obsidian-850 hover:bg-red-500/20 text-slate-300 hover:text-red-300 border border-white/10 transition-colors flex items-center gap-1.5"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Desktop Sidebar (Left side on large screens) */}
      <aside className="hidden lg:flex flex-col w-64 bg-obsidian-950 border-r border-white/10 p-4 space-y-6 shrink-0 min-h-[calc(100vh-57px)]">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-japan-red text-white shadow-lg shadow-japan-red/25 font-bold'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="pt-8 border-t border-white/10 mt-auto space-y-3 text-xs text-slate-500">
          <div className="p-3 rounded-xl bg-obsidian-900 border border-white/5 space-y-1">
            <p className="font-bold text-slate-300">Mobile Admin</p>
            <p className="text-[11px]">
              Optimized for smartphone photo uploads directly from auction grounds.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Open Public Showroom</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (Crucial for phone one-thumb operation) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-obsidian-950/95 backdrop-blur-lg border-t border-white/15 px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
                isActive ? 'text-japan-red font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
