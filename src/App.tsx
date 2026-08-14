import React, { useState, useEffect } from 'react';
import { 
  AppView, 
  UserRole, 
  Provider, 
  Booking, 
  PetProfile, 
  ServiceType, 
  UserProfile,
  SingaporeDistrict,
  PetSpecies
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

// New Modals for Requirements
import { AuthModal, UserAccount } from './components/AuthModal';
import { SubscriptionsModal } from './components/SubscriptionsModal';
import { ReviewsModal } from './components/ReviewsModal';

export default function App() {
  // Navigation State
  const [currentView, setCurrentViewInternal] = useState<AppView>('home');
  const [userRole, setUserRole] = useState<UserRole>('customer');

  // Requirement #6: Browser Back Button & History Navigation Fix
  const navigateTo = (view: AppView) => {
    setCurrentViewInternal(view);
    if (window.location.hash !== `#${view}`) {
      window.history.pushState({ view }, '', `#${view}`);
    }
  };

  useEffect(() => {
    // Sync document title
    document.title = 'Paw Connect Singapore';

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentViewInternal(event.state.view);
      } else {
        const hash = window.location.hash.replace('#', '') as AppView;
        if (hash) {
          setCurrentViewInternal(hash);
        } else {
          setCurrentViewInternal('home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Requirement #10: Account logged out by default on homepage
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Quick Search filters state for Requirement #4
  const [searchFilters, setSearchFilters] = useState<{
    service: string;
    district: string;
    petType: string;
  }>({
    service: 'all',
    district: 'all',
    petType: 'all'
  });

  // Application Data State
  const [providers, setProviders] = useState<Provider[]>(MOCK_PROVIDERS);
  const [selectedProvider, setSelectedProvider] = useState<Provider>(MOCK_PROVIDERS[0]);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // Modals state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [modalService, setModalService] = useState<ServiceType>('pet_sitting');
  const [modalProvider, setModalProvider] = useState<Provider | undefined>(undefined);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const [isSubscriptionsModalOpen, setIsSubscriptionsModalOpen] = useState<boolean>(false);

  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState<boolean>(false);
  const [reviewsProvider, setReviewsProvider] = useState<Provider>(MOCK_PROVIDERS[0]);

  // Tracking Active Booking
  const activeBooking = bookings.find((b) => b.status === 'in_progress' || b.status === 'confirmed') || bookings[0];
  const [trackingBooking, setTrackingBooking] = useState<Booking>(activeBooking);

  // Handlers
  const handleOpenBookingModalWith = (service: ServiceType = 'pet_sitting', provider?: Provider) => {
    setModalService(service);
    setModalProvider(provider || providers[0]);
    setIsBookingModalOpen(true);
  };

  const handleSelectProvider = (prov: Provider) => {
    setSelectedProvider(prov);
    navigateTo('provider_profile');
  };

  const handleQuickSearchSubmit = (
    service: ServiceType, 
    district: SingaporeDistrict, 
    petType: PetSpecies
  ) => {
    setSearchFilters({
      service,
      district,
      petType
    });
    navigateTo('search');
  };

  const handleOpenReviewsModal = (prov: Provider) => {
    setReviewsProvider(prov);
    setIsReviewsModalOpen(true);
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

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    if (user.pets && user.pets.length > 0) {
      setUserProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone,
        district: user.district,
        address: user.address,
        petProfiles: [...user.pets, ...prev.petProfiles]
      }));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-amber-200 selection:text-amber-900">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={navigateTo}
        userRole={userRole}
        setUserRole={setUserRole}
        activeBooking={bookings.find((b) => b.status === 'in_progress')}
        onOpenBookingModal={() => handleOpenBookingModalWith('pet_sitting')}
        loyaltyPoints={userProfile.loyaltyPoints}
        currentUser={currentUser}
        onOpenAuthModal={(mode) => {
          setAuthMode(mode);
          setIsAuthModalOpen(true);
        }}
        onOpenSubscriptionsModal={() => setIsSubscriptionsModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Dynamic View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            setCurrentView={navigateTo}
            providers={providers}
            onSelectProvider={handleSelectProvider}
            onOpenBookingModalWith={handleOpenBookingModalWith}
            onQuickSearchSubmit={handleQuickSearchSubmit}
            onOpenSubscriptionsModal={() => setIsSubscriptionsModalOpen(true)}
          />
        )}

        {currentView === 'search' && (
          <SearchView
            providers={providers}
            onSelectProvider={handleSelectProvider}
            onOpenBookingModalWith={handleOpenBookingModalWith}
            onOpenReviewsModal={handleOpenReviewsModal}
            initialService={searchFilters.service}
            initialDistrict={searchFilters.district}
            initialPetType={searchFilters.petType}
          />
        )}

        {currentView === 'provider_profile' && (
          <ProviderProfileView
            provider={selectedProvider}
            onBack={() => navigateTo('search')}
            onOpenBookingModalWith={handleOpenBookingModalWith}
            onOpenReviewsModal={handleOpenReviewsModal}
          />
        )}

        {currentView === 'active_booking' && (
          <ActiveBookingView
            booking={trackingBooking}
            onUpdateBooking={handleUpdateBooking}
            onBack={() => navigateTo('customer_dashboard')}
          />
        )}

        {currentView === 'customer_dashboard' && (
          <CustomerDashboard
            user={userProfile}
            bookings={bookings}
            onSelectBooking={(b) => {
              setTrackingBooking(b);
              navigateTo('active_booking');
            }}
            onOpenBookingModal={() => handleOpenBookingModalWith('pet_sitting')}
            onSavePet={handleSavePet}
            setCurrentView={navigateTo}
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
            setCurrentView={navigateTo}
            onOpenBookingModal={() => handleOpenBookingModalWith('pet_sitting')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentView={navigateTo} />

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

      {/* Auth Modal (Log In / Sign Up with Pet Details) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Subscriptions Modal (Monthly & Annual Care+ Membership) */}
      <SubscriptionsModal
        isOpen={isSubscriptionsModalOpen}
        onClose={() => setIsSubscriptionsModalOpen(false)}
      />

      {/* Reviews Popup Modal */}
      <ReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        provider={reviewsProvider}
      />
    </div>
  );
}
