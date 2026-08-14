import React, { useState } from 'react';
import { 
  Dog, 
  Calendar, 
  Sparkles, 
  Heart, 
  CreditCard, 
  Plus, 
  ChevronRight, 
  ShieldCheck, 
  MessageSquare,
  Edit2,
  Trash2,
  Gift
} from 'lucide-react';
import { UserProfile, Booking, PetProfile, AppView } from '../types';
import { PetProfileModal } from './PetProfileModal';

interface CustomerDashboardProps {
  user: UserProfile;
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
  onOpenBookingModal: () => void;
  onSavePet: (pet: PetProfile) => void;
  setCurrentView: (view: AppView) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  user,
  bookings,
  onSelectBooking,
  onOpenBookingModal,
  onSavePet,
  setCurrentView
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'pets' | 'loyalty' | 'messages'>('bookings');
  const [showPetModal, setShowPetModal] = useState<boolean>(false);
  const [editingPet, setEditingPet] = useState<PetProfile | null>(null);

  const activeBookings = bookings.filter((b) => b.status === 'in_progress' || b.status === 'confirmed');
  const pastBookings = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-slate-900">{user.name}</h1>
            <span className="bg-amber-100 text-amber-900 font-bold text-xs px-2.5 py-0.5 rounded-full">
              Singapore Pet Parent
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            📍 {user.address}
          </p>
        </div>

        {/* PawPoints Card */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-4 shadow-sm space-y-1 w-full sm:w-auto text-center sm:text-right">
          <p className="text-[10px] uppercase font-extrabold tracking-wider text-amber-100">PawPoints Balance</p>
          <p className="text-2xl font-black">{user.loyaltyPoints} Points</p>
          <p className="text-xs text-amber-100 font-medium">= SGD ${(user.loyaltyPoints / 10).toFixed(0)} OFF Next Booking</p>
        </div>
      </div>


      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 text-xs sm:text-sm font-bold space-x-6">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 transition-all border-b-2 ${
            activeTab === 'bookings' ? 'border-amber-500 text-amber-800' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          My Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('pets')}
          className={`pb-3 transition-all border-b-2 ${
            activeTab === 'pets' ? 'border-amber-500 text-amber-800' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          My Pet Profiles ({user.petProfiles.length})
        </button>
        <button
          onClick={() => setActiveTab('loyalty')}
          className={`pb-3 transition-all border-b-2 ${
            activeTab === 'loyalty' ? 'border-amber-500 text-amber-800' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          PawPoints & Rewards
        </button>
      </div>


      {/* TAB 1: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          {/* Active / Upcoming */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-900 text-base">Active & Upcoming Services</h3>
            {activeBookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-2">
                <p className="text-slate-700 font-bold text-sm">No active or upcoming bookings</p>
                <button
                  onClick={onOpenBookingModal}
                  className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Book a Pet Service Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeBookings.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => onSelectBooking(b)}
                    className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 hover:border-amber-400 transition-all cursor-pointer shadow-xs"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          b.status === 'in_progress' ? 'bg-emerald-100 text-emerald-800 animate-pulse' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {b.status === 'in_progress' ? '● LIVE IN PROGRESS' : 'CONFIRMED'}
                        </span>
                        <h4 className="font-black text-slate-900 text-base mt-1">{b.providerName}</h4>
                        <p className="text-xs text-slate-500">{b.date} • {b.timeSlot}</p>
                      </div>
                      <span className="font-black text-amber-700 text-sm">SGD ${b.priceBreakdown.totalSGD.toFixed(2)}</span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium">
                      🐾 Caring for <strong>{b.petName}</strong> ({b.petSpecies})
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-amber-600 font-bold">
                      <span>Click to view live GPS tracking & messages</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Bookings */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base">Past Booking History</h3>
            <div className="space-y-3">
              {pastBookings.map((b) => (
                <div key={b.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{b.providerName} • {b.petName}</p>
                    <p className="text-slate-400">{b.date} • Status: {b.status}</p>
                  </div>
                  <span className="font-bold text-slate-900">SGD ${b.priceBreakdown.totalSGD.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* TAB 2: PET PROFILES */}
      {activeTab === 'pets' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-slate-900 text-base">Registered Pets</h3>
            <button
              onClick={() => {
                setEditingPet(null);
                setShowPetModal(true);
              }}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Pet</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.petProfiles.map((pet) => (
              <div key={pet.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
                <div className="flex items-center space-x-4">
                  <img
                    src={pet.avatarUrl}
                    alt={pet.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-200 shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-black text-slate-900 text-base">{pet.name}</h4>
                        <p className="text-xs text-slate-500">{pet.breed} ({pet.species}) • {pet.ageYears} y/o • {pet.weightKg} kg</p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingPet(pet);
                          setShowPetModal(true);
                        }}
                        className="p-1 text-slate-400 hover:text-amber-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1">
                  <p><strong>Feeding:</strong> {pet.feedingInstructions}</p>
                  <p><strong>Vet:</strong> {pet.preferredVetClinic} ({pet.emergencyContactPhone})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* TAB 3: LOYALTY */}
      {activeTab === 'loyalty' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">PawPoints Rewards Program</h3>
            <p className="text-xs text-slate-500">
              Earn 10 PawPoints for every SGD $1 spent on PawConnect SG marketplace bookings!
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 space-y-3 text-xs">
            <p className="font-bold text-sm">Your Loyalty Summary:</p>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white p-3 rounded-xl border border-amber-200">
                <p className="text-slate-500 text-[10px] font-bold uppercase">Total Points</p>
                <p className="text-xl font-black text-amber-700">{user.loyaltyPoints} Pts</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-amber-200">
                <p className="text-slate-500 text-[10px] font-bold uppercase">Discount Value</p>
                <p className="text-xl font-black text-emerald-700">SGD ${(user.loyaltyPoints / 10).toFixed(0)} OFF</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pet Profile Modal */}
      <PetProfileModal
        isOpen={showPetModal}
        onClose={() => setShowPetModal(false)}
        onSavePet={onSavePet}
        editingPet={editingPet}
      />
    </div>
  );
};
