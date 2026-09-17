export type VehicleStatus = 'available' | 'reserved' | 'sold';
export type TransmissionType = 'Automatic' | 'Manual' | 'CVT' | 'DCT';
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type DriveType = '4WD' | 'AWD' | 'RWD' | 'FWD';
export type SteeringType = 'RHD' | 'LHD';

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  mileage: number; // in KM
  engine: string;
  engineDisplacement?: string;
  transmission: TransmissionType;
  fuelType: FuelType;
  driveType: DriveType;
  chassisCode: string;
  price: number; // Base price in JPY
  currency: string;
  description: string;
  features: string[];
  auctionGrade: string; // e.g. "4.5 / Interior A"
  steering: SteeringType;
  color: string;
  images: string[];
  status: VehicleStatus;
  featured: boolean;
  isDemo: boolean;
  createdAt: string;
  updatedAt: string;
}

export type InquiryStatus = 'new' | 'contacted' | 'negotiating' | 'closed';

export interface Inquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string; // Phone or WhatsApp
  country: string;
  vehicleId?: string;
  vehicleTitle?: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

export type SupportedCurrency = 'JPY' | 'USD' | 'EUR' | 'GBP' | 'AUD';

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  rateFromJPY: number; // e.g. 1 JPY = 0.0067 USD
  label: string;
}
