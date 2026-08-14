import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  ArrowLeft,
  CheckCircle2, 
} from 'lucide-react';
import { Provider, ServiceType } from '../types';

interface ProviderProfileViewProps {
  provider: Provider;
  onBack: () => void;
  onOpenBookingModalWith: (service?: ServiceType, provider?: Provider) => void;
  onOpenReviewsModal: (provider: Provider) => void;
}

export const ProviderProfileView: React.FC<ProviderProfileViewProps> = ({
  provider,
  onBack,
  onOpenBookingModalWith,
  onOpenReviewsModal
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'photos' | 'reviews'>('about');
  const [selectedService, setSelectedService] = useState<ServiceType>(
    provider.servicesOffered[0]?.serviceType || 'pet_sitting'
  );

  const currentServiceObj = provider.servicesOffered.find((s) => s.serviceType === selectedService) || provider.servicesOffered[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Discovery</span>
      </button>

      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Cover Graphic */}
        <div className="h-36 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-600 relative">
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Provider</span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 sm:p-8 -mt-16 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            
            <div className="flex items-end space-x-4">
              <img
                src={provider.avatarUrl}
                alt={provider.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-md bg-white shrink-0"
              />
              <div className="space-y-1 pb-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">{provider.name}</h1>
                  {provider.verifiedSingPass && (
                    <ShieldCheck className="w-5 h-5 text-emerald-600" title="SingPass Verified" />
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  📍 {provider.district} • Serving: {provider.serviceAreas.join(', ')}
                </p>

                {/* Clickable Rating trigger for Requirement #8 */}
                <button
                  onClick={() => onOpenReviewsModal(provider)}
                  className="flex items-center space-x-3 text-xs pt-1 hover:underline text-left"
                >
                  <div className="flex items-center font-bold text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 mr-1" />
                    <span>{provider.rating}</span>
                    <span className="text-slate-400 font-normal ml-1">({provider.reviewCount} reviews - Click to view)</span>
                  </div>
                  <span>•</span>
                  <span className="font-bold text-slate-700">{provider.completedBookingsCount} SG Bookings</span>
                </button>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="w-full sm:w-auto text-right">
              <button
                onClick={() => onOpenBookingModalWith(selectedService, provider)}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md transition-all text-sm"
              >
                Book Service with {provider.name.split(' ')[0]}
              </button>
            </div>
          </div>

          {/* Verification Badges Bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
            {provider.verificationBadges.map((badge, idx) => (
              <span key={idx} className="bg-amber-50 text-amber-900 border border-amber-200 font-semibold px-2.5 py-1 rounded-lg flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                <span>{badge}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Details & Tabs */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tab Buttons */}
          <div className="flex border-b border-slate-200 text-xs sm:text-sm font-bold space-x-6">
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-3 transition-all border-b-2 ${
                activeTab === 'about' ? 'border-amber-500 text-amber-800' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              About & Experience
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`pb-3 transition-all border-b-2 ${
                activeTab === 'services' ? 'border-amber-500 text-amber-800' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Services & Rates ({provider.servicesOffered.length})
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`pb-3 transition-all border-b-2 ${
                activeTab === 'photos' ? 'border-amber-500 text-amber-800' : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Pet Photos ({provider.photos.length})
            </button>
            <button
              onClick={() => onOpenReviewsModal(provider)}
              className="pb-3 border-b-2 border-transparent text-amber-600 hover:text-amber-800 flex items-center space-x-1"
            >
              <span>Verified Reviews ({provider.reviews.length}) →</span>
            </button>
          </div>

          {/* Tab 1: About */}
          {activeTab === 'about' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base mb-2">About {provider.name}</h3>
                <p className="whitespace-pre-line">{provider.bio}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Pet Experience</p>
                  <p className="font-extrabold text-slate-900 text-sm mt-0.5">{provider.experienceYears} Years</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Response Time</p>
                  <p className="font-extrabold text-emerald-700 text-sm mt-0.5">&lt; {provider.responseTimeMin} mins</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Cancellation Policy</p>
                  <p className="font-extrabold text-slate-900 text-sm mt-0.5">{provider.cancellationPolicy}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Accepted Pet Types</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {provider.acceptedPetTypes.map((type) => (
                    <span key={type} className="bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-lg">
                      🐾 {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Services & Pricing */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              {provider.servicesOffered.map((srv, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 hover:border-amber-400 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{srv.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{srv.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-black text-amber-600">SGD ${srv.priceSGD}</p>
                      <p className="text-[10px] text-slate-400">{srv.unit}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Includes live photo update & GPS tracking</span>
                    <button
                      onClick={() => onOpenBookingModalWith(srv.serviceType, provider)}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-1.5 rounded-lg transition-colors"
                    >
                      Book This Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Photo Gallery */}
          {activeTab === 'photos' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {provider.photos.map((photo, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden border border-slate-200 h-44 group">
                  <img
                    src={photo}
                    alt={`Pet photo ${idx}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Sticky Booking Card & Price Calculator */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5 sticky top-24 shadow-sm">
            <div className="border-b border-slate-100 pb-3">
              <p className="text-xs text-slate-400 uppercase font-bold">Selected Service</p>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value as ServiceType)}
                className="w-full mt-1 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 bg-white"
              >
                {provider.servicesOffered.map((srv) => (
                  <option key={srv.serviceType} value={srv.serviceType}>
                    {srv.title} (SGD ${srv.priceSGD})
                  </option>
                ))}
              </select>
            </div>

            {/* Price Preview */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Base Rate ({currentServiceObj?.unit})</span>
                <span className="font-bold text-slate-900">SGD ${currentServiceObj?.priceSGD}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Service Fee</span>
                <span className="font-bold text-slate-900">SGD $3.00</span>
              </div>
              <div className="flex justify-between">
                <span>Care Guarantee Insurance</span>
                <span className="font-bold text-emerald-700">INCLUDED</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-black text-slate-900">
                <span>Total Estimated:</span>
                <span className="text-amber-600">SGD ${(currentServiceObj?.priceSGD + 3).toFixed(2)}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onOpenBookingModalWith(selectedService, provider)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold py-3 rounded-xl shadow-md transition-all text-sm"
            >
              Continue to Instant Booking
            </button>

            <div className="text-[11px] text-slate-400 text-center space-y-1">
              <p>🛡️ Covered by SGD $1,000,000 PawCare Protection</p>
              <p>Free cancellation up to 24 hours before service</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
