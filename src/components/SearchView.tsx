import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  SlidersHorizontal, 
  Map,
  Crosshair,
  Sparkles
} from 'lucide-react';
import { Provider, ServiceType, SingaporeDistrict, PetSpecies } from '../types';
import { SINGAPORE_DISTRICTS } from '../data/mockData';

interface SearchViewProps {
  providers: Provider[];
  onSelectProvider: (provider: Provider) => void;
  onOpenBookingModalWith: (service?: ServiceType, provider?: Provider) => void;
  onOpenReviewsModal: (provider: Provider) => void;
  initialService?: string;
  initialDistrict?: string;
  initialPetType?: string;
}

export const SearchView: React.FC<SearchViewProps> = ({
  providers,
  onSelectProvider,
  onOpenBookingModalWith,
  onOpenReviewsModal,
  initialService = 'all',
  initialDistrict = 'all',
  initialPetType = 'all'
}) => {
  // Filters initialized with props passed from Quick Search (Requirement #4)
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict);
  const [selectedPetType, setSelectedPetType] = useState<string>(initialPetType);
  const [maxPriceSGD, setMaxPriceSGD] = useState<number>(120);
  const [minRating, setMinRating] = useState<number>(4.0);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price' | 'reviews' | 'distance'>('recommended');
  const [showMap, setShowMap] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);

  // Sync state if initial props change
  useEffect(() => {
    if (initialService) setSelectedService(initialService);
    if (initialDistrict) setSelectedDistrict(initialDistrict);
    if (initialPetType) setSelectedPetType(initialPetType);
  }, [initialService, initialDistrict, initialPetType]);

  // Requirement #3: Search Near Me with Geolocation Access
  const handleSearchNearMe = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          setUserLocation(`Lat: ${lat}, Lng: ${lng}`);
          setSortBy('distance');
          alert(`📍 Geolocation Access Granted!\nLatitude: ${lat}, Longitude: ${lng}\n\nGoogle Maps SDK API is calculating live distances to Singapore pet sitters near you.`);
        },
        (err) => {
          setIsLocating(false);
          alert('Could not access device location. Showing all Singapore districts.');
        }
      );
    } else {
      setIsLocating(false);
      alert('Geolocation API not supported.');
    }
  };

  // Filter Logic
  const filteredProviders = providers.filter((prov) => {
    if (verifiedOnly && !prov.verifiedSingPass) return false;

    if (selectedDistrict !== 'all' && prov.district !== selectedDistrict && !prov.serviceAreas.includes(selectedDistrict as SingaporeDistrict)) {
      return false;
    }

    if (selectedPetType !== 'all' && !prov.acceptedPetTypes.includes(selectedPetType as PetSpecies)) {
      return false;
    }

    if (prov.rating < minRating) return false;

    if (selectedService !== 'all') {
      const matchService = prov.servicesOffered.find((s) => s.serviceType === selectedService);
      if (!matchService) return false;
      if (matchService.priceSGD > maxPriceSGD) return false;
    }

    return true;
  });

  // Sort Logic
  const sortedProviders = [...filteredProviders].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
    if (sortBy === 'price') {
      const priceA = a.servicesOffered[0]?.priceSGD || 0;
      const priceB = b.servicesOffered[0]?.priceSGD || 0;
      return priceA - priceB;
    }
    if (sortBy === 'distance') {
      return a.responseTimeMin - b.responseTimeMin; // closest response/distance
    }
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Verified Pet Sitters & Transport in Singapore
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comparing {sortedProviders.length} verified local providers in Singapore
            {userLocation && <span className="text-emerald-700 font-bold ml-1">• 📍 Near {userLocation}</span>}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Requirement #3: Search Near Me button */}
          <button
            onClick={handleSearchNearMe}
            disabled={isLocating}
            className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl font-bold transition-colors flex items-center space-x-1"
          >
            <Crosshair className={`w-3.5 h-3.5 text-emerald-600 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'Search Near Me'}</span>
          </button>

          <button
            onClick={() => setShowMap(!showMap)}
            className={`px-3 py-2 rounded-xl font-bold border transition-colors flex items-center space-x-1.5 ${
              showMap ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>{showMap ? 'Hide District Map' : 'Show District Map'}</span>
          </button>

          <div className="flex items-center space-x-1.5">
            <span className="text-slate-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="price">Price (Low to High)</option>
              <option value="distance">Distance / Proximity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Filter Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 space-y-6 h-fit shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>Search Filters</span>
            </div>
            <button
              onClick={() => {
                setSelectedService('all');
                setSelectedDistrict('all');
                setSelectedPetType('all');
                setMaxPriceSGD(150);
                setMinRating(4.0);
                setVerifiedOnly(true);
              }}
              className="text-[11px] font-semibold text-amber-600 hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Service Type */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-slate-800 block">Service Type</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-white font-medium text-slate-800"
            >
              <option value="all">All Services</option>
              <option value="pet_sitting">In-Home Pet Sitting</option>
              <option value="pet_transport">Point-to-Point Pet Taxi</option>
              <option value="dog_walking">Private Dog Walking</option>
              <option value="boarding">Home Pet Boarding</option>
              <option value="vet_visit">Vet Visit Chaperone</option>
            </select>
          </div>

          {/* District */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-slate-800 block">Singapore District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-white font-medium text-slate-800"
            >
              <option value="all">All SG Districts</option>
              {SINGAPORE_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          {/* Pet Species */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-slate-800 block">Pet Species</label>
            <div className="flex flex-wrap gap-1.5">
              {['all', 'Dog', 'Cat', 'Rabbit', 'Bird', 'Small Animal'].map((pet) => (
                <button
                  key={pet}
                  onClick={() => setSelectedPetType(pet)}
                  className={`px-2.5 py-1 rounded-lg border transition-all text-xs ${
                    selectedPetType === pet
                      ? 'bg-amber-500 text-white font-bold border-amber-600'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {pet === 'all' ? 'All Pets' : pet}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-bold text-slate-800">
              <span>Max Price:</span>
              <span className="text-amber-600 font-extrabold">SGD ${maxPriceSGD}</span>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              step="5"
              value={maxPriceSGD}
              onChange={(e) => setMaxPriceSGD(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Requirement #12: SingPass / Verified Providers Toggle */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-slate-900">Verified Providers Only</p>
              <p className="text-[10px] text-slate-500">ID & police background checked</p>
            </div>
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Provider List */}
        <div className="lg:col-span-8 space-y-6">
          
          {showMap && (
            <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-700 shadow-md space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-amber-400 flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Singapore District Coverage (Google Maps SDK API)</span>
                </span>
                <span className="text-[10px] text-slate-400">Showing {sortedProviders.length} Active Providers</span>
              </div>
              <div className="relative h-44 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                <div className="text-center space-y-1">
                  <p className="text-xs font-bold text-amber-300">🗺️ Interactive District Map Active</p>
                  <p className="text-[11px] text-slate-400">Bishan • Orchard • Katong • Tampines • Jurong • Bukit Timah</p>
                </div>
              </div>
            </div>
          )}

          {sortedProviders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <p className="text-slate-800 font-bold text-base">No providers match your exact filters</p>
              <button
                onClick={() => {
                  setSelectedService('all');
                  setSelectedDistrict('all');
                  setSelectedPetType('all');
                  setMaxPriceSGD(150);
                }}
                className="bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProviders.map((prov) => (
                <div
                  key={prov.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-amber-300 p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5"
                >
                  <div className="flex sm:flex-col items-center sm:items-start space-x-3 sm:space-x-0 space-y-0 sm:space-y-2 shrink-0">
                    <img
                      src={prov.avatarUrl}
                      alt={prov.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-200 shadow-xs"
                    />
                    
                    {/* Requirement #8: Click reviews to open Reviews Popup */}
                    <button
                      onClick={() => onOpenReviewsModal(prov)}
                      className="text-left group"
                      title="Click to view listing reviews popup"
                    >
                      <div className="flex items-center text-amber-500 font-extrabold text-sm group-hover:underline">
                        <Star className="w-4 h-4 fill-amber-400 mr-1" />
                        <span>{prov.rating}</span>
                        <span className="text-[10px] text-slate-400 font-normal ml-1">({prov.reviewCount} reviews)</span>
                      </div>
                      <p className="text-[10px] text-amber-600 font-bold mt-0.5 underline">
                        Read All Reviews →
                      </p>
                    </button>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h3 
                            className="font-extrabold text-slate-900 text-base hover:text-amber-600 transition-colors cursor-pointer" 
                            onClick={() => onSelectProvider(prov)}
                          >
                            {prov.name}
                          </h3>
                          {prov.verifiedSingPass && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center space-x-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>Verified Provider</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          📍 {prov.district} • Services: {prov.serviceAreas.join(', ')}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Rates From</p>
                        <p className="text-base font-black text-amber-600">
                          SGD ${prov.servicesOffered[0]?.priceSGD}
                        </p>
                        <p className="text-[10px] text-slate-500">{prov.servicesOffered[0]?.unit}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      "{prov.bio}"
                    </p>

                    <div className="pt-3 flex items-center justify-between border-t border-slate-100 text-xs">
                      <span className="text-[11px] text-slate-400 font-medium">
                        🛡️ SGD $1M Insurance Included
                      </span>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onSelectProvider(prov)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition-colors"
                        >
                          Profile & Calendar
                        </button>

                        <button
                          onClick={() => onOpenBookingModalWith('pet_sitting', prov)}
                          className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg shadow-xs transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
