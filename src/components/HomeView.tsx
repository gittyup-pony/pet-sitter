import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Dog, 
  Cat, 
  Car, 
  Home, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Navigation, 
  ArrowRight, 
  PhoneCall, 
  Heart, 
  Award, 
  Zap,
  Gift,
  Crosshair,
  Crown
} from 'lucide-react';
import { AppView, Provider, ServiceType, SingaporeDistrict, PetSpecies } from '../types';
import { SINGAPORE_DISTRICTS } from '../data/mockData';

interface HomeViewProps {
  setCurrentView: (view: AppView) => void;
  providers: Provider[];
  onSelectProvider: (provider: Provider) => void;
  onOpenBookingModalWith: (service?: ServiceType, provider?: Provider) => void;
  onQuickSearchSubmit: (service: ServiceType, district: SingaporeDistrict, petType: PetSpecies) => void;
  onOpenSubscriptionsModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentView,
  providers,
  onSelectProvider,
  onOpenBookingModalWith,
  onQuickSearchSubmit,
  onOpenSubscriptionsModal
}) => {
  // Search Bar State
  const [selectedService, setSelectedService] = useState<ServiceType>('pet_sitting');
  const [selectedDistrict, setSelectedDistrict] = useState<SingaporeDistrict>('Bishan & Novena');
  const [selectedPetType, setSelectedPetType] = useState<PetSpecies>('Dog');
  const [bookingDate, setBookingDate] = useState<string>('Today');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Interactive Live Tracking Demo State
  const [demoTab, setDemoTab] = useState<'gps' | 'photos' | 'chat'>('gps');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickSearchSubmit(selectedService, selectedDistrict, selectedPetType);
  };

  // Item 3: Search Near Me with Geolocation request
  const handleSearchNearMe = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          const { latitude, longitude } = position.coords;
          setUserCoords({ lat: latitude, lng: longitude });
          // Automatically pick Bishan & Novena or central SG district
          setSelectedDistrict('Bishan & Novena');
          alert(`📍 Geolocation Access Granted!\nLatitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}\n\nSearching for verified sitters and taxis nearest to your current location using Google Maps SDK API.`);
          onQuickSearchSubmit(selectedService, 'Bishan & Novena', selectedPetType);
        },
        (error) => {
          setIsLocating(false);
          alert('Could not retrieve location. Showing all Singapore districts.');
        }
      );
    } else {
      setIsLocating(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-amber-500/10 via-orange-50/50 to-white pt-8 pb-16 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Singapore's Vetted & SingPass Verified Pet Network</span>
              </div>

              {/* Emotional Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Trusted Pet Care & Transport for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Busy Singaporeans</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Whether you're working late in Raffles Place, travelling overseas, or need point-to-point AC pet taxi to the vet — book vetted local sitters with real-time GPS tracking and live photo check-ins.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenBookingModalWith(selectedService)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-base flex items-center space-x-2 transform active:scale-95"
                >
                  <Search className="w-5 h-5" />
                  <span>Find a Pet Service</span>
                </button>

                <button
                  onClick={onOpenSubscriptionsModal}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold px-5 py-3.5 rounded-xl border border-amber-300 transition-colors text-sm flex items-center space-x-2"
                >
                  <Crown className="w-4 h-4 text-amber-600" />
                  <span>PawConnect Care+ Membership</span>
                </button>
              </div>

              {/* Social Proof Bar */}
              <div className="pt-4 flex items-center space-x-6 text-xs text-slate-500 border-t border-amber-100/80">
                <div className="flex items-center space-x-1 text-slate-700 font-semibold">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span>4.98/5 Rating</span>
                </div>
                <span>•</span>
                <span><strong>3,400+</strong> SG Pet Bookings</span>
                <span>•</span>
                <span><strong>SGD $1M</strong> Care Insurance</span>
              </div>
            </div>

            {/* Right Hero Quick Search Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-amber-100/80 p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <p className="font-bold text-slate-900 text-base">Quick Search & Book</p>
                    <p className="text-xs text-slate-500">Find available verified providers near your district</p>
                  </div>

                  {/* Item 3: Search Near Me Button */}
                  <button
                    type="button"
                    onClick={handleSearchNearMe}
                    disabled={isLocating}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2.5 py-1.5 rounded-xl text-[11px] flex items-center space-x-1 transition-colors shrink-0"
                    title="Request browser geolocation access for Google Maps SDK"
                  >
                    <Crosshair className={`w-3.5 h-3.5 text-emerald-600 ${isLocating ? 'animate-spin' : ''}`} />
                    <span>{isLocating ? 'Locating...' : 'Search Near Me'}</span>
                  </button>
                </div>

                <form onSubmit={handleQuickSearch} className="space-y-3 text-xs">
                  {/* Service Type Selector - ITEM 11: Includes Vet Chaperone */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Service Required</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedService('pet_sitting')}
                        className={`p-2 rounded-lg text-left border flex items-center space-x-1.5 transition-all ${
                          selectedService === 'pet_sitting' 
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Home className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <div>
                          <p className="font-bold text-[11px]">Pet Sitting</p>
                          <p className="text-[9px] text-slate-500">fr $25/visit</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedService('pet_transport')}
                        className={`p-2 rounded-lg text-left border flex items-center space-x-1.5 transition-all ${
                          selectedService === 'pet_transport' 
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Car className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <div>
                          <p className="font-bold text-[11px]">Pet Taxi</p>
                          <p className="text-[9px] text-slate-500">fr $35/trip</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedService('dog_walking')}
                        className={`p-2 rounded-lg text-left border flex items-center space-x-1.5 transition-all ${
                          selectedService === 'dog_walking' 
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Dog className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <div>
                          <p className="font-bold text-[11px]">Dog Walking</p>
                          <p className="text-[9px] text-slate-500">fr $22/walk</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedService('boarding')}
                        className={`p-2 rounded-lg text-left border flex items-center space-x-1.5 transition-all ${
                          selectedService === 'boarding' 
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Cat className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <div>
                          <p className="font-bold text-[11px]">Boarding</p>
                          <p className="text-[9px] text-slate-500">fr $45/night</p>
                        </div>
                      </button>

                      {/* Item 11: Added Vet Chaperone */}
                      <button
                        type="button"
                        onClick={() => setSelectedService('vet_visit')}
                        className={`p-2 rounded-lg text-left border flex items-center space-x-1.5 transition-all col-span-2 sm:col-span-1 ${
                          selectedService === 'vet_visit' 
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <div>
                          <p className="font-bold text-[11px]">Vet Chaperone</p>
                          <p className="text-[9px] text-slate-500">fr $65/visit</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Location Selector */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Singapore Location / District</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value as SingaporeDistrict)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-slate-800 bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        {SINGAPORE_DISTRICTS.map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Pet Type & Date */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Pet Type</label>
                      <select
                        value={selectedPetType}
                        onChange={(e) => setSelectedPetType(e.target.value as PetSpecies)}
                        className="w-full px-2 py-2 border border-slate-300 rounded-lg text-slate-800 bg-white"
                      >
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Bird">Bird</option>
                        <option value="Small Animal">Small Animal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Date</label>
                      <select
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-2 py-2 border border-slate-300 rounded-lg text-slate-800 bg-white"
                      >
                        <option value="Today">Today (On-Demand)</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="This Weekend">This Weekend</option>
                        <option value="Custom Date">Custom Date...</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Search */}
                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl shadow-sm text-sm transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Search className="w-4 h-4 text-amber-400" />
                    <span>Search Available Sitters & Taxi</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. QUICK SERVICE SELECTOR GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-slate-900">One Platform for All Singapore Pet Care Needs</h2>
          <p className="text-sm text-slate-600 mt-1">Transparent SGD pricing, verified background checks, and instant booking.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div 
            onClick={() => onOpenBookingModalWith('pet_sitting')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer group text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Pet Sitting</h3>
              <p className="text-xs text-slate-500 mt-0.5">In-home drop visits & feeding</p>
              <p className="text-xs font-bold text-amber-600 mt-2">fr $25 / visit</p>
            </div>
          </div>

          <div 
            onClick={() => onOpenBookingModalWith('pet_transport')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer group text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Pet Transport / Taxi</h3>
              <p className="text-xs text-slate-500 mt-0.5">Point-to-point AC rides</p>
              <p className="text-xs font-bold text-orange-600 mt-2">fr $35 / trip</p>
            </div>
          </div>

          <div 
            onClick={() => onOpenBookingModalWith('dog_walking')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer group text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Dog className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Dog Walking</h3>
              <p className="text-xs text-slate-500 mt-0.5">GPS tracked 1-on-1 walks</p>
              <p className="text-xs font-bold text-emerald-600 mt-2">fr $22 / walk</p>
            </div>
          </div>

          <div 
            onClick={() => onOpenBookingModalWith('boarding')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer group text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Cat className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Home Boarding</h3>
              <p className="text-xs text-slate-500 mt-0.5">Overnight stays in sitter home</p>
              <p className="text-xs font-bold text-blue-600 mt-2">fr $45 / night</p>
            </div>
          </div>

          <div 
            onClick={() => onOpenBookingModalWith('vet_visit')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer group text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Vet Chaperone</h3>
              <p className="text-xs text-slate-500 mt-0.5">Vet appointment escort</p>
              <p className="text-xs font-bold text-purple-600 mt-2">fr $65 / appointment</p>
            </div>
          </div>
        </div>
      </section>


      {/* 3. FEATURED VERIFIED PROVIDERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SingPass & Background Checked</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Featured Local Sitters & Drivers</h2>
          </div>
          <button
            onClick={() => setCurrentView('search')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center space-x-1"
          >
            <span>View all providers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {providers.slice(0, 3).map((prov) => (
            <div
              key={prov.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5 space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={prov.avatarUrl}
                      alt={prov.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-amber-200"
                    />
                    <div>
                      <div className="flex items-center space-x-1">
                        <h3 className="font-bold text-slate-900 text-base">{prov.name}</h3>
                        <ShieldCheck className="w-4 h-4 text-emerald-500" title="SingPass ID Verified" />
                      </div>
                      <p className="text-xs text-slate-500">{prov.district}</p>
                      <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                        ⚡ Response time: &lt; {prov.responseTimeMin} mins
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-amber-500 font-bold text-sm">
                      <Star className="w-4 h-4 fill-amber-400 mr-1" />
                      <span>{prov.rating}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">({prov.reviewCount} reviews)</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {prov.verificationBadges.slice(0, 3).map((badge, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  "{prov.bio}"
                </p>

                {/* Services starting price */}
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-500">Services from:</span>
                  <span className="font-bold text-amber-700 text-sm">
                    SGD ${prov.servicesOffered[0]?.priceSGD} {prov.servicesOffered[0]?.unit}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={() => onSelectProvider(prov)}
                  className="w-full py-2 bg-white hover:bg-slate-100 text-slate-800 rounded-lg border border-slate-200 transition-colors"
                >
                  View Profile
                </button>
                <button
                  onClick={() => onOpenBookingModalWith('pet_sitting', prov)}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-xs transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 4. TRUST & SAFETY SECTION - ITEM 12: Renamed heading to Verified Providers */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Singapore Safety First</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Why Singapore Pet Owners Trust PawConnect</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Verified Providers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every provider undergoes mandatory identity verification via SingPass and background check verification prior to receiving booking requests.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">SGD $1,000,000 PawCare Guarantee</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every booking is automatically protected with emergency veterinary medical coverage and third-party liability insurance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">24/7 Singapore Emergency Vet Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct hotline (+65 6789 1234) connected to premier emergency veterinary partner clinics across Singapore (Mount Pleasant, United Vet).
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
