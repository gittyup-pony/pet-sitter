import React from 'react';
import { Dog, ShieldCheck, PhoneCall, Heart, ExternalLink, MapPin } from 'lucide-react';
import { AppView } from '../types';

interface FooterProps {
  setCurrentView: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-slate-800 text-center sm:text-left">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">SingPass Verified</p>
              <p className="text-[11px] text-slate-400">100% ID & Police Background Checked</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">$1,000,000 Guarantee</p>
              <p className="text-[11px] text-slate-400">PawCare Protection per Booking</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">24/7 SG Support</p>
              <p className="text-[11px] text-slate-400">Emergency Vet Hotline +65 6789 1234</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/50 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">All SG Districts</p>
              <p className="text-[11px] text-slate-400">Central, East, West, North, North-East</p>
            </div>
          </div>
        </div>

        {/* Footer Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                <Dog className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">PawConnect <span className="text-amber-500 text-xs">SG</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Singapore's trusted one-stop marketplace connecting busy pet owners with verified local sitters, dog walkers, and pet transport.
            </p>
            <div className="pt-2 flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold text-slate-500">Accepted SG Payments:</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-bold text-red-400 border border-slate-700">PayNow SG</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-bold text-emerald-400 border border-slate-700">GrabPay</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-bold text-blue-400 border border-slate-700">Cards</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Pet Services SG</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setCurrentView('search')} className="hover:text-white transition-colors">
                  In-Home Pet Sitting Singapore
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('search')} className="hover:text-white transition-colors">
                  Point-to-Point Pet Taxi & Transport
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('search')} className="hover:text-white transition-colors">
                  Private Dog Walking (Bishan, Katong, Jurong)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('search')} className="hover:text-white transition-colors">
                  Home Pet Boarding & Day Care
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('search')} className="hover:text-white transition-colors">
                  Vet Visit Chaperone Service
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Trust & Verification</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setCurrentView('trust_safety')} className="hover:text-white transition-colors">
                  SingPass ID Verification Process
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('trust_safety')} className="hover:text-white transition-colors">
                  SGD $1,000,000 Care Guarantee Terms
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('trust_safety')} className="hover:text-white transition-colors">
                  NParks / AVS Code of Animal Welfare
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('trust_safety')} className="hover:text-white transition-colors">
                  Emergency Vet Network (Mount Pleasant / United Vet)
                </button>
              </li>
            </ul>
          </div>

          {/* Service Providers */}
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Become a Partner</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setCurrentView('provider_dashboard')} className="hover:text-white transition-colors">
                  Apply as Verified Pet Sitter
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('provider_dashboard')} className="hover:text-white transition-colors">
                  Apply as Licensed Pet Taxi Driver
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admin_dashboard')} className="hover:text-white transition-colors">
                  Partner Vet Clinic & Grooming Listing
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('customer_dashboard')} className="hover:text-white transition-colors">
                  PawPoints Loyalty Program
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-3 sm:space-y-0">
          <p>© 2026 PawConnect SG Pte. Ltd. (UEN: 202688888K). All rights reserved.</p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy (PDPA)</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Disclaimers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
