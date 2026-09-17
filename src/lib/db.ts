import { Vehicle, Inquiry, VehicleStatus, InquiryStatus } from '@/types';
import { INITIAL_DEMO_VEHICLES, INITIAL_DEMO_INQUIRIES } from './demoData';
import { isFirebaseConfigured, firestore, storage, auth } from './firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { compressImage } from './imageUtils';

const STORAGE_KEY_VEHICLES = 'sba_vehicles_demo_cache_v1';
const STORAGE_KEY_INQUIRIES = 'sba_inquiries_demo_cache_v1';

let memoryVehicles: Vehicle[] = [...INITIAL_DEMO_VEHICLES];
let memoryInquiries: Inquiry[] = [...INITIAL_DEMO_INQUIRIES];

function getDemoVehicles(): Vehicle[] {
  if (typeof window === 'undefined') return memoryVehicles;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_VEHICLES);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY_VEHICLES, JSON.stringify(INITIAL_DEMO_VEHICLES));
      return [...INITIAL_DEMO_VEHICLES];
    }
    return JSON.parse(saved) as Vehicle[];
  } catch (error) {
    console.error('Failed reading demo vehicle cache:', error);
    return memoryVehicles;
  }
}

function setDemoVehicles(vehicles: Vehicle[]) {
  memoryVehicles = vehicles;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_VEHICLES, JSON.stringify(vehicles));
    } catch (error) {
      console.error('Failed writing demo vehicle cache:', error);
    }
  }
}

function getDemoInquiries(): Inquiry[] {
  if (typeof window === 'undefined') return memoryInquiries;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_INQUIRIES);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(INITIAL_DEMO_INQUIRIES));
      return [...INITIAL_DEMO_INQUIRIES];
    }
    return JSON.parse(saved) as Inquiry[];
  } catch (error) {
    console.error('Failed reading demo inquiry cache:', error);
    return memoryInquiries;
  }
}

function setDemoInquiries(inquiries: Inquiry[]) {
  memoryInquiries = inquiries;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch (error) {
      console.error('Failed writing demo inquiry cache:', error);
    }
  }
}

function requireFirestore() {
  if (!isFirebaseConfigured || !firestore) {
    throw new Error('Firebase is not configured. This operation is available after production setup.');
  }
  return firestore;
}

function requireStorage() {
  if (!isFirebaseConfigured || !storage) {
    throw new Error('Firebase Storage is not configured. Connect Firebase before uploading vehicle images.');
  }
  return storage;
}

export async function getVehicles(): Promise<Vehicle[]> {
  if (!isFirebaseConfigured) return getDemoVehicles();
  const db = requireFirestore();
  const q = query(collection(db, 'vehicles'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  const vehicles: Vehicle[] = [];
  snapshot.forEach((d) => vehicles.push(d.data() as Vehicle));
  return vehicles;
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const vehicles = await getVehicles();
  return vehicles.find((v) => v.slug === slug) || null;
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const vehicles = await getVehicles();
  return vehicles.find((v) => v.id === id) || null;
}

export async function saveVehicle(vehicle: Vehicle): Promise<void> {
  const updatedVehicle: Vehicle = { ...vehicle, updatedAt: new Date().toISOString() };
  if (!isFirebaseConfigured) {
    const current = getDemoVehicles();
    const index = current.findIndex((v) => v.id === updatedVehicle.id);
    if (index >= 0) current[index] = updatedVehicle;
    else current.unshift(updatedVehicle);
    setDemoVehicles(current);
    return;
  }
  const db = requireFirestore();
  await setDoc(doc(db, 'vehicles', updatedVehicle.id), updatedVehicle);
}

export async function deleteVehicle(id: string): Promise<void> {
  if (!isFirebaseConfigured) {
    setDemoVehicles(getDemoVehicles().filter((v) => v.id !== id));
    return;
  }
  const db = requireFirestore();
  await deleteDoc(doc(db, 'vehicles', id));
}

export async function updateVehicleStatus(id: string, status: VehicleStatus): Promise<void> {
  if (!isFirebaseConfigured) {
    const vehicle = await getVehicleById(id);
    if (!vehicle) return;
    vehicle.status = status;
    vehicle.updatedAt = new Date().toISOString();
    await saveVehicle(vehicle);
    return;
  }
  const db = requireFirestore();
  await updateDoc(doc(db, 'vehicles', id), { status, updatedAt: new Date().toISOString() });
}

export async function toggleVehicleFeatured(id: string): Promise<void> {
  const vehicle = await getVehicleById(id);
  if (!vehicle) return;
  await saveVehicle({ ...vehicle, featured: !vehicle.featured });
}

export async function uploadVehicleImage(file: File, vehicleId: string): Promise<string> {
  const { blob, dataUrl } = await compressImage(file, 1600, 1200, 0.82);
  if (!isFirebaseConfigured) return dataUrl;

  const bucket = requireStorage();
  if (!auth?.currentUser) {
    throw new Error('Admin Firebase session is not available. Please log in again.');
  }
  if (!auth.currentUser.emailVerified) {
    throw new Error('Admin Firebase email is not verified. Verify the admin email and log in again.');
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const fileName = `${Date.now()}-${safeName}`;
  const storageRef = ref(bucket, `vehicles/${vehicleId}/${fileName}`);

  // Use a timeout so a blocked Storage request can never leave the admin UI
  // stuck on "Compressing & Uploading..." forever.
  const uploadPromise = uploadBytes(storageRef, blob, { contentType: 'image/jpeg' });
  const timeoutPromise = new Promise<never>((_, reject) => {
    window.setTimeout(() => reject(new Error('Firebase Storage upload timed out. Check Storage, bucket, and Storage Rules.')), 30000);
  });

  await Promise.race([uploadPromise, timeoutPromise]);
  return getDownloadURL(storageRef);
}

export async function getInquiries(): Promise<Inquiry[]> {
  if (!isFirebaseConfigured) return getDemoInquiries();
  const db = requireFirestore();
  const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  const inquiries: Inquiry[] = [];
  snapshot.forEach((d) => inquiries.push(d.data() as Inquiry));
  return inquiries;
}

export async function submitInquiry(
  inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>
): Promise<Inquiry> {
  const newInquiry: Inquiry = {
    ...inquiry,
    id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  if (!isFirebaseConfigured) {
    const current = getDemoInquiries();
    current.unshift(newInquiry);
    setDemoInquiries(current);
    return newInquiry;
  }
  const db = requireFirestore();
  await setDoc(doc(db, 'inquiries', newInquiry.id), newInquiry);
  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<void> {
  if (!isFirebaseConfigured) {
    const current = getDemoInquiries();
    const index = current.findIndex((i) => i.id === id);
    if (index >= 0) {
      current[index].status = status;
      setDemoInquiries(current);
    }
    return;
  }
  const db = requireFirestore();
  await updateDoc(doc(db, 'inquiries', id), { status });
}

export async function deleteInquiry(id: string): Promise<void> {
  if (!isFirebaseConfigured) {
    setDemoInquiries(getDemoInquiries().filter((i) => i.id !== id));
    return;
  }
  const db = requireFirestore();
  await deleteDoc(doc(db, 'inquiries', id));
}
