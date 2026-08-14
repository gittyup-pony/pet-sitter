import React from 'react';
import { 
  ShieldCheck, 
  Heart, 
  PhoneCall, 
  CheckCircle2, 
  Lock, 
  Award, 
  FileText, 
  ArrowLeft 
} from 'lucide-react';
import { AppView } from '../types';

interface TrustSafetyViewProps {
  setCurrentView: (view: AppView) => void;
  onOpenBookingModal: () => void;
}

export const TrustSafetyView: React.FC<TrustSafetyViewProps> = ({
  setCurrentView,
  onOpenBookingModal
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Singapore Trust & Safety Framework</span>
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Your Pet's Safety is Our Absolute Top Priority
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          We built PawConnect SG around strict Singapore identity verification, mandatory background checks, real-time GPS tracking, and an SGD $1,000,000 Care Insurance Guarantee.
        </p>
      </div>


      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pillar 1 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900">1. Verified Providers</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every sitter and transport driver must authenticate using SingPass. We perform criminal background checks and require animal care references before any provider can receive booking requests.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900">2. SGD $1,000,000 PawCare Guarantee</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every booking made through PawConnect SG includes automatic SGD $1,000,000 emergency medical coverage and third-party liability insurance protecting your pets and home.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
            <PhoneCall className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900">3. 24/7 Singapore Emergency Vet Support</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our hotline (<strong className="text-slate-900">+65 6789 1234</strong>) is active 24 hours a day, 7 days a week. We maintain direct partnerships with 24h emergency veterinary hospitals across Singapore.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900">4. Secure PayNow SG Escrow</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your payment is held safely in escrow and is only released to the service provider after you confirm the service has been completed satisfactorily.
          </p>
        </div>

      </div>


      {/* Emergency Vet Callout Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-amber-400 font-extrabold text-xs uppercase tracking-wider">Need Immediate Support?</p>
          <h3 className="text-xl font-black">24/7 Singapore Emergency Vet Hotline</h3>
          <p className="text-xs text-slate-300">Call +65 6789 1234 for immediate assistance during active bookings.</p>
        </div>

        <a
          href="tel:+6567891234"
          className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs shrink-0 shadow-md transition-colors"
        >
          Call +65 6789 1234 Now
        </a>
      </div>
    </div>
  );
};
