export type ServiceType = 
  | 'pet_sitting'
  | 'pet_transport'
  | 'dog_walking'
  | 'boarding'
  | 'grooming'
  | 'pet_taxi'
  | 'vet_visit';

export type SingaporeDistrict =
  | 'Central / Orchard'
  | 'Bishan & Novena'
  | 'East Coast / Katong'
  | 'Tampines & Pasir Ris'
  | 'Jurong & Clementi'
  | 'Bukit Timah'
  | 'Punggol & Sengkang'
  | 'Woodlands & Yishun';

export type PetSpecies = 'Dog' | 'Cat' | 'Rabbit' | 'Bird' | 'Small Animal';

export interface PetProfile {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  ageYears: number;
  weightKg: number;
  gender: 'Male' | 'Female';
  isNeutered: boolean;
  temperament: string[];
  feedingInstructions: string;
  medicationInstructions?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  preferredVetClinic: string;
  avatarUrl: string;
  specialNotes?: string;
}

export interface Review {
  id: string;
  providerId: string;
  authorName: string;
  authorDistrict: string;
  rating: number;
  date: string;
  comment: string;
  petType: string;
  serviceName: string;
  verifiedBooking: boolean;
}

export interface ServicePrice {
  serviceType: ServiceType;
  title: string;
  priceSGD: number;
  unit: string; // e.g. '/ hour', '/ walk', '/ trip', '/ night'
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  verifiedSingPass: boolean;
  verifiedBackgroundCheck: boolean;
  verificationBadges: string[];
  rating: number;
  reviewCount: number;
  completedBookingsCount: number;
  district: SingaporeDistrict;
  serviceAreas: SingaporeDistrict[];
  experienceYears: number;
  responseTimeMin: number;
  cancellationPolicy: 'Flexible (24h full refund)' | 'Moderate (48h full refund)' | 'Strict';
  acceptedPetTypes: PetSpecies[];
  servicesOffered: ServicePrice[];
  photos: string[];
  reviews: Review[];
  availableDays: string[]; // e.g. ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  featured: boolean;
  insuranceCovered: boolean;
}

export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface PriceBreakdown {
  basePriceSGD: number;
  durationOrQuantity: number;
  subtotalSGD: number;
  platformFeeSGD: number;
  insuranceAddonSGD: number;
  peakSurchargeSGD: number;
  discountSGD: number;
  totalSGD: number;
}

export interface LiveUpdate {
  id: string;
  timestamp: string;
  type: 'status' | 'photo' | 'gps' | 'milestone';
  title: string;
  description: string;
  photoUrl?: string;
  lat?: number;
  lng?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'provider' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  photoUrl?: string;
}

export interface Booking {
  id: string;
  serviceType: ServiceType;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerDistrict: SingaporeDistrict;
  petId: string;
  petName: string;
  petSpecies: PetSpecies;
  petAvatar: string;
  date: string;
  timeSlot: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  status: BookingStatus;
  priceBreakdown: PriceBreakdown;
  specialInstructions?: string;
  liveUpdates: LiveUpdate[];
  messages: ChatMessage[];
  createdAt: string;
  gpsRouteProgress?: number; // 0 to 100 for live animation
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: SingaporeDistrict;
  address: string;
  petProfiles: PetProfile[];
  loyaltyPoints: number;
  savedProviderIds: string[];
}

export type AppView = 
  | 'home'
  | 'search'
  | 'provider_profile'
  | 'active_booking'
  | 'customer_dashboard'
  | 'provider_dashboard'
  | 'admin_dashboard'
  | 'trust_safety';

export type UserRole = 'customer' | 'provider' | 'admin';
