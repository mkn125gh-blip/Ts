export type VehicleCategory = 'hatchback' | 'sedan' | 'suv' | 'luxury';

export type Brand = 'wurth' | 'avery_dennison' | 'tintgo_doorstep';

export type FilmCategory = 'window_film' | 'windshield_sunscreen' | 'hybrid_bundle' | 'ppf_sun_combo';

export interface ProductSpec {
  vlt: number; // Visible Light Transmission %
  irRejection: number; // Infrared Heat Rejection %
  uvBlock: number; // UV Protection %
  totalSolarEnergyRejected: number; // TSER %
  material: string;
  warrantyYears: number | 'Lifetime';
  countryOfOrigin: string;
}

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  brandDisplayName: string;
  subtitle: string;
  category: FilmCategory;
  categoryLabel: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  basePrice: number; // For Hatchback
  pricesByVehicle: Record<VehicleCategory, number>;
  image: string;
  secondaryImage?: string;
  highlights: string[];
  specs: ProductSpec;
  description: string;
  packageIncludes: string[];
  doorstepFitmentTime: string; // e.g., "1.5 - 2 Hours"
}

export interface CartItem {
  id: string;
  product: Product;
  vehicleCategory: VehicleCategory;
  carModel: string;
  selectedVlt: number;
  doorstepInstallation: boolean;
  quantity: number;
  price: number;
}

export interface BookingDetails {
  carMake: string;
  carModel: string;
  vehicleCategory: VehicleCategory;
  serviceType: 'full_car' | 'sides_rear' | 'front_windshield' | 'combo_ppf';
  selectedProduct: Product;
  doorstepAddress: string;
  city: string;
  pincode: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  selectedDate: string;
  timeSlot: string;
  specialInstructions?: string;
  paymentMethod: 'cod_doorstep' | 'upi' | 'card';
}
