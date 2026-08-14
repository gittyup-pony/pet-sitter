import React from 'react';
import { 
  ShieldCheck, 
  Dog, 
  Search, 
  Calendar, 
  User, 
  Briefcase, 
  Sliders, 
  MapPin, 
  Heart,
  ChevronDown,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { AppView, UserRole, Booking } from '../types';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeBooking?: Booking;
  onOpenBookingModal: () => void;
  loyaltyPoints: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  userRole,
  setUserRole,
  activeBooking,
  onOpenBookingModal,
  loyaltyPoints
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      {/* Top Banner - Singapore Context & Emergency Hotline */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-amber-900 text-amber-100 px-4 py-1.5 text-xs font-medium flex justify-between items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-amber-800 text-amber-200 text-[10px] font-bold uppercase tracking-wider">
              SG
            </span>
            <span className="hidden sm:inline">🇸🇬 Singapore's #1 Verified Pet Care Marketplace</span>
            <span className="sm:hidden text-[11px]">🇸🇬 Verified Pet Care SG</span>
            <span className="hidden md:inline text-amber-300/80">• SGD $1,000,000 PawCare Guarantee Included</span>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="tel:+6567891234" 
              className="flex items-center text-amber-200 hover:text-white transition-colors"
              title="24/7 SG Emergency Support"
            >
              <PhoneCall className="w-3 h-3 mr-1 text-emerald-400 animate-pulse" />
              <span>24/7 Vet Support: <strong className="text-white">+65 6789 1234</strong></span>
            </a>

            {/* Loyalty Points Pill */}
            <button 
              onClick={() => setCurrentView('customer_dashboard')}
              className="hidden lg:flex items-center space-x-1.5 bg-amber-800/80 hover:bg-amber-800 px-2.5 py-0.5 rounded-full text-amber-200 text-[11px] transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span><strong>{loyaltyPoints}</strong> PawPoints (SGD ${(loyaltyPoints / 10).toFixed(0)} OFF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('home')} 
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Dog className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">PawConnect</span>
              <span className="bg-amber-500 text-white font-bold text-[10px] px-1.5 py-0.5 rounded uppercase">SG</span>
            </div>
            <p className="text-[10px] text-slate-500 -mt-1 font-medium">Singapore Pet Marketplace</p>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button
            onClick={() => setCurrentView('home')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'home' 
                ? 'bg-amber-50 text-amber-800 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Explore
          </button>

          <button
            onClick={() => setCurrentView('search')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'search' 
                ? 'bg-amber-50 text-amber-800 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Find Providers
          </button>

          <button
            onClick={() => setCurrentView('trust_safety')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
              currentView === 'trust_safety' 
                ? 'bg-amber-50 text-amber-800 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Trust & Safety</span>
          </button>

          {/* Active Booking Banner Pulse if in progress */}
          {activeBooking && (
            <button
              onClick={() => setCurrentView('active_booking')}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center space-x-1.5 animate-pulse hover:bg-emerald-200 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Live Walk/Service Active</span>
            </button>
          )}
        </nav>

        {/* Right Actions & Role Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Role Switcher Pill */}
          <div className="relative group">
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs border border-slate-200">
              <button
                onClick={() => {
                  setUserRole('customer');
                  setCurrentView('customer_dashboard');
                }}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  userRole === 'customer' 
                    ? 'bg-white text-slate-900 shadow-xs font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => {
                  setUserRole('provider');
                  setCurrentView('provider_dashboard');
                }}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  userRole === 'provider' 
                    ? 'bg-amber-500 text-white shadow-xs font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Provider
              </button>
              <button
                onClick={() => {
                  setUserRole('admin');
                  setCurrentView('admin_dashboard');
                }}
                className={`hidden sm:inline-block px-2 py-1 rounded-md transition-all font-medium ${
                  userRole === 'admin' 
                    ? 'bg-slate-900 text-white shadow-xs font-semibold' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* User Dashboard Direct Button */}
          <button
            onClick={() => {
              if (userRole === 'customer') setCurrentView('customer_dashboard');
              else if (userRole === 'provider') setCurrentView('provider_dashboard');
              else setCurrentView('admin_dashboard');
            }}
            className="p-2 rounded-xl text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors relative"
            title="Dashboard & Profiles"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenBookingModal}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all transform active:scale-95 flex items-center space-x-1.5"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Find Pet Service</span>
            <span className="sm:hidden">Find</span>
          </button>
        </div>
      </div>
    </header>
  );
};
