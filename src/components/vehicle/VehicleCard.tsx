'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { Gauge, Cog, Fuel, ArrowUpRight } from 'lucide-react';

interface VehicleCardProps { vehicle: Vehicle; onQuickInquire?: (vehicle: Vehicle) => void; }

export default function VehicleCard({ vehicle, onQuickInquire }: VehicleCardProps) {
  const { formatPrice } = useCurrency();
  const primaryImage = vehicle.images[0] || 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80';
  const statusColors = {
    available: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    reserved: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    sold: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  };
  const statusLabels = { available: 'Available For Export', reserved: 'Reserved', sold: 'Sold Out' };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden glass-panel-hover flex flex-col h-full border border-white/10 group">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian-900">
        <Image src={primaryImage} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized={primaryImage.startsWith('data:')} />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md border backdrop-blur-md ${statusColors[vehicle.status]}`}>{statusLabels[vehicle.status]}</span>
          <div className="flex items-center gap-1.5">
            {vehicle.featured && <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-japan-red text-white shadow">Featured</span>}
            {vehicle.auctionGrade && <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-obsidian-900/90 text-slate-200 rounded border border-white/20">{vehicle.auctionGrade}</span>}
          </div>
        </div>
        <div className="absolute bottom-2 right-3 z-10"><span className="px-2 py-0.5 text-[10px] font-bold font-mono bg-black/70 text-slate-200 rounded border border-white/10">{vehicle.steering}</span></div>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1"><span className="font-semibold uppercase tracking-wider text-japan-red">{vehicle.make}</span><span className="font-mono text-slate-300">{vehicle.year}</span></div>
          <Link href={`/cars/${vehicle.slug}`} className="block group-hover:text-japan-red transition-colors"><h3 className="text-lg font-black text-white leading-tight line-clamp-1">{vehicle.make} {vehicle.model}</h3><p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{vehicle.trim}</p></Link>
          <div className="grid grid-cols-3 gap-2 mt-4 text-[11px] text-slate-300">
            <div className="bg-obsidian-850 p-2 rounded-lg border border-white/5 flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-japan-red shrink-0" /><span className="truncate">{vehicle.mileage.toLocaleString()} km</span></div>
            <div className="bg-obsidian-850 p-2 rounded-lg border border-white/5 flex items-center gap-1.5"><Cog className="w-3.5 h-3.5 text-japan-red shrink-0" /><span className="truncate">{vehicle.transmission}</span></div>
            <div className="bg-obsidian-850 p-2 rounded-lg border border-white/5 flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5 text-japan-red shrink-0" /><span className="truncate">{vehicle.driveType}</span></div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 flex items-center justify-between">
          <div><span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">FOB Japan Price</span><span className="text-xl font-black text-white">{formatPrice(vehicle.price)}</span></div>
          <div className="flex items-center gap-2">
            {onQuickInquire && vehicle.status !== 'sold' && <button onClick={() => onQuickInquire(vehicle)} className="px-3 py-2 text-xs font-semibold bg-obsidian-850 hover:bg-obsidian-800 text-slate-200 hover:text-white rounded-lg border border-white/10 transition-colors" title="Quick Inquire">Inquire</button>}
            <Link href={`/cars/${vehicle.slug}`} className="p-2 bg-japan-red hover:bg-red-700 text-white rounded-lg shadow-md shadow-japan-red/20 transition-all flex items-center justify-center" aria-label={`View full details of ${vehicle.year} ${vehicle.make} ${vehicle.model}`}><ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
