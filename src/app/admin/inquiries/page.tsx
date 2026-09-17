'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Inquiry, InquiryStatus } from '@/types';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '@/lib/db';
import {
  MessageSquare,
  Mail,
  Phone,
  Clock,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Search,
  ExternalLink,
  UserCheck,
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    await updateInquiryStatus(id, newStatus);
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete inquiry from "${name}"?`)) {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    }
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      if (statusFilter !== 'all' && inq.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = inq.customerName.toLowerCase().includes(q);
        const matchEmail = inq.email.toLowerCase().includes(q);
        const matchCountry = inq.country.toLowerCase().includes(q);
        const matchVehicle = (inq.vehicleTitle || '').toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchCountry && !matchVehicle) return false;
      }
      return true;
    });
  }, [inquiries, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase text-japan-red tracking-wider block">
            Lead CRM & Communications
          </span>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Customer Inquiries ({inquiries.length})
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Incoming international purchase inquiries from public website visitors.
          </p>
        </div>

        <button
          onClick={loadData}
          className="p-2.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 text-slate-300 hover:text-white border border-white/10 flex items-center gap-2 text-xs font-semibold self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer, email, country, or vehicle..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-japan-red"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          {['all', 'new', 'contacted', 'negotiating', 'closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-japan-red text-white'
                  : 'bg-obsidian-850 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Cards Grid */}
      {isLoading ? (
        <div className="py-20 text-center">
          <RefreshCw className="w-8 h-8 text-japan-red animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-mono">Loading inquiries inbox...</p>
        </div>
      ) : filteredInquiries.length > 0 ? (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => {
            const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
            const whatsappMsg = encodeURIComponent(
              `Hello ${inq.customerName}, this is SBA Automobile & SBA Transport Service (Mito, Japan). Regarding your inquiry for ${
                inq.vehicleTitle || 'our vehicle'
              }:`
            );
            const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMsg}`;
            const mailtoUrl = `mailto:${inq.email}?subject=SBA Automobile Export Quotation - ${encodeURIComponent(
              inq.vehicleTitle || 'Inquiry'
            )}`;

            return (
              <div
                key={inq.id}
                className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4 text-xs"
              >
                {/* Top Lead Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-white">{inq.customerName}</h3>
                      <span className="px-2 py-0.5 rounded-md bg-obsidian-850 border border-white/10 text-[10px] font-mono text-slate-300">
                        {inq.country}
                      </span>
                    </div>
                    <span className="text-japan-red font-semibold text-xs block">
                      Target: {inq.vehicleTitle || 'Custom Search Request'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Status Changer */}
                    <select
                      value={inq.status}
                      onChange={(e: any) => handleStatusChange(inq.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase border focus:outline-none ${
                        inq.status === 'new'
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                          : inq.status === 'contacted'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : inq.status === 'negotiating'
                          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      <option value="new" className="bg-obsidian-900 text-white">New Lead</option>
                      <option value="contacted" className="bg-obsidian-900 text-white">Contacted</option>
                      <option value="negotiating" className="bg-obsidian-900 text-white">In Negotiation</option>
                      <option value="closed" className="bg-obsidian-900 text-white">Closed / Won</option>
                    </select>

                    <button
                      onClick={() => handleDelete(inq.id, inq.customerName)}
                      className="p-1.5 rounded-lg bg-obsidian-850 hover:bg-red-500/20 text-slate-500 hover:text-red-400 border border-white/10 transition-colors"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-3.5 rounded-xl bg-obsidian-900 border border-white/5 text-slate-300 whitespace-pre-line leading-relaxed">
                  &quot;{inq.message}&quot;
                </div>

                {/* Footer Controls & Quick Reply */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-[11px] text-slate-400">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-japan-red" />
                      <span>{new Date(inq.createdAt).toLocaleString()}</span>
                    </span>
                    <span>•</span>
                    <span className="font-mono text-slate-300">{inq.email}</span>
                    <span>•</span>
                    <span className="font-mono text-slate-300">{inq.phone}</span>
                  </div>

                  {/* Direct Contact Buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={mailtoUrl}
                      className="px-3 py-1.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-slate-200 border border-white/10 flex items-center gap-1.5 font-semibold transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-japan-red" />
                      <span>Email Client</span>
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 font-bold transition-all shadow-md shadow-emerald-600/20"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-2xl border border-white/10 space-y-2">
          <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-slate-400 text-xs">No customer inquiries found for this filter.</p>
        </div>
      )}
    </div>
  );
}
