'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Vehicle, VehicleStatus, TransmissionType, FuelType, DriveType, SteeringType } from '@/types';
import { saveVehicle, uploadVehicleImage } from '@/lib/db';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Upload,
  Camera,
  Trash2,
  CheckCircle2,
  Star,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';

interface VehicleFormProps {
  initialVehicle?: Vehicle;
  isEditing?: boolean;
}

const COMMON_MAKES = ['Toyota', 'Nissan', 'Honda', 'Lexus', 'Mazda', 'Subaru', 'Mitsubishi', 'Suzuki', 'Other'];

export default function VehicleForm({ initialVehicle, isEditing = false }: VehicleFormProps) {
  const router = useRouter();
  const { formatPrice } = useCurrency();

  const [make, setMake] = useState(initialVehicle?.make || 'Toyota');
  const [model, setModel] = useState(initialVehicle?.model || '');
  const [trim, setTrim] = useState(initialVehicle?.trim || '');
  const [year, setYear] = useState<number>(initialVehicle?.year || 2023);
  const [mileage, setMileage] = useState<number>(initialVehicle?.mileage || 10000);
  const [engine, setEngine] = useState(initialVehicle?.engine || '');
  const [engineDisplacement, setEngineDisplacement] = useState(initialVehicle?.engineDisplacement || '');
  const [transmission, setTransmission] = useState<TransmissionType>(initialVehicle?.transmission || 'Automatic');
  const [fuelType, setFuelType] = useState<FuelType>(initialVehicle?.fuelType || 'Petrol');
  const [driveType, setDriveType] = useState<DriveType>(initialVehicle?.driveType || '4WD');
  const [steering, setSteering] = useState<SteeringType>(initialVehicle?.steering || 'RHD');
  const [chassisCode, setChassisCode] = useState(initialVehicle?.chassisCode || '');
  const [color, setColor] = useState(initialVehicle?.color || 'Pearl White');
  const [auctionGrade, setAuctionGrade] = useState(initialVehicle?.auctionGrade || 'Grade 4.5 / Interior A');
  const [price, setPrice] = useState<number>(initialVehicle?.price || 5000000);
  const [status, setStatus] = useState<VehicleStatus>(initialVehicle?.status || 'available');
  const [featured, setFeatured] = useState<boolean>(initialVehicle?.featured || false);
  const [description, setDescription] = useState(initialVehicle?.description || '');
  const [featuresText, setFeaturesText] = useState(initialVehicle?.features?.join(', ') || 'Sunroof, Leather Seats, 360 Camera, Radar Cruise');
  const [images, setImages] = useState<string[]>(initialVehicle?.images || []);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle mobile and desktop multi-photo upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setErrorMessage('');
    const tempId = initialVehicle?.id || `veh-${Date.now()}`;

    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        setUploadProgress(`Compressing & Uploading ${i + 1} of ${files.length}...`);
        const url = await uploadVehicleImage(files[i], tempId);
        uploadedUrls.push(url);
      }
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err: any) {
      setErrorMessage(`Photo upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress('');
      e.target.value = ''; // reset file input
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetPrimaryImage = (index: number) => {
    setImages((prev) => {
      const copy = [...prev];
      const selected = copy.splice(index, 1)[0];
      copy.unshift(selected);
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      setErrorMessage('Please upload at least one vehicle photo.');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');

    try {
      const slug =
        initialVehicle?.slug ||
        `${make}-${model}-${year}-${Date.now().toString().slice(-4)}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');

      const vehicleData: Vehicle = {
        id: initialVehicle?.id || `veh-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        slug,
        make,
        model,
        trim,
        year: Number(year),
        mileage: Number(mileage),
        engine,
        engineDisplacement,
        transmission,
        fuelType,
        driveType,
        chassisCode,
        price: Number(price),
        currency: 'JPY',
        description,
        features: featuresText.split(',').map((s) => s.trim()).filter(Boolean),
        auctionGrade,
        steering,
        color,
        images,
        status,
        featured,
        isDemo: initialVehicle?.isDemo ?? false,
        createdAt: initialVehicle?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveVehicle(vehicleData);
      router.push('/admin/vehicles');
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save vehicle.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto text-xs">
      {/* Form Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold uppercase text-japan-red tracking-wider">
            {isEditing ? 'Inventory Update' : 'New Intake Registration'}
          </span>
          <h2 className="text-2xl font-black text-white">
            {isEditing ? `Edit: ${initialVehicle?.year} ${initialVehicle?.make} ${initialVehicle?.model}` : 'Register New Vehicle'}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-3 py-1.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-slate-300 flex items-center gap-1 border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel</span>
        </button>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300">
          {errorMessage}
        </div>
      )}

      {/* 1. Mobile-Optimized Multi-Photo Uploader (Requirement #3 & #5) */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-japan-red" />
              <span>Vehicle Photo Gallery ({images.length})</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Photos uploaded from your phone are automatically compressed before storage. Tap a photo to set as cover.
            </p>
          </div>

          <label className="cursor-pointer px-4 py-2.5 bg-japan-red hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-japan-red/25 flex items-center gap-2 transition-all">
            <Upload className="w-3.5 h-3.5" />
            <span>{isUploading ? 'Compressing...' : 'Upload Photos'}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>

        {uploadProgress && (
          <div className="p-3 bg-obsidian-850 rounded-xl border border-white/10 text-amber-300 flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>{uploadProgress}</span>
          </div>
        )}

        {/* Thumbnail Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-obsidian-900 border border-white/15"
              >
                <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />

                {idx === 0 && (
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-japan-red text-white text-[9px] font-bold uppercase shadow">
                    Primary Cover
                  </span>
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimaryImage(idx)}
                      className="p-1.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-750 text-white text-[10px]"
                      title="Set as Cover"
                    >
                      Cover
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-white/15 rounded-xl p-8 text-center text-slate-500 space-y-2">
            <ImageIcon className="w-8 h-8 mx-auto text-slate-600" />
            <p>No photos uploaded yet. Tap &apos;Upload Photos&apos; to select from your phone camera or gallery.</p>
          </div>
        )}
      </div>

      {/* 2. Core Vehicle Identification */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Core Identification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Make / Brand *</label>
            <select
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red"
            >
              {COMMON_MAKES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Model Name *</label>
            <input
              type="text"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. Land Cruiser 300"
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Grade / Trim *</label>
            <input
              type="text"
              required
              value={trim}
              onChange={(e) => setTrim(e.target.value)}
              placeholder="e.g. ZX 4WD (Modellista)"
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Registration Year *</label>
            <input
              type="number"
              required
              min={1980}
              max={2030}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Odometer Mileage (km) *</label>
            <input
              type="number"
              required
              min={0}
              value={mileage}
              onChange={(e) => setMileage(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Chassis / Frame Code *</label>
            <input
              type="text"
              required
              value={chassisCode}
              onChange={(e) => setChassisCode(e.target.value)}
              placeholder="e.g. 3BA-VJA300W"
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red font-mono"
            />
          </div>
        </div>
      </div>

      {/* 3. Drivetrain & Mechanicals */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Engine & Drivetrain Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Engine Type & Code *</label>
            <input
              type="text"
              required
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
              placeholder="e.g. 3.5L V6 Twin-Turbo (V35A-FTS)"
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Displacement (cc)</label>
            <input
              type="text"
              value={engineDisplacement}
              onChange={(e) => setEngineDisplacement(e.target.value)}
              placeholder="e.g. 3,444 cc"
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Transmission</label>
            <select
              value={transmission}
              onChange={(e: any) => setTransmission(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red"
            >
              <option value="Automatic">Automatic (AT)</option>
              <option value="Manual">Manual (MT)</option>
              <option value="CVT">CVT</option>
              <option value="DCT">DCT</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Fuel Type</label>
            <select
              value={fuelType}
              onChange={(e: any) => setFuelType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red"
            >
              <option value="Petrol">Petrol / Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric (EV)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Drive System</label>
            <select
              value={driveType}
              onChange={(e: any) => setDriveType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red"
            >
              <option value="4WD">4WD</option>
              <option value="AWD">AWD</option>
              <option value="RWD">RWD</option>
              <option value="FWD">FWD</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Steering</label>
            <select
              value={steering}
              onChange={(e: any) => setSteering(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red"
            >
              <option value="RHD">RHD (Right Hand)</option>
              <option value="LHD">LHD (Left Hand)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Commercials & Status */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Pricing, Status & Condition
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              FOB Price in JPY (¥) *
            </label>
            <input
              type="number"
              required
              min={100000}
              step={10000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red font-mono"
            />
            <span className="text-[10px] text-slate-400 block mt-1">
              Preview: <strong className="text-emerald-400">{formatPrice(price)}</strong>
            </span>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Availability Status *</label>
            <select
              value={status}
              onChange={(e: any) => setStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red"
            >
              <option value="available">Available For Export</option>
              <option value="reserved">Reserved (Deposit Received)</option>
              <option value="sold">Sold / Exported</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Auction Grade</label>
            <input
              type="text"
              value={auctionGrade}
              onChange={(e) => setAuctionGrade(e.target.value)}
              placeholder="e.g. Grade 5 / Interior A"
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Exterior Paint Color</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="e.g. Precious White Pearl (090)"
              className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <label className="flex items-center gap-2 cursor-pointer text-slate-200">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-japan-red focus:ring-japan-red bg-obsidian-850 border-white/20"
              />
              <span className="font-semibold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-japan-red" />
                Feature on Public Homepage
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* 5. Description & Options */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Descriptions & Features Checklist
        </h3>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Vehicle Description & History</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed vehicle description, option highlights, service history, and auction remarks..."
            className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red resize-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">
            Features & Equipment (Comma-separated)
          </label>
          <input
            type="text"
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            placeholder="Sunroof, Leather Seats, 360 View Monitor, Modellista Bodykit, Radar Cruise..."
            className="w-full px-3 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white focus:border-japan-red"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 text-slate-300 font-semibold text-xs border border-white/10 transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSaving || isUploading}
          className="px-8 py-3 rounded-xl bg-japan-red hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-japan-red/30 transition-all"
        >
          <span>{isSaving ? 'Saving Vehicle...' : isEditing ? 'Update Vehicle' : 'Publish Vehicle'}</span>
          <CheckCircle2 className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
