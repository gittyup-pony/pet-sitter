import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  Clock, 
  Car, 
  Home, 
  Dog, 
  Cat, 
  Sparkles,
  Map,
  CheckCircle2
} from 'lucide-react';
import { Provider, ServiceType, SingaporeDistrict, PetSpecies } from '../types';
import { SINGAPORE_DISTRICTS } from '../data/mockData';

interface SearchViewProps {
  providers: Provider[];
  onSelectProvider: (provider: Provider) => void;
  onOpenBookingModalWith: (service?: ServiceType, provider?: Provider) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  providers,
  onSelectProvider,
  onOpenBookingModalWith
}) => {
  // Filters
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedPetType, setSelectedPetType] = useState<string>('all');
  const [maxPriceSGD, setMaxPriceSGD] = useState<number>(100);
  const [minRating, setMinRating] = useState<number>(4.5);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price' | 'reviews'>('recommended');
  const [showMap, setShowMap] = useState<boolean>(false);

  // Filter Logic
  const filteredProviders = providers.filter((prov) => {
    // Verified check
    if (verifiedOnly && !prov.verifiedSingPass) return false;

    // District check
    if (selectedDistrict !== 'all' && prov.district !== selectedDistrict && !prov.serviceAreas.includes(selectedDistrict as SingaporeDistrict)) {
      return false;
    }

    // Pet type check
    if (selectedPetType !== 'all' && !prov.acceptedPetTypes.includes(selectedPetType as PetSpecies)) {
      return false;
    }

    // Rating check
    if (prov.rating < minRating) return false;

    // Service & price check
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
    // Recommended default (featured first, then rating)
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Verified Pet Sitters & Transport in Singapore
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comparing {sortedProviders.length} verified local providers near you
          </p>
        </div>

        {/* Map Toggle & Sort */}
        <div className="flex items-center space-x-3 text-xs">
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
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Provider List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Filter Sidebar */}
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
                setMaxPriceSGD(100);
                setMinRating(4.5);
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

          {/* Location / District */}
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
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$20</span>
              <span>$150+</span>
            </div>
          </div>

          {/* Min Rating */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-slate-800 block">Minimum Rating</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[4.0, 4.5, 4.8].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setMinRating(rate)}
                  className={`py-1.5 rounded-lg border text-center font-bold transition-all ${
                    minRating === rate
                      ? 'bg-amber-50 border-amber-500 text-amber-900'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {rate}+ ★
                </button>
              ))}
            </div>
          </div>

          {/* SingPass Verified Toggle */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-slate-900">SingPass Verified Only</p>
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


        {/* Right Content: Provider Cards & Optional Map */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* District Map Panel (if toggled) */}
          {showMap && (
            <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-700 shadow-md space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-amber-400 flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Singapore District Coverage</span>
                </span>
                <span className="text-[10px] text-slate-400">Showing {sortedProviders.length} Active Providers</span>
              </div>
              <div className="relative h-44 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                <div className="text-center space-y-1">
                  <p className="text-xs font-bold text-amber-300">🗺️ Singapore District Pins Active</p>
                  <p className="text-[11px] text-slate-400">Bishan • Orchard • Katong • Tampines • Jurong • Bukit Timah</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          {sortedProviders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <p className="text-slate-800 font-bold text-base">No providers match your exact filters</p>
              <p className="text-xs text-slate-500">Try adjusting your price range or district filter to see more options in Singapore.</p>
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
                  {/* Avatar & Badges */}
                  <div className="flex sm:flex-col items-center sm:items-start space-x-3 sm:space-x-0 space-y-0 sm:space-y-2 shrink-0">
                    <img
                      src={prov.avatarUrl}
                      alt={prov.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-200 shadow-xs"
                    />
                    <div className="text-left">
                      <div className="flex items-center text-amber-500 font-extrabold text-sm">
                        <Star className="w-4 h-4 fill-amber-400 mr-1" />
                        <span>{prov.rating}</span>
                        <span className="text-[10px] text-slate-400 font-normal ml-1">({prov.reviewCount})</span>
                      </div>
                      <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                        ⚡ {prov.responseTimeMin}m response
                      </p>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h3 className="font-extrabold text-slate-900 text-base hover:text-amber-600 transition-colors cursor-pointer" onClick={() => onSelectProvider(prov)}>
                            {prov.name}
                          </h3>
                          {prov.verifiedSingPass && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center space-x-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>SingPass</span>
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

                    {/* Services Pill */}
                    <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                      {prov.servicesOffered.map((srv, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md border border-slate-200">
                          {srv.title}: <strong>${srv.priceSGD}</strong>
                        </span>
                      ))}
                    </div>

                    {/* Action Bar */}
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
