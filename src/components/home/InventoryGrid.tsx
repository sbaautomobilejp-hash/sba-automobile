'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Vehicle, VehicleStatus } from '@/types';
import { getVehicles } from '@/lib/db';
import VehicleCard from '@/components/vehicle/VehicleCard';
import InquiryModal from '@/components/vehicle/InquiryModal';
import { Search, SlidersHorizontal, RefreshCw, CarFront, Filter } from 'lucide-react';

interface InventoryGridProps {
  initialVehicles?: Vehicle[];
}

export default function InventoryGrid({ initialVehicles = [] }: InventoryGridProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc'>('featured');
  const [inquiryVehicle, setInquiryVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(initialVehicles.length === 0);

  // Load vehicles from unified db layer (Firestore or local fallback)
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        console.error('Failed to load vehicles:', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  // Unique makes present in inventory
  const makes = useMemo(() => {
    const set = new Set(vehicles.map((v) => v.make));
    return ['all', ...Array.from(set)];
  }, [vehicles]);

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // Status filter
        if (selectedStatus !== 'all' && v.status !== selectedStatus) {
          return false;
        }
        // Make filter
        if (selectedMake !== 'all' && v.make.toLowerCase() !== selectedMake.toLowerCase()) {
          return false;
        }
        // Transmission filter
        if (selectedTransmission !== 'all' && v.transmission.toLowerCase() !== selectedTransmission.toLowerCase()) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = `${v.make} ${v.model} ${v.trim}`.toLowerCase().includes(q);
          const matchChassis = v.chassisCode.toLowerCase().includes(q);
          const matchEngine = v.engine.toLowerCase().includes(q);
          const matchYear = v.year.toString().includes(q);
          if (!matchTitle && !matchChassis && !matchEngine && !matchYear) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.year - a.year;
        }
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'year-desc') return b.year - a.year;
        if (sortBy === 'mileage-asc') return a.mileage - b.mileage;
        return 0;
      });
  }, [vehicles, selectedStatus, selectedMake, selectedTransmission, searchQuery, sortBy]);

  return (
    <section id="inventory" className="py-20 bg-obsidian-950 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-japan-red"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">
                Direct Stock & Export Inventory
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Certified Available Vehicles
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Inspected Japanese domestic vehicles with verifiable auction sheets, genuine mileage, and immediate worldwide Ro-Ro and container export readiness.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              Showing <strong className="text-white">{filteredVehicles.length}</strong> vehicles
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-panel p-4 rounded-2xl mb-8 space-y-4 border border-white/10">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by make, model, chassis (e.g. Land Cruiser, VJA300W, R35)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-japan-red transition-colors"
              />
            </div>

            {/* Quick Status Tabs */}
            <div className="flex items-center gap-1 bg-obsidian-850 p-1 rounded-xl border border-white/5 overflow-x-auto text-xs">
              {[
                { id: 'all', label: 'All' },
                { id: 'available', label: 'Available' },
                { id: 'reserved', label: 'Reserved' },
                { id: 'sold', label: 'Sold' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStatus(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                    selectedStatus === tab.id
                      ? 'bg-japan-red text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort & Transmission Dropdowns */}
            <div className="flex items-center gap-2">
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="px-3 py-2 rounded-xl bg-obsidian-850 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-japan-red"
              >
                <option value="all">Any Gearbox</option>
                <option value="Automatic">Automatic (AT)</option>
                <option value="Manual">Manual (MT)</option>
                <option value="DCT">DCT</option>
              </select>

              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl bg-obsidian-850 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-japan-red"
              >
                <option value="featured">Sort: Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Year: Newest</option>
                <option value="mileage-asc">Mileage: Lowest</option>
              </select>
            </div>
          </div>

          {/* Make Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none text-xs">
            <span className="text-slate-500 uppercase tracking-widest text-[10px] font-bold shrink-0 mr-1">
              Make:
            </span>
            {makes.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMake(m)}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all border ${
                  selectedMake === m
                    ? 'bg-white text-obsidian-950 border-white'
                    : 'bg-obsidian-850 text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {m === 'all' ? 'All Brands' : m}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Grid */}
        {isLoading ? (
          <div className="py-24 text-center">
            <RefreshCw className="w-8 h-8 text-japan-red animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-400">Loading Japanese vehicle inventory from database...</p>
          </div>
        ) : filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onQuickInquire={(v) => setInquiryVehicle(v)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass-panel rounded-2xl border border-white/10 p-8">
            <CarFront className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No vehicles match your filter</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Looking for something specific? Send us a custom sourcing request and we can search Japanese auction markets for your preferred model, year, grade and budget.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMake('all');
                setSelectedStatus('all');
                setSelectedTransmission('all');
              }}
              className="mt-4 px-4 py-2 bg-japan-red text-white text-xs font-semibold rounded-lg shadow transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {inquiryVehicle && (
        <InquiryModal
          vehicle={inquiryVehicle}
          isOpen={Boolean(inquiryVehicle)}
          onClose={() => setInquiryVehicle(null)}
        />
      )}
    </section>
  );
}
