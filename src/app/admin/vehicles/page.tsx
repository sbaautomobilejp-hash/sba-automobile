'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Vehicle, VehicleStatus } from '@/types';
import { getVehicles, updateVehicleStatus, toggleVehicleFeatured, deleteVehicle, saveVehicle } from '@/lib/db';
import { useCurrency } from '@/context/CurrencyContext';
import {
  PlusCircle,
  Search,
  Star,
  Trash2,
  Edit3,
  ExternalLink,
  Check,
  X,
  RefreshCw,
  Sliders,
  DollarSign,
  Gauge,
  Eye,
} from 'lucide-react';

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingPriceVehicle, setEditingPriceVehicle] = useState<Vehicle | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newMileage, setNewMileage] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const { formatPrice } = useCurrency();

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: VehicleStatus) => {
    await updateVehicleStatus(id, newStatus);
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
  };

  const handleToggleFeatured = async (id: string) => {
    await toggleVehicleFeatured(id);
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, featured: !v.featured } : v))
    );
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}" from inventory?`)) {
      await deleteVehicle(id);
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const openQuickEdit = (v: Vehicle) => {
    setEditingPriceVehicle(v);
    setNewPrice(v.price);
    setNewMileage(v.mileage);
  };

  const handleSaveQuickEdit = async () => {
    if (!editingPriceVehicle) return;
    setIsUpdating(true);
    try {
      const updated: Vehicle = {
        ...editingPriceVehicle,
        price: Number(newPrice),
        mileage: Number(newMileage),
      };
      await saveVehicle(updated);
      setVehicles((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
      setEditingPriceVehicle(null);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (statusFilter !== 'all' && v.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = `${v.make} ${v.model} ${v.trim}`.toLowerCase().includes(q);
        const matchChassis = v.chassisCode.toLowerCase().includes(q);
        const matchYear = v.year.toString().includes(q);
        if (!matchTitle && !matchChassis && !matchYear) return false;
      }
      return true;
    });
  }, [vehicles, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase text-japan-red tracking-wider block">
            Stock Management
          </span>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Vehicle Inventory ({vehicles.length})
          </h1>
        </div>

        <Link
          href="/admin/vehicles/new"
          className="px-4 py-2.5 rounded-xl bg-japan-red hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-japan-red/25 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Vehicle</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by model, make, or chassis..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-obsidian-850 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-japan-red"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          {['all', 'available', 'reserved', 'sold'].map((st) => (
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

      {/* Vehicle List (Mobile Cards & Desktop Table) */}
      {isLoading ? (
        <div className="py-20 text-center">
          <RefreshCw className="w-8 h-8 text-japan-red animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-mono">Loading inventory database...</p>
        </div>
      ) : filteredVehicles.length > 0 ? (
        <div className="space-y-4">
          {filteredVehicles.map((v) => {
            const primaryImg = v.images[0] || 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80';
            return (
              <div
                key={v.id}
                className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs group"
              >
                {/* Left Side: Thumbnail & Title */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-24 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden bg-obsidian-850 shrink-0 border border-white/10">
                    <img src={primaryImg} alt={v.model} className="w-full h-full object-cover" />
                    {v.featured && (
                      <span className="absolute top-1 left-1 p-0.5 rounded bg-japan-red text-white shadow" title="Featured on Homepage">
                        <Star className="w-3 h-3 fill-current" />
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm truncate">
                        {v.year} {v.make} {v.model}
                      </span>
                      {v.isDemo && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[9px] font-bold uppercase border border-amber-500/30">
                          Demo
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 truncate">{v.trim}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                      <span>Chassis: {v.chassisCode}</span>
                      <span>•</span>
                      <span>{v.mileage.toLocaleString()} km</span>
                    </div>
                  </div>
                </div>

                {/* Middle: Price & Status */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2 border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      FOB Price
                    </span>
                    <span className="text-base sm:text-lg font-black text-white font-mono">
                      {formatPrice(v.price)}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={v.status}
                    onChange={(e: any) => handleStatusChange(v.id, e.target.value)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase border focus:outline-none ${
                      v.status === 'available'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : v.status === 'reserved'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    <option value="available" className="bg-obsidian-900 text-white">Available</option>
                    <option value="reserved" className="bg-obsidian-900 text-white">Reserved</option>
                    <option value="sold" className="bg-obsidian-900 text-white">Sold</option>
                  </select>
                </div>

                {/* Right: Quick Action Controls */}
                <div className="flex items-center justify-end gap-1.5 border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                  {/* Quick Price/Mileage Modifier */}
                  <button
                    onClick={() => openQuickEdit(v)}
                    className="p-2 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-slate-300 hover:text-white border border-white/10"
                    title="Quick Update Price / Mileage"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  </button>

                  {/* Feature Toggle */}
                  <button
                    onClick={() => handleToggleFeatured(v.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      v.featured
                        ? 'bg-japan-red/20 text-japan-red border-japan-red/40'
                        : 'bg-obsidian-850 text-slate-500 border-white/10 hover:text-white'
                    }`}
                    title={v.featured ? 'Unfeature from Homepage' : 'Feature on Homepage'}
                  >
                    <Star className={`w-3.5 h-3.5 ${v.featured ? 'fill-current' : ''}`} />
                  </button>

                  {/* Public View */}
                  <Link
                    href={`/cars/${v.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-slate-300 hover:text-white border border-white/10"
                    title="View Public Page"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>

                  {/* Full Edit */}
                  <Link
                    href={`/admin/vehicles/${v.id}`}
                    className="p-2 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-slate-300 hover:text-white border border-white/10"
                    title="Edit Full Specifications"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(v.id, `${v.year} ${v.make} ${v.model}`)}
                    className="p-2 rounded-lg bg-obsidian-850 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/10"
                    title="Delete Vehicle"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-2xl border border-white/10 space-y-3">
          <p className="text-slate-400 text-xs">No vehicles found matching your filter criteria.</p>
          <Link
            href="/admin/vehicles/new"
            className="inline-block px-4 py-2 rounded-xl bg-japan-red text-white text-xs font-bold uppercase"
          >
            Add New Vehicle
          </Link>
        </div>
      )}

      {/* Quick Price & Mileage Update Modal */}
      {editingPriceVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-obsidian-900 border border-white/15 rounded-2xl p-6 space-y-4 text-xs text-left shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Quick Commercial Update</h3>
                <p className="text-slate-400 text-[11px]">
                  {editingPriceVehicle.year} {editingPriceVehicle.make} {editingPriceVehicle.model}
                </p>
              </div>
              <button
                onClick={() => setEditingPriceVehicle(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Price in JPY (¥)
                </label>
                <input
                  type="number"
                  step={10000}
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-850 border border-white/10 text-white font-mono"
                />
                <span className="text-[10px] text-emerald-400 block mt-1">
                  New Display: {formatPrice(newPrice)}
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Odometer Mileage (km)
                </label>
                <input
                  type="number"
                  value={newMileage}
                  onChange={(e) => setNewMileage(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-850 border border-white/10 text-white font-mono"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingPriceVehicle(null)}
                className="px-4 py-2 rounded-lg bg-obsidian-850 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveQuickEdit}
                disabled={isUpdating}
                className="px-5 py-2 rounded-lg bg-japan-red hover:bg-red-700 text-white font-bold uppercase"
              >
                {isUpdating ? 'Saving...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
