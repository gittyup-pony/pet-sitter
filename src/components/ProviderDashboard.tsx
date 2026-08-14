import React, { useState } from 'react';
import { 
  Briefcase, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Star, 
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Car
} from 'lucide-react';
import { Booking, Provider } from '../types';

interface ProviderDashboardProps {
  provider: Provider;
  bookings: Booking[];
  onUpdateBookingStatus: (bookingId: string, status: any) => void;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({
  provider,
  bookings,
  onUpdateBookingStatus
}) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const providerBookings = bookings.filter((b) => b.providerId === provider.id || b.providerName === provider.name);
  const totalEarningsSGD = providerBookings
    .filter((b) => b.status === 'completed' || b.status === 'in_progress' || b.status === 'confirmed')
    .reduce((acc, b) => acc + (b.priceBreakdown.basePriceSGD * 0.85), 0); // 85% payout after 15% platform commission

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Profile Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={provider.avatarUrl}
            alt={provider.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-200 shrink-0"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-slate-900">{provider.name}</h1>
              <span className="bg-amber-500 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                Provider Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              📍 {provider.district} • SingPass Verified
            </p>
          </div>
        </div>

        {/* Status Toggle & PayNow Payout Pill */}
        <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700">Accepting Jobs:</span>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                isAvailable ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-700'
              }`}
            >
              {isAvailable ? 'ONLINE' : 'PAUSED'}
            </button>
          </div>

          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Next PayNow Payout</p>
            <p className="text-lg font-black text-emerald-700">SGD ${totalEarningsSGD.toFixed(2)}</p>
          </div>
        </div>
      </div>


      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-slate-400 font-bold uppercase text-[10px]">Total SGD Earnings</p>
          <p className="text-xl font-black text-slate-900">SGD ${totalEarningsSGD.toFixed(2)}</p>
          <p className="text-emerald-600 font-bold text-[10px]">Net 85% payout rate</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-slate-400 font-bold uppercase text-[10px]">Completed Jobs</p>
          <p className="text-xl font-black text-slate-900">{provider.completedBookingsCount}</p>
          <p className="text-slate-500 text-[10px]">In Singapore</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-slate-400 font-bold uppercase text-[10px]">Rating Score</p>
          <p className="text-xl font-black text-amber-500">★ {provider.rating}</p>
          <p className="text-slate-500 text-[10px]">From {provider.reviewCount} customer reviews</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-slate-400 font-bold uppercase text-[10px]">Response Time SLA</p>
          <p className="text-xl font-black text-emerald-700">&lt; {provider.responseTimeMin} mins</p>
          <p className="text-emerald-600 font-bold text-[10px]">100% SLA Score</p>
        </div>
      </div>


      {/* Assigned Jobs List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Assigned Customer Jobs</h3>
        
        {providerBookings.length === 0 ? (
          <p className="text-xs text-slate-500">No active job requests right now.</p>
        ) : (
          <div className="space-y-3 text-xs">
            {providerBookings.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[10px]">
                      {b.serviceType.toUpperCase()}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{b.petName} ({b.petSpecies})</h4>
                    <p className="text-slate-500">{b.date} • {b.timeSlot}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-amber-700 text-sm">Payout: SGD ${(b.priceBreakdown.basePriceSGD * 0.85).toFixed(2)}</p>
                    <p className="text-[10px] text-slate-400">Status: {b.status}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[11px]">
                  <span className="text-slate-600">Instructions: "{b.specialInstructions || 'None'}"</span>
                  <div className="flex space-x-2">
                    {b.status === 'confirmed' && (
                      <button
                        onClick={() => onUpdateBookingStatus(b.id, 'in_progress')}
                        className="bg-emerald-600 text-white font-bold px-3 py-1 rounded-lg"
                      >
                        Start Service & GPS Walk
                      </button>
                    )}
                    {b.status === 'in_progress' && (
                      <button
                        onClick={() => onUpdateBookingStatus(b.id, 'completed')}
                        className="bg-slate-900 text-white font-bold px-3 py-1 rounded-lg"
                      >
                        Complete Job
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
