'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Vehicle } from '@/types';
import { getVehicles } from '@/lib/db';
import VehicleCard from '@/components/vehicle/VehicleCard';
import InquiryModal from '@/components/vehicle/InquiryModal';
import { Search, SlidersHorizontal, RefreshCw, CarFront } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface InventoryGridProps { initialVehicles?: Vehicle[]; }

export default function InventoryGrid({ initialVehicles = [] }: InventoryGridProps) {
  const { language } = useLanguage();
  const ja = language === 'ja';
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTransmission, setSelectedTransmission] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc'>('featured');
  const [inquiryVehicle, setInquiryVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(initialVehicles.length === 0);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try { setVehicles(await getVehicles()); }
      catch (err) { console.error('Failed to load vehicles:', err); }
      finally { setIsLoading(false); }
    }
    load();
  }, []);

  const makes = useMemo(() => ['all', ...Array.from(new Set(vehicles.map((v) => v.make)))], [vehicles]);
  const filteredVehicles = useMemo(() => vehicles.filter((v) => {
    if (selectedStatus !== 'all' && v.status !== selectedStatus) return false;
    if (selectedMake !== 'all' && v.make.toLowerCase() !== selectedMake.toLowerCase()) return false;
    if (selectedTransmission !== 'all' && v.transmission.toLowerCase() !== selectedTransmission.toLowerCase()) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (![`${v.make} ${v.model} ${v.trim}`, v.chassisCode, v.engine, v.year.toString()].some((x) => x.toLowerCase().includes(q))) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'featured') return a.featured === b.featured ? b.year - a.year : a.featured ? -1 : 1;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'year-desc') return b.year - a.year;
    return a.mileage - b.mileage;
  }), [vehicles, selectedStatus, selectedMake, selectedTransmission, searchQuery, sortBy]);

  const statusTabs = [
    { id: 'all', label: ja ? 'すべて' : 'All' },
    { id: 'available', label: ja ? '販売中' : 'Available' },
    { id: 'reserved', label: ja ? '予約済み' : 'Reserved' },
    { id: 'sold', label: ja ? '売約済み' : 'Sold' },
  ];

  return (
    <section id="inventory" className="py-20 bg-obsidian-950 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2"><span className="w-6 h-[2px] bg-japan-red" /><span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">{ja ? '車両在庫・輸出' : 'Direct Stock & Export Inventory'}</span></div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">{ja ? '販売可能な車両' : 'Available Vehicles'}</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">{ja ? '現在取り扱い可能な車両をご覧いただけます。車両情報やオークション書類の確認についてもご相談ください。' : 'Browse vehicles currently available through SBA. Vehicle information and auction documentation can be reviewed when available.'}</p>
          </div>
          <span className="text-xs font-mono text-slate-400">{ja ? '表示台数' : 'Showing'} <strong className="text-white">{filteredVehicles.length}</strong> {ja ? '台' : 'vehicles'}</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl mb-8 space-y-4 border border-white/10">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={ja ? 'メーカー、車種、車台番号などで検索…' : 'Search by make, model, chassis (e.g. Land Cruiser, VJA300W, R35)...'} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-japan-red transition-colors" />
            </div>
            <div className="flex items-center gap-1 bg-obsidian-850 p-1 rounded-xl border border-white/5 overflow-x-auto text-xs">
              {statusTabs.map((tab) => <button key={tab.id} onClick={() => setSelectedStatus(tab.id)} className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${selectedStatus === tab.id ? 'bg-japan-red text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>{tab.label}</button>)}
            </div>
            <div className="flex items-center gap-2">
              <select value={selectedTransmission} onChange={(e) => setSelectedTransmission(e.target.value)} className="px-3 py-2 rounded-xl bg-obsidian-850 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-japan-red">
                <option value="all">{ja ? '変速機：すべて' : 'Any Gearbox'}</option><option value="Automatic">{ja ? 'オートマ（AT）' : 'Automatic (AT)'}</option><option value="Manual">{ja ? 'マニュアル（MT）' : 'Manual (MT)'}</option><option value="DCT">DCT</option>
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="px-3 py-2 rounded-xl bg-obsidian-850 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-japan-red">
                <option value="featured">{ja ? 'おすすめ順' : 'Sort: Featured First'}</option><option value="price-asc">{ja ? '価格：安い順' : 'Price: Low to High'}</option><option value="price-desc">{ja ? '価格：高い順' : 'Price: High to Low'}</option><option value="year-desc">{ja ? '年式：新しい順' : 'Year: Newest'}</option><option value="mileage-asc">{ja ? '走行距離：少ない順' : 'Mileage: Lowest'}</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none text-xs">
            <span className="text-slate-500 uppercase tracking-widest text-[10px] font-bold shrink-0 mr-1">{ja ? 'メーカー：' : 'Make:'}</span>
            {makes.map((m) => <button key={m} onClick={() => setSelectedMake(m)} className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all border ${selectedMake === m ? 'bg-white text-obsidian-950 border-white' : 'bg-obsidian-850 text-slate-400 border-white/10 hover:border-white/20 hover:text-white'}`}>{m === 'all' ? (ja ? 'すべて' : 'All Brands') : m}</button>)}
          </div>
        </div>

        {isLoading ? <div className="py-24 text-center"><RefreshCw className="w-8 h-8 text-japan-red animate-spin mx-auto mb-3" /><p className="text-xs text-slate-400">{ja ? '車両在庫を読み込んでいます…' : 'Loading Japanese vehicle inventory from database...'}</p></div>
        : filteredVehicles.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredVehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} onQuickInquire={(v) => setInquiryVehicle(v)} />)}</div>
        : <div className="py-20 text-center glass-panel rounded-2xl border border-white/10 p-8"><CarFront className="w-12 h-12 text-slate-600 mx-auto mb-3" /><h3 className="text-lg font-bold text-white">{ja ? '条件に一致する車両がありません' : 'No vehicles match your filter'}</h3><p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">{ja ? 'お探しの車両が見つからない場合は、希望車種・年式・予算をお問い合わせください。' : 'Looking for something specific? Send us a custom sourcing request with your preferred model, year and budget.'}</p><button onClick={() => { setSearchQuery(''); setSelectedMake('all'); setSelectedStatus('all'); setSelectedTransmission('all'); }} className="mt-4 px-4 py-2 bg-japan-red text-white text-xs font-semibold rounded-lg shadow transition-colors">{ja ? 'フィルターをリセット' : 'Reset Filters'}</button></div>}
      </div>
      {inquiryVehicle && <InquiryModal vehicle={inquiryVehicle} isOpen={Boolean(inquiryVehicle)} onClose={() => setInquiryVehicle(null)} />}
    </section>
  );
}
