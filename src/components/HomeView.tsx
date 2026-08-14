import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Dog, 
  Cat, 
  Car, 
  Home, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Camera, 
  Navigation, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  Heart, 
  Clock, 
  Award, 
  Zap,
  Gift
} from 'lucide-react';
import { AppView, Provider, ServiceType, SingaporeDistrict, PetSpecies } from '../types';
import { SINGAPORE_DISTRICTS } from '../data/mockData';

interface HomeViewProps {
  setCurrentView: (view: AppView) => void;
  providers: Provider[];
  onSelectProvider: (provider: Provider) => void;
  onOpenBookingModalWith: (service?: ServiceType, provider?: Provider) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentView,
  providers,
  onSelectProvider,
  onOpenBookingModalWith
}) => {
  // Search Bar State
  const [selectedService, setSelectedService] = useState<ServiceType>('pet_sitting');
  const [selectedDistrict, setSelectedDistrict] = useState<SingaporeDistrict>('Bishan & Novena');
  const [selectedPetType, setSelectedPetType] = useState<PetSpecies>('Dog');
  const [bookingDate, setBookingDate] = useState<string>('Today');

  // Interactive Live Tracking Demo State
  const [demoActive, setDemoActive] = useState<boolean>(true);
  const [demoTab, setDemoTab] = useState<'gps' | 'photos' | 'chat'>('gps');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('search');
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
                  onClick={() => setCurrentView('provider_dashboard')}
                  className="bg-white hover:bg-slate-50 text-slate-800 font-bold px-5 py-3.5 rounded-xl border border-slate-300 transition-colors text-sm flex items-center space-x-2"
                >
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Become a Provider</span>
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

            {/* Right Hero Image & Quick Hero Search Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-amber-100/80 p-5 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <p className="font-bold text-slate-900 text-base">Quick Search & Book</p>
                  <p className="text-xs text-slate-500">Find available verified providers near your district</p>
                </div>

                <form onSubmit={handleQuickSearch} className="space-y-3 text-xs">
                  {/* Service Type Selector */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Service Required</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedService('pet_sitting')}
                        className={`p-2 rounded-lg text-left border flex items-center space-x-2 transition-all ${
                          selectedService === 'pet_sitting' 
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Home className="w-4 h-4 text-amber-500" />
                        <div>
                          <p className="font-bold">Pet Sitting</p>
                          <p className="text-[10px] text-slate-500">fr $25/visit</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedService('pet_transport')}
                        className={`p-2 rounded-lg text-left border flex items-center space-x-2 transition-all ${
                          selectedService === 'pet_transport' 
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Car className="w-4 h-4 text-orange-500" />
                        <div>
                          <p className="font-bold">Pet Transport</p>
                          <p className="text-[10px] text-slate-500">fr $35/trip</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedService('dog_walking')}
                        className={`p-2 rounded-lg text-left border flex items-center space-x-2 transition-all ${
                          selectedService === 'dog_walking' 
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Dog className="w-4 h-4 text-emerald-500" />
                        <div>
                          <p className="font-bold">Dog Walking</p>
                          <p className="text-[10px] text-slate-500">fr $22/walk</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedService('boarding')}
                        className={`p-2 rounded-lg text-left border flex items-center space-x-2 transition-all ${
                          selectedService === 'boarding' 
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Cat className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="font-bold">Boarding</p>
                          <p className="text-[10px] text-slate-500">fr $45/night</p>
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
          {/* Card 1: Pet Sitting */}
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

          {/* Card 2: Pet Transport */}
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

          {/* Card 3: Dog Walking */}
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

          {/* Card 4: Boarding */}
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

          {/* Card 5: Vet Visit & Grooming */}
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


      {/* 4. INTERACTIVE LIVE GPS & PHOTO UPDATES DEMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left explanation */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live Marketplace Safety Feature</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Real-Time GPS Tracking & Live Photo Updates
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Never worry while you're at work or away. Watch your dog's live walking path around Bishan Park or East Coast Park, and receive timestamped photo check-ins directly in your app.
              </p>

              <div className="space-y-2 text-xs text-slate-200 pt-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Interactive GPS route map with speed & distance tracker</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant high-res photo stream during visits and walks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct 1-on-1 in-app messaging with your sitter</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => setCurrentView('active_booking')}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center space-x-2 shadow-md"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Interactive Live Booking View</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Map / Feed Simulation Widget */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-700/80 p-4 shadow-inner space-y-4">
              {/* Tab Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex space-x-2 text-xs">
                  <button
                    onClick={() => setDemoTab('gps')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      demoTab === 'gps' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    📡 Live GPS Route
                  </button>
                  <button
                    onClick={() => setDemoTab('photos')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      demoTab === 'photos' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    📸 Photo Updates
                  </button>
                  <button
                    onClick={() => setDemoTab('chat')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      demoTab === 'chat' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    💬 Live Chat
                  </button>
                </div>

                <span className="inline-flex items-center text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full animate-pulse">
                  ● LIVE DEMO
                </span>
              </div>

              {/* Tab Content Display */}
              {demoTab === 'gps' && (
                <div className="space-y-3">
                  <div className="relative h-48 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                    {/* Simulated Map Canvas Graphic */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    
                    {/* Simulated Path Line */}
                    <svg className="absolute inset-0 w-full h-full stroke-amber-400 stroke-2 fill-none">
                      <path d="M 40 140 Q 120 40 220 100 T 380 60 T 520 120" strokeDasharray="4 4" className="animate-pulse" />
                    </svg>

                    {/* Current Position Pin */}
                    <div className="absolute top-12 right-28 flex flex-col items-center animate-bounce">
                      <div className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                        Milo & Rachel (1.4 km)
                      </div>
                      <div className="w-4 h-4 bg-amber-400 rounded-full border-2 border-white shadow-lg"></div>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-xs p-2 rounded-lg border border-slate-700 text-[10px] text-slate-300 space-y-1">
                      <p className="font-bold text-amber-400">Bishan Park Walk Route</p>
                      <p>Time Elapsed: <strong>24 mins</strong> | Pace: <strong>4.2 km/h</strong></p>
                    </div>
                  </div>
                </div>
              )}

              {demoTab === 'photos' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 group">
                    <img 
                      src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400" 
                      alt="Photo update" 
                      className="w-full h-36 object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 p-2 text-[10px]">
                      <p className="font-bold text-white">Milo at Bishan Park Dog Run</p>
                      <p className="text-amber-300">Sent at 17:22 SGT</p>
                    </div>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-slate-800 group">
                    <img 
                      src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=400" 
                      alt="Photo update 2" 
                      className="w-full h-36 object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 p-2 text-[10px]">
                      <p className="font-bold text-white">Hydration & Water Break</p>
                      <p className="text-amber-300">Sent at 17:15 SGT</p>
                    </div>
                  </div>
                </div>
              )}

              {demoTab === 'chat' && (
                <div className="space-y-2 text-xs bg-slate-900 p-3 rounded-xl border border-slate-800 h-44 overflow-y-auto">
                  <div className="bg-slate-800 p-2 rounded-lg max-w-[80%] text-slate-200">
                    <p className="font-bold text-[10px] text-amber-400">Rachel Tan (Sitter)</p>
                    <p>Hi! Key retrieved safely. Milo greeted me with happy wags!</p>
                  </div>
                  <div className="bg-amber-600/30 p-2 rounded-lg max-w-[80%] ml-auto text-amber-100">
                    <p className="font-bold text-[10px] text-amber-300">You</p>
                    <p>Awesome! Please make sure he drinks plenty of water today.</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>


      {/* 5. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Simple & Fast Booking</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Book Trusted Pet Care in 4 Easy Steps</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-extrabold flex items-center justify-center mx-auto text-base">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Select Service & District</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Choose from pet sitting, transport, walking, or boarding across Singapore districts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-extrabold flex items-center justify-center mx-auto text-base">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Match Verified Sitters</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Compare SingPass verified providers, read real reviews, and check instant availability.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-extrabold flex items-center justify-center mx-auto text-base">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm">PayNow / GrabPay</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Book securely with transparent SGD pricing and SGD $1,000,000 Care Insurance coverage.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-extrabold flex items-center justify-center mx-auto text-base">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Live GPS & Photo Feed</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track walks in real-time, view live photos, and chat directly with your provider.
            </p>
          </div>
        </div>
      </section>


      {/* 6. TRUST & SAFETY SECTION */}
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
              <h3 className="font-bold text-slate-900 text-base">SingPass Identity & Police Check</h3>
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


      {/* 7. LOYALTY & PAWPOINTS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">
              <Gift className="w-4 h-4 text-amber-200" />
              <span>PawPoints Loyalty Rewards</span>
            </div>
            <h3 className="text-2xl font-black">Earn Points on Every Booking</h3>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
              Earn 10 PawPoints for every SGD $1 spent. Redeem 100 points for $10 OFF your next pet sitting or transport booking!
            </p>
          </div>

          <button
            onClick={() => setCurrentView('customer_dashboard')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md shrink-0 transition-colors"
          >
            Check My PawPoints Balance
          </button>
        </div>
      </section>


      {/* 8. PARTNERS & VET CLINIC INTEGRATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trusted Ecosystem Partners in Singapore</p>
        <div className="flex flex-wrap justify-center items-center gap-8 text-xs font-bold text-slate-500 opacity-80">
          <span className="p-2 bg-white rounded-lg border border-slate-200">🏥 Mount Pleasant Vet Centre</span>
          <span className="p-2 bg-white rounded-lg border border-slate-200">🏥 United Veterinary Clinic</span>
          <span className="p-2 bg-white rounded-lg border border-slate-200">🛡️ MSIG Pet Insurance SG</span>
          <span className="p-2 bg-white rounded-lg border border-slate-200">🐾 AVS / NParks Registered</span>
          <span className="p-2 bg-white rounded-lg border border-slate-200">🇸🇬 SingPass Auth</span>
        </div>
      </section>


      {/* 9. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
        <h2 className="text-3xl font-black">Ready to Give Your Pet the Best Care in Singapore?</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Join thousands of Singapore pet parents who rely on PawConnect for peace of mind while working or travelling.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onOpenBookingModalWith('pet_sitting')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-transform transform active:scale-95 text-sm"
          >
            Find a Pet Service Now
          </button>
        </div>
      </section>
    </div>
  );
};
