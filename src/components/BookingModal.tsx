import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Dog, 
  Cat, 
  Car, 
  Home, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Calendar, 
  Clock, 
  MapPin, 
  Info,
  Sparkles
} from 'lucide-react';
import { ServiceType, Provider, PetProfile, Booking, PriceBreakdown, SingaporeDistrict } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceType;
  initialProvider?: Provider;
  providers: Provider[];
  pets: PetProfile[];
  onCompleteBooking: (newBooking: Booking) => void;
  userLoyaltyPoints: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = 'pet_sitting',
  initialProvider,
  providers,
  pets,
  onCompleteBooking,
  userLoyaltyPoints
}) => {
  if (!isOpen) return null;

  // Step state (1 to 8, plus 9 for confirmation)
  const [step, setStep] = useState<number>(1);

  // Form selections
  const [selectedService, setSelectedService] = useState<ServiceType>(initialService);
  const [selectedPetId, setSelectedPetId] = useState<string>(pets[0]?.id || 'pet-1');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('14:00 - 15:00 SGT');
  const [pickupAddress, setPickupAddress] = useState<string>('Blk 214 Bishan St 23, #08-110, Singapore 570214');
  const [dropoffAddress, setDropoffAddress] = useState<string>('United Veterinary Clinic, Toa Payoh, Singapore');
  
  const [selectedProvider, setSelectedProvider] = useState<Provider>(
    initialProvider || providers[0]
  );

  useEffect(() => {
    if (isOpen) {
      if (initialService) setSelectedService(initialService);
      if (initialProvider) setSelectedProvider(initialProvider);
    }
  }, [isOpen, initialService, initialProvider]);

  const [specialInstructions, setSpecialInstructions] = useState<string>(
    'Key lockbox by main door code: 8821. Milo needs 1.5 cups kibble after walk.'
  );

  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState<boolean>(false);
  const [addInsuranceAddon, setAddInsuranceAddon] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<'paynow' | 'grabpay' | 'card'>('paynow');

  // Find selected pet
  const currentPet = pets.find((p) => p.id === selectedPetId) || pets[0];

  // Base price calculation
  const currentServiceObj = selectedProvider.servicesOffered.find((s) => s.serviceType === selectedService) || selectedProvider.servicesOffered[0];
  const basePriceSGD = currentServiceObj?.priceSGD || 28;
  const platformFeeSGD = 3.00;
  const insuranceAddonSGD = addInsuranceAddon ? 2.50 : 0.00;
  const discountSGD = useLoyaltyPoints ? 10.00 : 0.00;
  const totalSGD = Math.max(0, basePriceSGD + platformFeeSGD + insuranceAddonSGD - discountSGD);

  const priceBreakdown: PriceBreakdown = {
    basePriceSGD,
    durationOrQuantity: 1,
    subtotalSGD: basePriceSGD,
    platformFeeSGD,
    insuranceAddonSGD,
    peakSurchargeSGD: 0,
    discountSGD,
    totalSGD
  };

  const handleFinishBooking = () => {
    const newBooking: Booking = {
      id: `SG-PAW-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceType: selectedService,
      providerId: selectedProvider.id,
      providerName: selectedProvider.name,
      providerAvatar: selectedProvider.avatarUrl,
      providerDistrict: selectedProvider.district,
      petId: currentPet.id,
      petName: currentPet.name,
      petSpecies: currentPet.species,
      petAvatar: currentPet.avatarUrl,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      pickupAddress: selectedService === 'pet_transport' ? pickupAddress : undefined,
      dropoffAddress: selectedService === 'pet_transport' ? dropoffAddress : undefined,
      status: 'confirmed',
      priceBreakdown,
      specialInstructions,
      createdAt: new Date().toISOString().split('T')[0],
      liveUpdates: [
        {
          id: `up-${Date.now()}`,
          timestamp: 'Just now',
          type: 'status',
          title: 'Booking Confirmed with Sitter',
          description: `${selectedProvider.name} accepted your booking request for ${selectedDate} (${selectedTimeSlot}).`
        }
      ],
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'provider',
          senderName: selectedProvider.name,
          text: `Hi! Thank you for booking. I'm ready to care for ${currentPet.name} on ${selectedDate}!`,
          timestamp: 'Just now'
        }
      ]
    };

    onCompleteBooking(newBooking);
    setStep(9); // Success screen
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base">Booking Wizard</span>
              <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full">
                Step {step} of 8
              </span>
            </div>
            <p className="text-xs text-slate-400">Singapore Pet Marketplace • Instant Confirmation</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
          
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Step 1: Select Pet Service</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'pet_sitting', name: 'In-Home Pet Sitting', desc: 'Sitter visits your home for feeding & care', icon: Home },
                  { id: 'pet_transport', name: 'Pet Transport / Taxi', desc: 'Door-to-door AC transport in Singapore', icon: Car },
                  { id: 'dog_walking', name: 'Private Dog Walking', desc: '1-on-1 walk with GPS route tracking', icon: Dog },
                  { id: 'boarding', name: 'Home Pet Boarding', desc: 'Overnight stay at sitter’s home', icon: Cat },
                  { id: 'vet_visit', name: 'Vet Visit Chaperone', desc: 'Accompanying your pet to the vet', icon: ShieldCheck },
                ].map((item) => {
                  const IconComp = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedService(item.id as ServiceType)}
                      className={`p-4 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                        selectedService === item.id 
                          ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Select Pet */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Step 2: Select Pet Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {pets.map((pet) => (
                  <button
                    key={pet.id}
                    onClick={() => setSelectedPetId(pet.id)}
                    className={`p-3 rounded-2xl border text-center space-y-2 transition-all ${
                      selectedPetId === pet.id 
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={pet.avatarUrl}
                      alt={pet.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-amber-200"
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{pet.name}</p>
                      <p className="text-xs text-slate-500">{pet.breed} ({pet.species})</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Step 3: Select Date & Time Slot</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Service Date</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-medium"
                  >
                    <option value="Today">Today (On-Demand)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Saturday">This Saturday</option>
                    <option value="This Sunday">This Sunday</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Time Slot (Singapore SGT)</label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-medium"
                  >
                    <option value="09:00 - 10:00 SGT">09:00 - 10:00 SGT (Morning)</option>
                    <option value="14:00 - 15:00 SGT">14:00 - 15:00 SGT (Afternoon)</option>
                    <option value="17:00 - 18:00 SGT">17:00 - 18:00 SGT (Evening Walk)</option>
                    <option value="20:00 - 21:00 SGT">20:00 - 21:00 SGT (Night Visit)</option>
                  </select>
                </div>

                {selectedService === 'pet_transport' && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Pickup Address (SG)</label>
                      <input
                        type="text"
                        value={pickupAddress}
                        onChange={(e) => setPickupAddress(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Dropoff Address (SG)</label>
                      <input
                        type="text"
                        value={dropoffAddress}
                        onChange={(e) => setDropoffAddress(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Provider Selection */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Step 4: Select Service Provider</h3>
              <div className="space-y-3">
                {providers.map((prov) => (
                  <button
                    key={prov.id}
                    onClick={() => setSelectedProvider(prov)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedProvider.id === prov.id
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={prov.avatarUrl}
                        alt={prov.name}
                        className="w-12 h-12 rounded-full object-cover border border-amber-200"
                      />
                      <div>
                        <div className="flex items-center space-x-1">
                          <p className="font-bold text-slate-900 text-sm">{prov.name}</p>
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        </div>
                        <p className="text-xs text-slate-500">{prov.district} • ★ {prov.rating} ({prov.reviewCount})</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-amber-700">SGD ${prov.servicesOffered[0]?.priceSGD}</p>
                      <p className="text-[10px] text-slate-400">&lt; {prov.responseTimeMin}m reply</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Price Review */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Step 5: Itemised Price Breakdown</h3>
              
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
                <div className="flex justify-between">
                  <span>Base Fee ({selectedProvider.name})</span>
                  <span className="font-bold text-slate-900">SGD ${basePriceSGD.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Platform Fee (SG Marketplace)</span>
                  <span className="font-bold text-slate-900">SGD ${platformFeeSGD.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1.5">
                    <input
                      type="checkbox"
                      checked={addInsuranceAddon}
                      onChange={(e) => setAddInsuranceAddon(e.target.checked)}
                      className="accent-amber-500 rounded"
                    />
                    <span>PawCare Emergency Medical Insurance</span>
                  </div>
                  <span className="font-bold text-slate-900">SGD ${insuranceAddonSGD.toFixed(2)}</span>
                </div>

                {userLoyaltyPoints >= 100 && (
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-emerald-800">
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="checkbox"
                        checked={useLoyaltyPoints}
                        onChange={(e) => setUseLoyaltyPoints(e.target.checked)}
                        className="accent-emerald-600 rounded"
                      />
                      <span className="font-bold">Redeem 100 PawPoints ($10 OFF)</span>
                    </div>
                    <span className="font-bold">- SGD $10.00</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-300 flex justify-between text-base font-black text-slate-900">
                  <span>Total Payable:</span>
                  <span className="text-amber-600">SGD ${totalSGD.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Special Instructions */}
          {step === 6 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Step 6: Special Instructions for Sitter</h3>
              <div>
                <label className="font-bold text-slate-800 block mb-1">Key Access & Feeding Rules</label>
                <textarea
                  rows={4}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 font-medium text-xs sm:text-sm"
                  placeholder="Provide key box code, leash locations, or special dietary requirements..."
                />
              </div>
            </div>
          )}

          {/* STEP 7: Confirm & Policy */}
          {step === 7 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Step 7: Confirm Booking & Policy</h3>
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 space-y-2 text-xs text-amber-900">
                <p className="font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Singapore PawCare Guarantee Included</span>
                </p>
                <p>• Free cancellation up to 24 hours prior to service start.</p>
                <p>• $1,000,000 emergency medical and liability protection included.</p>
                <p>• 100% verified provider response SLA.</p>
              </div>
            </div>
          )}

          {/* STEP 8: Payment */}
          {step === 8 && (
            <div className="space-y-4 text-center">
              <h3 className="font-extrabold text-slate-900 text-base">Step 8: PayNow SG Instant Checkout</h3>
              
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 max-w-sm mx-auto space-y-3">
                <p className="text-xs font-bold text-slate-600">Scan QR Code with DBS, OCBC, UOB or GrabPay</p>
                <div className="w-44 h-44 bg-white rounded-xl border border-slate-300 mx-auto p-3 flex flex-col items-center justify-center space-y-2">
                  <QrCode className="w-28 h-28 text-slate-800" />
                  <span className="text-[10px] font-bold text-red-600">PayNow SG • UEN: 202688888K</span>
                </div>
                <p className="text-base font-black text-slate-900">Amount: SGD ${totalSGD.toFixed(2)}</p>
              </div>

              <button
                onClick={handleFinishBooking}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-colors text-sm"
              >
                Confirm & Pay SGD ${totalSGD.toFixed(2)}
              </button>
            </div>
          )}

          {/* STEP 9: Success Confirmation Screen */}
          {step === 9 && (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">Booking Confirmed!</h3>
                <p className="text-xs text-slate-500 mt-1">Your booking code is <strong className="text-slate-900">SG-PAW-8821</strong></p>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs text-slate-700 text-left max-w-md mx-auto space-y-1.5">
                <p><strong>Provider:</strong> {selectedProvider.name}</p>
                <p><strong>Pet:</strong> {currentPet.name} ({currentPet.breed})</p>
                <p><strong>Date & Time:</strong> {selectedDate} ({selectedTimeSlot})</p>
                <p><strong>Total Paid:</strong> SGD ${totalSGD.toFixed(2)} (PayNow)</p>
              </div>

              <div className="flex justify-center space-x-3 pt-2">
                <button
                  onClick={onClose}
                  className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
                >
                  Close & View Dashboard
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Wizard Footer Navigation (for Steps 1-7) */}
        {step < 8 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
            <button
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center space-x-1 ${
                step === 1 ? 'opacity-40 cursor-not-allowed border-slate-200' : 'bg-white hover:bg-slate-100 border-slate-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setStep(step + 1)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2 rounded-xl text-xs shadow-xs transition-colors flex items-center space-x-1"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
