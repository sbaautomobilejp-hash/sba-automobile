'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InquiryModal from '@/components/vehicle/InquiryModal';
import { Vehicle } from '@/types';
import { getVehicleBySlug } from '@/lib/db';
import { useCurrency } from '@/context/CurrencyContext';
import {
  CheckCircle2,
  Gauge,
  Cog,
  Fuel,
  ShieldCheck,
  Ship,
  ArrowLeft,
  MessageSquare,
  Share2,
  Calendar,
  Compass,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [destinationPort, setDestinationPort] = useState('Southampton (UK)');

  const { formatPrice } = useCurrency();

  useEffect(() => {
    async function loadCar() {
      if (!slug) return;
      setIsLoading(true);
      try {
        const found = await getVehicleBySlug(slug);
        setVehicle(found);
      } catch (err) {
        console.error('Failed to load vehicle:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCar();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-obsidian-950 text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-2 border-japan-red border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Loading Japanese vehicle dossier...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-obsidian-950 text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md glass-panel p-8 rounded-2xl border border-white/10">
            <AlertCircle className="w-12 h-12 text-japan-red mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white">Vehicle Not Found</h2>
            <p className="text-xs text-slate-400 mt-2 mb-6">
              The requested vehicle listing may have been exported or the URL has changed.
            </p>
            <Link
              href="/#inventory"
              className="px-6 py-3 bg-japan-red text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-colors"
            >
              Browse Available Stock
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const activePhoto = vehicle.images[activeImageIndex] || vehicle.images[0] || 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=80';

  const statusStyles = {
    available: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    reserved: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    sold: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  };

  const statusLabels = {
    available: 'Available For Export',
    reserved: 'Reserved by Client',
    sold: 'Exported / Sold',
  };

  const whatsappNumber = '+818066651199';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20SBA%20Automobile,%20I%20am%20interested%20in%20the%20${encodeURIComponent(
    `${vehicle.year} ${vehicle.make} ${vehicle.model} (Chassis: ${vehicle.chassisCode})`
  )}`;

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col selection:bg-japan-red selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/#inventory" className="hover:text-white transition-colors">Inventory</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-japan-red font-medium">{vehicle.make} {vehicle.model}</span>
        </nav>
        {/* Title & Quick Status Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-xs uppercase font-bold text-japan-red tracking-widest">
                {vehicle.make} Vehicle
              </span>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-xs text-slate-400">Chassis: {vehicle.chassisCode}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-base text-slate-300 font-medium mt-1">
              {vehicle.trim}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <span
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border w-fit ${
                statusStyles[vehicle.status]
              }`}
            >
              {statusLabels[vehicle.status]}
            </span>
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                FOB Japan Price
              </span>
              <span className="text-3xl font-black text-white">
                {formatPrice(vehicle.price)}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Left Gallery & Right Actions/Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (8 cols): Gallery & Description & Specs */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Primary Image Viewport */}
            <div className="space-y-3">
              <div
                onClick={() => setLightboxOpen(true)}
                className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-obsidian-900 border border-white/15 cursor-zoom-in group shadow-2xl"
              >
                <Image
                  src={activePhoto}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized={activePhoto.startsWith('data:')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Fullscreen Zoom Hint */}
                <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/15">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Click to Expand</span>
                </div>

                {/* Auction Grade Badge */}
                {vehicle.auctionGrade && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-obsidian-900/90 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white">
                    Auction Inspection: <span className="text-japan-red">{vehicle.auctionGrade}</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {vehicle.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {vehicle.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImageIndex === idx
                          ? 'border-japan-red scale-105 shadow-md shadow-japan-red/30'
                          : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized={img.startsWith('data:')}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Spec Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="glass-panel p-4 rounded-xl border border-white/10 text-xs">
                <span className="text-slate-400 block mb-1">Mileage (Odometer)</span>
                <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                  <Gauge className="w-4 h-4 text-japan-red" />
                  <span>{vehicle.mileage.toLocaleString()} km</span>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/10 text-xs">
                <span className="text-slate-400 block mb-1">Transmission</span>
                <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                  <Cog className="w-4 h-4 text-japan-red" />
                  <span>{vehicle.transmission}</span>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/10 text-xs">
                <span className="text-slate-400 block mb-1">Drivetrain & Fuel</span>
                <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                  <Fuel className="w-4 h-4 text-japan-red" />
                  <span>{vehicle.driveType} • {vehicle.fuelType}</span>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/10 text-xs">
                <span className="text-slate-400 block mb-1">Steering Position</span>
                <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                  <Compass className="w-4 h-4 text-japan-red" />
                  <span>{vehicle.steering} (Right-Hand Drive)</span>
                </div>
              </div>
            </div>

            {/* Comprehensive Vehicle Specifications Sheet */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-xl font-black text-white uppercase tracking-wider">
                  Technical Specifications
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Documentation can be reviewed against available Japanese vehicle and auction records.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Make / Manufacturer:</span>
                  <span className="font-bold text-white">{vehicle.make}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Model Name:</span>
                  <span className="font-bold text-white">{vehicle.model}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Grade / Trim:</span>
                  <span className="font-bold text-white">{vehicle.trim}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Year of Registration:</span>
                  <span className="font-mono font-bold text-white">{vehicle.year}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Chassis / Frame Code:</span>
                  <span className="font-mono font-bold text-japan-red">{vehicle.chassisCode}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Engine Details:</span>
                  <span className="font-bold text-white truncate max-w-[200px] text-right">{vehicle.engine}</span>
                </div>
                {vehicle.engineDisplacement && (
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-slate-400">Engine Displacement:</span>
                    <span className="font-mono text-white">{vehicle.engineDisplacement}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Exterior Color:</span>
                  <span className="font-bold text-white">{vehicle.color}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Auction Evaluation:</span>
                  <span className="font-mono font-bold text-emerald-400">{vehicle.auctionGrade || 'Grade 4.5'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Availability:</span>
                  <span className="font-semibold text-white">{statusLabels[vehicle.status]}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <h2 className="text-xl font-black text-white uppercase tracking-wider">
                Vehicle Overview & Condition
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {vehicle.description}
              </p>
            </div>

            {/* Equipment & Features Checklist */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
                <h2 className="text-xl font-black text-white uppercase tracking-wider">
                  Factory Equipment & Options
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  {vehicle.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-obsidian-850 p-2.5 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Sticky Booking / Inquiry Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/15 sticky top-28 space-y-6 shadow-2xl">
              
              {/* Pricing Header */}
              <div className="border-b border-white/10 pb-5">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
                  Export Price (FOB Japan)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                  {formatPrice(vehicle.price)}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Final pricing, export charges, documentation and terminal fees are confirmed according to the vehicle and destination.
                </p>
              </div>

              {/* Destination Port Estimator */}
              <div className="space-y-3 text-xs">
                <label className="block font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                  Select Destination Discharge Port:
                </label>
                <select
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:outline-none focus:border-japan-red"
                >
                  <option value="Southampton (UK)">Southampton (United Kingdom)</option>
                  <option value="Auckland (NZ)">Auckland (New Zealand)</option>
                  <option value="Mombasa (Kenya)">Mombasa (Kenya)</option>
                  <option value="Dar es Salaam (Tanzania)">Dar es Salaam (Tanzania)</option>
                  <option value="Durban (South Africa)">Durban (South Africa)</option>
                  <option value="Melbourne (Australia)">Melbourne (Australia)</option>
                  <option value="Jebel Ali (UAE)">Jebel Ali / Dubai (UAE)</option>
                  <option value="Kingston (Jamaica)">Kingston (Jamaica)</option>
                  <option value="Limassol (Cyprus)">Limassol (Cyprus)</option>
                </select>

                <div className="p-3 bg-obsidian-850 rounded-xl border border-white/5 text-[11px] space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Inland Transport:</span>
                    <span className="font-semibold text-emerald-400">Arranged according to inquiry</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Inspection:</span>
                    <span className="font-semibold text-white">Available documentation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Shipping Mode:</span>
                    <span className="font-semibold text-white">Roll-on/Roll-off (Ro-Ro)</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  disabled={vehicle.status === 'sold'}
                  className="w-full py-4 px-6 rounded-xl bg-japan-red hover:bg-red-700 disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-japan-red/30 transition-all"
                >
                  <Ship className="w-4 h-4" />
                  <span>Request Full Export Quotation</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>

              {/* Trust Callout */}
              <div className="border-t border-white/10 pt-4 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-japan-red shrink-0" />
                  <span>SBA合同会社 Company Information</span>
                </div>
                <p>
                  Vehicle documents and chassis information can be reviewed when available. Domestic transport can be arranged according to the agreed service scope.
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={activePhoto}
              alt="Zoomed Vehicle Photo"
              fill
              className="object-contain"
              unoptimized={activePhoto.startsWith('data:')}
            />
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        vehicle={vehicle}
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />

      <Footer />
    </div>
  );
}