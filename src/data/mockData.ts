import { Provider, PetProfile, Booking, UserProfile, SingaporeDistrict } from '../types';

export const SINGAPORE_DISTRICTS: SingaporeDistrict[] = [
  'Central / Orchard',
  'Bishan & Novena',
  'East Coast / Katong',
  'Tampines & Pasir Ris',
  'Jurong & Clementi',
  'Bukit Timah',
  'Punggol & Sengkang',
  'Woodlands & Yishun',
];

export const INITIAL_PETS: PetProfile[] = [
  {
    id: 'pet-1',
    name: 'Milo',
    species: 'Dog',
    breed: 'Golden Retriever',
    ageYears: 3,
    weightKg: 28,
    gender: 'Male',
    isNeutered: true,
    temperament: ['Friendly', 'Energetic', 'Loves water', 'Good with cats'],
    feedingInstructions: '1.5 cups dry kibble twice daily at 8 AM and 7 PM. Add 1 spoon of salmon oil.',
    medicationInstructions: 'Joint supplement chew every morning with breakfast.',
    emergencyContactName: 'Dr. Aaron Goh (Mount Pleasant Vet)',
    emergencyContactPhone: '+65 6251 7666',
    preferredVetClinic: 'Mount Pleasant Veterinary Centre (Whampoa)',
    avatarUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400',
    specialNotes: 'Needs a 30-min walk twice daily. Loves fetching tennis balls at Bishan Park.',
  },
  {
    id: 'pet-2',
    name: 'Luna',
    species: 'Cat',
    breed: 'British Shorthair',
    ageYears: 2,
    weightKg: 4.2,
    gender: 'Female',
    isNeutered: true,
    temperament: ['Calm', 'Independent', 'Curious'],
    feedingInstructions: '1 pouch wet food at 9 AM and 6 PM. Fresh water fountain refilled daily.',
    medicationInstructions: 'None',
    emergencyContactName: 'United Veterinary Clinic',
    emergencyContactPhone: '+65 6455 6880',
    preferredVetClinic: 'United Veterinary Clinic (Toa Payoh)',
    avatarUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    specialNotes: 'Shy around strangers for the first 10 minutes. Loves laser pointer games.',
  },
  {
    id: 'pet-3',
    name: 'Kiki',
    species: 'Rabbit',
    breed: 'Holland Lop',
    ageYears: 1,
    weightKg: 1.8,
    gender: 'Female',
    isNeutered: true,
    temperament: ['Gentle', 'Quiet'],
    feedingInstructions: 'Unlimited Timothy hay. Handful of fresh oxbow pellets at night.',
    emergencyContactName: 'Beak & Paws Vet Clinic',
    emergencyContactPhone: '+65 6388 2332',
    preferredVetClinic: 'Beak & Paws Vet',
    avatarUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=400',
  }
];

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'prov-1',
    name: 'Rachel Tan',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    bio: 'Full-time certified pet sitter & Fear-Free trained dog handler in Central SG. Over 5 years of professional pet care experience. I treat every furry guest like my own family!',
    verifiedSingPass: true,
    verifiedBackgroundCheck: true,
    verificationBadges: ['SingPass Verified', 'Pet First Aid Certified', 'NParks AVS Registered', '100+ SG Bookings'],
    rating: 4.98,
    reviewCount: 148,
    completedBookingsCount: 312,
    district: 'Bishan & Novena',
    serviceAreas: ['Bishan & Novena', 'Central / Orchard', 'Bukit Timah', 'East Coast / Katong'],
    experienceYears: 6,
    responseTimeMin: 8,
    cancellationPolicy: 'Flexible (24h full refund)',
    acceptedPetTypes: ['Dog', 'Cat', 'Rabbit'],
    featured: true,
    insuranceCovered: true,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    photos: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
    ],
    servicesOffered: [
      {
        serviceType: 'pet_sitting',
        title: 'In-Home Pet Sitting & Feeding',
        priceSGD: 28,
        unit: '/ visit (45 mins)',
        description: 'Feeding, fresh water, litter box cleaning, playtime, and photo/video live updates.'
      },
      {
        serviceType: 'dog_walking',
        title: 'Solo & Private Dog Walk',
        priceSGD: 25,
        unit: '/ 30 min walk',
        description: '1-on-1 walk in your neighborhood or park. GPS route tracking included.'
      },
      {
        serviceType: 'boarding',
        title: 'Luxury Home Pet Boarding',
        priceSGD: 55,
        unit: '/ night',
        description: 'Spacious air-conditioned landed home in Bishan with fenced garden.'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        providerId: 'prov-1',
        authorName: 'Evelyn Chew',
        authorDistrict: 'Novena',
        rating: 5,
        date: '2026-08-02',
        comment: 'Rachel sat for our Golden Retriever Milo during our 3-day trip to Bali. Her photo updates were so detailed and reassuring! Milo absolutely adored her.',
        petType: 'Golden Retriever',
        serviceName: 'In-Home Pet Sitting',
        verifiedBooking: true,
      },
      {
        id: 'rev-2',
        providerId: 'prov-1',
        authorName: 'Derrick Lim',
        authorDistrict: 'Orchard',
        rating: 5,
        date: '2026-07-28',
        comment: 'Super punctual and trustworthy. Rachel handled our senior cat Luna with extreme patience and gentleness. Highly recommended for busy SG professionals!',
        petType: 'British Shorthair',
        serviceName: 'In-Home Pet Sitting',
        verifiedBooking: true,
      }
    ]
  },
  {
    id: 'prov-2',
    name: 'Marcus & Chloe (Paws & Transport SG)',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300',
    bio: 'Dedicated point-to-point AC pet transportation across Singapore. Custom climate-controlled MPV with safety harnesses, anti-slip mats, and sanitized pet crates.',
    verifiedSingPass: true,
    verifiedBackgroundCheck: true,
    verificationBadges: ['SingPass Verified', 'Commercial Driver Licensed', 'Air-Con Pet Taxi', 'Insurance Covered'],
    rating: 4.95,
    reviewCount: 92,
    completedBookingsCount: 205,
    district: 'Central / Orchard',
    serviceAreas: ['Central / Orchard', 'Bishan & Novena', 'East Coast / Katong', 'Tampines & Pasir Ris', 'Jurong & Clementi', 'Bukit Timah', 'Punggol & Sengkang', 'Woodlands & Yishun'],
    experienceYears: 4,
    responseTimeMin: 5,
    cancellationPolicy: 'Flexible (24h full refund)',
    acceptedPetTypes: ['Dog', 'Cat', 'Rabbit', 'Bird', 'Small Animal'],
    featured: true,
    insuranceCovered: true,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    photos: [
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=600',
    ],
    servicesOffered: [
      {
        serviceType: 'pet_transport',
        title: 'Point-to-Point SG Pet Transport / Taxi',
        priceSGD: 35,
        unit: '/ one-way trip',
        description: 'Door-to-door safe AC transport anywhere in Singapore (Vet trips, Groomer, Airport, Beach).'
      },
      {
        serviceType: 'vet_visit',
        title: 'Vet Appointment Chaperone & Taxi',
        priceSGD: 65,
        unit: '/ round-trip (incl. wait)',
        description: 'Includes pickup, waiting during vet checkup, and return transport with medical report updates.'
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        providerId: 'prov-2',
        authorName: 'Grace Wong',
        authorDistrict: 'Katong',
        rating: 5,
        date: '2026-08-10',
        comment: 'Booked Marcus to transport my dog to Mount Pleasant Vet. Real-time GPS tracking on the app gave me complete peace of mind while I was stuck in meetings!',
        petType: 'Corgi',
        serviceName: 'Point-to-Point Pet Transport',
        verifiedBooking: true,
      }
    ]
  },
  {
    id: 'prov-3',
    name: 'Siti Aminah',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    bio: 'Professional cat whisperer & small pet caregiver in East Coast. Experienced with medication administration, senior pets, and shy kitties.',
    verifiedSingPass: true,
    verifiedBackgroundCheck: true,
    verificationBadges: ['SingPass Verified', 'Feline Behavioral Training', 'Vet Assistant Background'],
    rating: 4.99,
    reviewCount: 114,
    completedBookingsCount: 280,
    district: 'East Coast / Katong',
    serviceAreas: ['East Coast / Katong', 'Tampines & Pasir Ris', 'Central / Orchard', 'Punggol & Sengkang'],
    experienceYears: 7,
    responseTimeMin: 12,
    cancellationPolicy: 'Moderate (48h full refund)',
    acceptedPetTypes: ['Cat', 'Rabbit', 'Small Animal'],
    featured: true,
    insuranceCovered: true,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    photos: [
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=600',
    ],
    servicesOffered: [
      {
        serviceType: 'pet_sitting',
        title: 'Cat Drop-In Visit & Groom',
        priceSGD: 26,
        unit: '/ 45 min visit',
        description: 'Feeding, water fountain top-up, litter scoop, coat brushing, and play.'
      },
      {
        serviceType: 'boarding',
        title: 'Cat-Only Private Suite Boarding',
        priceSGD: 45,
        unit: '/ night',
        description: 'Quiet, dog-free private condo suite in Katong with multi-tier cat trees and pheromone diffusers.'
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        providerId: 'prov-3',
        authorName: 'Benjamin Lee',
        authorDistrict: 'Tampines',
        rating: 5,
        date: '2026-08-05',
        comment: 'Siti was an absolute angel for our 2 cats. She sent cute videos every visit and kept our home spotless!',
        petType: 'Ragdoll',
        serviceName: 'Cat Drop-In Visit',
        verifiedBooking: true,
      }
    ]
  },
  {
    id: 'prov-4',
    name: 'David K. (Urban Paws SG)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    bio: 'Energetic dog walker and exercise enthusiast covering Jurong, Clementi & Bukit Timah. Specialized in high-energy breeds and obedience reinforcement walks.',
    verifiedSingPass: true,
    verifiedBackgroundCheck: true,
    verificationBadges: ['SingPass Verified', 'Canine CPR Certified', 'K9 Handler Trained'],
    rating: 4.91,
    reviewCount: 65,
    completedBookingsCount: 140,
    district: 'Jurong & Clementi',
    serviceAreas: ['Jurong & Clementi', 'Bukit Timah', 'Woodlands & Yishun'],
    experienceYears: 3,
    responseTimeMin: 15,
    cancellationPolicy: 'Flexible (24h full refund)',
    acceptedPetTypes: ['Dog'],
    featured: false,
    insuranceCovered: true,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    photos: [
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=600',
    ],
    servicesOffered: [
      {
        serviceType: 'dog_walking',
        title: 'Power Walk & Park Run',
        priceSGD: 24,
        unit: '/ 45 min walk',
        description: 'High energy walk along Jurong Lake Gardens or West Coast Park. Paw clean after walk.'
      },
      {
        serviceType: 'pet_sitting',
        title: 'Dog Day Sitting & Care',
        priceSGD: 40,
        unit: '/ half day (4 hrs)',
        description: 'In-home supervision, feeding, two walks, and constant companionship.'
      }
    ],
    reviews: [
      {
        id: 'rev-5',
        providerId: 'prov-4',
        authorName: 'Samantha Tan',
        authorDistrict: 'Clementi',
        rating: 5,
        date: '2026-07-22',
        comment: 'David takes my Husky on 45-minute walks twice a week. Super reliable and my dog comes back happy and tired!',
        petType: 'Siberian Husky',
        serviceName: 'Power Walk',
        verifiedBooking: true,
      }
    ]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'SG-PAW-8821',
    serviceType: 'dog_walking',
    providerId: 'prov-1',
    providerName: 'Rachel Tan',
    providerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    providerDistrict: 'Bishan & Novena',
    petId: 'pet-1',
    petName: 'Milo',
    petSpecies: 'Dog',
    petAvatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400',
    date: 'Today',
    timeSlot: '17:00 - 18:00 SGT',
    status: 'in_progress',
    createdAt: '2026-08-13',
    gpsRouteProgress: 65,
    specialInstructions: 'Milo loves drinking water after his walk. Leash is hanging by the main door. Keylock box code: 8821.',
    priceBreakdown: {
      basePriceSGD: 25,
      durationOrQuantity: 1,
      subtotalSGD: 25,
      platformFeeSGD: 3,
      insuranceAddonSGD: 2.5,
      peakSurchargeSGD: 0,
      discountSGD: 0,
      totalSGD: 30.5
    },
    liveUpdates: [
      {
        id: 'up-1',
        timestamp: '17:02 SGT',
        type: 'status',
        title: 'Sitter Arrived at Location',
        description: 'Rachel Tan arrived at Bishan St 13 and safely picked up Milo.'
      },
      {
        id: 'up-2',
        timestamp: '17:10 SGT',
        type: 'gps',
        title: 'Walk Started at Bishan Park',
        description: 'Live GPS route active. Pacing: 4.2 km/h. Distance covered: 1.2 km.',
        lat: 1.3644,
        lng: 103.8467
      },
      {
        id: 'up-3',
        timestamp: '17:22 SGT',
        type: 'photo',
        title: 'Photo Update from Rachel',
        description: 'Milo is making new friends at the Bishan Park Dog Run! Hydrated and super energetic.',
        photoUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800'
      }
    ],
    messages: [
      {
        id: 'msg-1',
        sender: 'provider',
        senderName: 'Rachel Tan',
        text: 'Hi there! Just arrived at your block. Key retrieved safely from lockbox. Milo greeted me with happy wags!',
        timestamp: '17:03 SGT'
      },
      {
        id: 'msg-2',
        sender: 'user',
        senderName: 'You',
        text: 'Awesome Rachel! Please make sure he gets plenty of water, it’s quite warm out today in Bishan.',
        timestamp: '17:05 SGT'
      },
      {
        id: 'msg-3',
        sender: 'provider',
        senderName: 'Rachel Tan',
        text: 'Will do! Brought his collapsible water bowl and chilled water bottle.',
        timestamp: '17:06 SGT'
      }
    ]
  },
  {
    id: 'SG-PAW-7642',
    serviceType: 'pet_transport',
    providerId: 'prov-2',
    providerName: 'Marcus & Chloe (Paws & Transport SG)',
    providerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300',
    providerDistrict: 'Central / Orchard',
    petId: 'pet-2',
    petName: 'Luna',
    petSpecies: 'Cat',
    petAvatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    date: '2026-08-18',
    timeSlot: '10:30 SGT',
    pickupAddress: 'Blk 214 Bishan St 23, #08-110, Singapore 570214',
    dropoffAddress: 'United Veterinary Clinic, Toa Payoh Lor 4, Singapore 310500',
    status: 'confirmed',
    createdAt: '2026-08-12',
    specialInstructions: 'Luna in pink carrier. Round-trip vet checkup transport.',
    priceBreakdown: {
      basePriceSGD: 35,
      durationOrQuantity: 1,
      subtotalSGD: 35,
      platformFeeSGD: 3,
      insuranceAddonSGD: 2.5,
      peakSurchargeSGD: 0,
      discountSGD: 0,
      totalSGD: 40.5
    },
    liveUpdates: [],
    messages: [
      {
        id: 'msg-4',
        sender: 'provider',
        senderName: 'Marcus & Chloe',
        text: 'Booking confirmed! We will arrive at 10:20 SGT to assist carrying Luna to the MPV.',
        timestamp: 'Aug 12, 14:20'
      }
    ]
  },
  {
    id: 'SG-PAW-6109',
    serviceType: 'pet_sitting',
    providerId: 'prov-3',
    providerName: 'Siti Aminah',
    providerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    providerDistrict: 'East Coast / Katong',
    petId: 'pet-2',
    petName: 'Luna',
    petSpecies: 'Cat',
    petAvatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    date: '2026-07-20',
    timeSlot: '14:00 SGT',
    status: 'completed',
    createdAt: '2026-07-18',
    priceBreakdown: {
      basePriceSGD: 26,
      durationOrQuantity: 1,
      subtotalSGD: 26,
      platformFeeSGD: 3,
      insuranceAddonSGD: 0,
      peakSurchargeSGD: 0,
      discountSGD: 0,
      totalSGD: 29.0
    },
    liveUpdates: [],
    messages: []
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-101',
  name: 'Brendon Lim',
  email: 'brendon.lim@example.sg',
  phone: '+65 9123 4567',
  district: 'Bishan & Novena',
  address: 'Blk 214 Bishan St 23, #08-110, Singapore 570214',
  petProfiles: INITIAL_PETS,
  loyaltyPoints: 340, // 340 PawPoints = $34 SGD value
  savedProviderIds: ['prov-1', 'prov-2']
};
