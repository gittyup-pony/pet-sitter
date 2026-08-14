import React, { useState } from 'react';
import { 
  AppView, 
  UserRole, 
  Provider, 
  Booking, 
  PetProfile, 
  ServiceType, 
  UserProfile 
} from './types';
import { 
  MOCK_PROVIDERS, 
  INITIAL_BOOKINGS, 
  INITIAL_USER 
} from './data/mockData';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { SearchView } from './components/SearchView';
import { ProviderProfileView } from './components/ProviderProfileView';
import { BookingModal } from './components/BookingModal';
import { ActiveBookingView } from './components/ActiveBookingView';
import { CustomerDashboard } from './components/CustomerDashboard';
import { ProviderDashboard } from './components/ProviderDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { TrustSafetyView } from './components/TrustSafetyView';

export default function App() {
  // Navigation & Role State
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [userRole, setUserRole] = useState<UserRole>('customer');

  // Application Data State
  const [providers, setProviders] = useState<Provider[]>(MOCK_PROVIDERS);
  const [selectedProvider, setSelectedProvider] = useState<Provider>(MOCK_PROVIDERS[0]);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // Active booking for real-time tracking view
  const activeBooking = bookings.find((b) => b.status === 'in_progress' || b.status === 'confirmed') || bookings[0];
  const [trackingBooking, setTrackingBooking] = useState<Booking>(activeBooking);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [modalService, setModalService] = useState<ServiceType>('pet_sitting');
  const [modalProvider, setModalProvider] = useState<Provider | undefined>(undefined);

  // Handlers
  const handleOpenBookingModalWith = (service: ServiceType = 'pet_sitting', provider?: Provider) => {
    setModalService(service);
    setModalProvider(provider || providers[0]);
    setIsBookingModalOpen(true);
  };

  const handleSelectProvider = (prov: Provider) => {
    setSelectedProvider(prov);
    setCurrentView('provider_profile');
  };

  const handleCompleteBooking = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
    setTrackingBooking(newBooking);
    setUserProfile({
      ...userProfile,
      loyaltyPoints: userProfile.loyaltyPoints + Math.floor(newBooking.priceBreakdown.totalSGD * 10)
    });
  };

  const handleSavePet = (newPet: PetProfile) => {
    const existingIndex = userProfile.petProfiles.findIndex((p) => p.id === newPet.id);
    let updatedPets: PetProfile[];
    if (existingIndex >= 0) {
      updatedPets = [...userProfile.petProfiles];
      updatedPets[existingIndex] = newPet;
    } else {
      updatedPets = [...userProfile.petProfiles, newPet];
    }
    setUserProfile({
      ...userProfile,
      petProfiles: updatedPets
    });
  };

  const handleUpdateBooking = (updatedBooking: Booking) => {
    setBookings(bookings.map((b) => (b.id === updatedBooking.id ? updatedBooking : b)));
    setTrackingBooking(updatedBooking);
  };

  const handleUpdateBookingStatus = (bookingId: string, status: any) => {
    setBookings(bookings.map((b) => (b.id === bookingId ? { ...b, status } : b)));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-amber-200 selection:text-amber-900">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        userRole={userRole}
        setUserRole={setUserRole}
        activeBooking={bookings.find((b) => b.status === 'in_progress')}
        onOpenBookingModal={() => handleOpenBookingModalWith('pet_sitting')}
        loyaltyPoints={userProfile.loyaltyPoints}
      />

      {/* Main Dynamic View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            setCurrentView={setCurrentView}
            providers={providers}
            onSelectProvider={handleSelectProvider}
            onOpenBookingModalWith={handleOpenBookingModalWith}
          />
        )}

        {currentView === 'search' && (
          <SearchView
            providers={providers}
            onSelectProvider={handleSelectProvider}
            onOpenBookingModalWith={handleOpenBookingModalWith}
          />
        )}

        {currentView === 'provider_profile' && (
          <ProviderProfileView
            provider={selectedProvider}
            onBack={() => setCurrentView('search')}
            onOpenBookingModalWith={handleOpenBookingModalWith}
          />
        )}

        {currentView === 'active_booking' && (
          <ActiveBookingView
            booking={trackingBooking}
            onUpdateBooking={handleUpdateBooking}
            onBack={() => setCurrentView('customer_dashboard')}
          />
        )}

        {currentView === 'customer_dashboard' && (
          <CustomerDashboard
            user={userProfile}
            bookings={bookings}
            onSelectBooking={(b) => {
              setTrackingBooking(b);
              setCurrentView('active_booking');
            }}
            onOpenBookingModal={() => handleOpenBookingModalWith('pet_sitting')}
            onSavePet={handleSavePet}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'provider_dashboard' && (
          <ProviderDashboard
            provider={providers[0]}
            bookings={bookings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
          />
        )}

        {currentView === 'admin_dashboard' && (
          <AdminDashboard
            providers={providers}
            bookings={bookings}
            onApproveProvider={() => {}}
          />
        )}

        {currentView === 'trust_safety' && (
          <TrustSafetyView
            setCurrentView={setCurrentView}
            onOpenBookingModal={() => handleOpenBookingModalWith('pet_sitting')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* Multi-Step Booking Wizard Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService={modalService}
        initialProvider={modalProvider}
        providers={providers}
        pets={userProfile.petProfiles}
        onCompleteBooking={handleCompleteBooking}
        userLoyaltyPoints={userProfile.loyaltyPoints}
      />
    </div>
  );
}
