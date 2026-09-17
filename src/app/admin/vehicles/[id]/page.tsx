'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Vehicle } from '@/types';
import { getVehicleById } from '@/lib/db';
import VehicleForm from '@/components/admin/VehicleForm';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function EditVehiclePage() {
  const params = useParams();
  const id = params?.id as string;

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setIsLoading(true);
      try {
        const found = await getVehicleById(id);
        setVehicle(found);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-japan-red border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-400 font-mono">Loading vehicle record...</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="py-20 text-center space-y-4 glass-panel rounded-2xl p-8 max-w-md mx-auto border border-white/10">
        <AlertCircle className="w-12 h-12 text-japan-red mx-auto" />
        <h2 className="text-lg font-bold text-white">Vehicle Record Not Found</h2>
        <p className="text-xs text-slate-400">
          The vehicle you are trying to edit does not exist or has been deleted.
        </p>
        <Link
          href="/admin/vehicles"
          className="inline-block px-4 py-2 bg-japan-red text-white text-xs font-bold uppercase rounded-lg shadow"
        >
          Return to Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="py-2">
      <VehicleForm initialVehicle={vehicle} isEditing={true} />
    </div>
  );
}
