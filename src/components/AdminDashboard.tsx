import React, { useState } from 'react';
import { 
  Sliders, 
  ShieldCheck, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  TrendingUp,
  Award,
  Settings,
  Layers
} from 'lucide-react';
import { Provider, Booking } from '../types';

interface AdminDashboardProps {
  providers: Provider[];
  bookings: Booking[];
  onApproveProvider: (providerId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  providers,
  bookings,
  onApproveProvider
}) => {
  const [commissionRate, setCommissionRate] = useState<number>(15); // 15%

  const totalGrossSGD = bookings.reduce((acc, b) => acc + b.priceBreakdown.totalSGD, 0);
  const platformRevenueSGD = totalGrossSGD * (commissionRate / 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full">
              ADMIN PORTAL
            </span>
            <span className="text-xs text-slate-400">Singapore Marketplace Operator</span>
          </div>
          <h1 className="text-2xl font-black mt-1">PawConnect SG Platform Admin</h1>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Platform Revenue (15% Cut)</p>
          <p className="text-2xl font-black text-amber-400">SGD ${platformRevenueSGD.toFixed(2)}</p>
        </div>
      </div>


      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-slate-400 font-bold uppercase text-[10px]">Gross Booking Volume</p>
          <p className="text-xl font-black text-slate-900">SGD ${totalGrossSGD.toFixed(2)}</p>
          <p className="text-emerald-600 font-bold text-[10px]">100% PayNow SG Settled</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-slate-400 font-bold uppercase text-[10px]">Active Verified Providers</p>
          <p className="text-xl font-black text-slate-900">{providers.length}</p>
          <p className="text-slate-500 text-[10px]">SingPass Checked</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-slate-400 font-bold uppercase text-[10px]">Total SG Bookings</p>
          <p className="text-xl font-black text-slate-900">{bookings.length}</p>
          <p className="text-slate-500 text-[10px]">Active & Historical</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-slate-400 font-bold uppercase text-[10px]">Platform Fee Rate</p>
          <p className="text-xl font-black text-amber-600">{commissionRate}%</p>
          <p className="text-slate-500 text-[10px]">Commission on Provider Earnings</p>
        </div>
      </div>


      {/* Verification Queue & Commission Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Verification Queue */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">SingPass Provider Verification Queue</h3>
          
          <div className="space-y-3 text-xs">
            {providers.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img src={p.avatarUrl} alt={p.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-slate-900">{p.name}</p>
                    <p className="text-slate-500">{p.district} • SingPass Status: Verified</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg text-[10px]">
                    VERIFIED & APPROVED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Settings */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 text-xs">
          <h3 className="font-extrabold text-slate-900 text-base">Platform Controls</h3>

          <div className="space-y-2">
            <label className="font-bold text-slate-800 block">Commission Rate (%)</label>
            <input
              type="range"
              min="10"
              max="25"
              value={commissionRate}
              onChange={(e) => setCommissionRate(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <p className="text-slate-500 text-[11px]">Current Cut: <strong>{commissionRate}%</strong></p>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <p className="font-bold text-slate-900">Partner Integrations Status:</p>
            <div className="space-y-1.5 text-[11px] text-slate-700">
              <p className="flex justify-between"><span>MSIG Pet Insurance API:</span> <strong className="text-emerald-600">CONNECTED</strong></p>
              <p className="flex justify-between"><span>PayNow SG Gateway:</span> <strong className="text-emerald-600">ONLINE</strong></p>
              <p className="flex justify-between"><span>Mount Pleasant Vet Hotline:</span> <strong className="text-emerald-600">ACTIVE</strong></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
