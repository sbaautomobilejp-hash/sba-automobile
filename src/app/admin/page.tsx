'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Vehicle, Inquiry } from '@/types';
import { getVehicles, getInquiries, updateVehicleStatus } from '@/lib/db';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Car,
  PlusCircle,
  MessageSquare,
  Clock,
  ExternalLink,
  Phone,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { formatPrice } = useCurrency();

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [vList, iList] = await Promise.all([getVehicles(), getInquiries()]);
      setVehicles(vList);
      setInquiries(iList);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const total = vehicles.length;
  const available = vehicles.filter((v) => v.status === 'available').length;
  const reserved = vehicles.filter((v) => v.status === 'reserved').length;
  const sold = vehicles.filter((v) => v.status === 'sold').length;
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="space-y-8">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-japan-red tracking-widest block">
            Executive Summary
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Vehicle Operations Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            SBA合同会社 • 茨城県水戸市吉田3066
          </p>
        </div>

        {/* Quick Add Vehicle Button (Phone friendly) */}
        <Link
          href="/admin/vehicles/new"
          className="px-5 py-3 rounded-xl bg-japan-red hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-japan-red/30 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Fleet Stock</span>
            <Car className="w-4 h-4 text-japan-red" />
          </div>
          <div className="text-3xl font-black text-white">{total}</div>
          <span className="text-[10px] text-slate-500 font-mono">Managed Units</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Available for Export</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">{available}</div>
          <span className="text-[10px] text-slate-500 font-mono">Immediate Port Transit</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Client Reserved</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">{reserved}</div>
          <span className="text-[10px] text-slate-500 font-mono">Deposit Received</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Customer Inquiries</span>
            <MessageSquare className="w-4 h-4 text-japan-red" />
          </div>
          <div className="text-3xl font-black text-white">
            {newInquiries} <span className="text-xs font-normal text-slate-400">new</span>
          </div>
          <Link href="/admin/inquiries" className="text-[10px] text-japan-red hover:underline block font-semibold">
            View Inbox →
          </Link>
        </div>
      </div>

      {/* Two Columns: Recent Inquiries & Quick Inventory List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (6 cols): Recent Inquiries */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Recent Customer Inquiries</h3>
              <p className="text-[11px] text-slate-400">Incoming leads from public website</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs text-japan-red hover:underline font-semibold"
            >
              View All ({inquiries.length})
            </Link>
          </div>

          <div className="space-y-3">
            {inquiries.slice(0, 4).map((inq) => {
              const whatsappUrl = `https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                inq.customerName
              )},%20this%20is%20SBA%20Automobile%20(Japan)%20following%20up%20on%20your%20vehicle%20inquiry.`;

              return (
                <div
                  key={inq.id}
                  className="bg-obsidian-900 p-4 rounded-xl border border-white/5 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{inq.customerName}</span>
                      <span className="text-slate-400">({inq.country})</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        inq.status === 'new'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>

                  <p className="text-japan-red font-medium text-[11px] truncate">
                    Interested in: {inq.vehicleTitle || 'General Auction Inquiry'}
                  </p>

                  <p className="text-slate-400 line-clamp-2 italic">
                    &quot;{inq.message}&quot;
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-slate-500">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Reply on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (6 cols): Quick Inventory Overview */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Live Inventory</h3>
              <p className="text-[11px] text-slate-400">Manage statuses, prices, and photos</p>
            </div>
            <Link
              href="/admin/vehicles"
              className="text-xs text-japan-red hover:underline font-semibold"
            >
              Full Inventory Table →
            </Link>
          </div>

          <div className="space-y-3">
            {vehicles.slice(0, 4).map((veh) => (
              <div
                key={veh.id}
                className="bg-obsidian-900 p-3 rounded-xl border border-white/5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-9 rounded-lg bg-obsidian-850 overflow-hidden relative shrink-0">
                    {veh.images[0] && (
                      <img
                        src={veh.images[0]}
                        alt={veh.model}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white truncate">
                      {veh.year} {veh.make} {veh.model}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {formatPrice(veh.price)} • {veh.mileage.toLocaleString()} km
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      veh.status === 'available'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : veh.status === 'reserved'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {veh.status}
                  </span>
                  <Link
                    href={`/admin/vehicles/${veh.id}`}
                    className="p-1.5 rounded-lg bg-obsidian-850 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    title="Edit vehicle"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
