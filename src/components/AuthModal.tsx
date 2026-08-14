import React, { useState } from 'react';
import { X, User, Dog, Lock, Mail, Phone, MapPin, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { PetProfile, PetSpecies, SingaporeDistrict } from '../types';
import { SINGAPORE_DISTRICTS } from '../data/mockData';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: SingaporeDistrict;
  address: string;
  role: 'customer' | 'provider';
  membershipTier: string;
  pets: PetProfile[];
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [signUpStep, setSignUpStep] = useState<number>(1); // Step 1: User Account, Step 2: Pet Details, Step 3: Success

  // Login form state
  const [loginEmail, setLoginEmail] = useState<string>('brendon.tan@example.sg');
  const [loginPassword, setLoginPassword] = useState<string>('password123');

  // Sign Up User State
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('+65 9123 4567');
  const [district, setDistrict] = useState<SingaporeDistrict>('Bishan & Novena');
  const [address, setAddress] = useState<string>('Blk 123 Bishan St 12 #05-88, Singapore 570123');
  const [password, setPassword] = useState<string>('');

  // Sign Up Pet Details State (Item 9 requirement)
  const [petName, setPetName] = useState<string>('');
  const [petSpecies, setPetSpecies] = useState<PetSpecies>('Dog');
  const [petBreed, setPetBreed] = useState<string>('');
  const [petAge, setPetAge] = useState<number>(2);
  const [petWeight, setPetWeight] = useState<number>(12);
  const [petGender, setPetGender] = useState<'Male' | 'Female'>('Male');
  const [isNeutered, setIsNeutered] = useState<boolean>(true);
  const [medicalNotes, setMedicalNotes] = useState<string>('Fully vaccinated, friendly with humans.');

  const handleDemoLogin = (role: 'customer' | 'provider') => {
    if (role === 'customer') {
      const demoUser: UserAccount = {
        id: 'usr-1',
        name: 'Brendon Tan',
        email: 'brendon.tan@example.sg',
        phone: '+65 9123 4567',
        district: 'Bishan & Novena',
        address: 'Blk 214 Bishan St 23 #08-110, Singapore 570214',
        role: 'customer',
        membershipTier: 'PawConnect Care+',
        pets: [
          {
            id: 'pet-1',
            name: 'Milo',
            species: 'Dog',
            breed: 'Golden Retriever',
            ageYears: 3,
            weightKg: 28,
            avatarUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=300',
            medicalNotes: 'Slight sensitivity to chicken kibbles.',
            feedingSchedule: '1.5 cups dry food twice daily at 8 AM and 7 PM',
            emergencyContact: 'United Veterinary Clinic (+65 6252 2623)'
          }
        ]
      };
      onLoginSuccess(demoUser);
    } else {
      const demoProvider: UserAccount = {
        id: 'prov-1',
        name: 'Rachel Tan',
        email: 'rachel.tan@pawconnect.sg',
        phone: '+65 8888 1234',
        district: 'Bishan & Novena',
        address: 'Bishan St 22, Singapore 570222',
        role: 'provider',
        membershipTier: 'Pro Sitter',
        pets: []
      };
      onLoginSuccess(demoProvider);
    }
    onClose();
  };

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserAccount = {
      id: `usr-${Date.now()}`,
      name: loginEmail.split('@')[0].replace('.', ' '),
      email: loginEmail,
      phone: '+65 9876 5432',
      district: 'Bishan & Novena',
      address: 'Singapore Central',
      role: 'customer',
      membershipTier: 'PawConnect Free',
      pets: [
        {
          id: `pet-${Date.now()}`,
          name: 'Buddy',
          species: 'Dog',
          breed: 'Corgi',
          ageYears: 2,
          weightKg: 10,
          avatarUrl: 'https://images.unsplash.com/photo-1617895153857-82fe79ada944?auto=format&fit=crop&q=80&w=300',
          medicalNotes: 'Active and loves parks.'
        }
      ]
    };
    onLoginSuccess(user);
    onClose();
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpStep === 1) {
      setSignUpStep(2); // Move to Pet details step
      return;
    }

    // Finish Signup
    const newPet: PetProfile = {
      id: `pet-${Date.now()}`,
      name: petName || 'Coco',
      species: petSpecies,
      breed: petBreed || 'Poodle Mix',
      ageYears: petAge,
      weightKg: petWeight,
      avatarUrl: petSpecies === 'Cat' 
        ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300'
        : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300',
      medicalNotes
    };

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: fullName || 'New Singapore Parent',
      email: email || 'user@singapore.sg',
      phone,
      district,
      address,
      role: 'customer',
      membershipTier: 'PawConnect Care+',
      pets: [newPet]
    };

    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-extrabold text-base text-white">
              {mode === 'login' ? 'Log In to PawConnect SG' : 'Create Your Singapore Pet Parent Account'}
            </h3>
            <p className="text-xs text-slate-400">
              {mode === 'login' ? 'Access your pet care bookings & live GPS updates' : 'Step 1: Parent Info • Step 2: Pet Details'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Mode Tabs */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex space-x-2 shrink-0 text-xs font-bold">
          <button
            onClick={() => { setMode('login'); setSignUpStep(1); }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setMode('signup'); setSignUpStep(1); }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              mode === 'signup' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign Up & Add Pet
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs sm:text-sm">
          
          {/* LOGIN FORM */}
          {mode === 'login' && (
            <div className="space-y-4">
              {/* Demo Accounts Bar */}
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 space-y-2 text-xs">
                <p className="font-bold text-amber-900 flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Instant Quick Demo Access</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('customer')}
                    className="py-2 bg-white hover:bg-amber-100 text-amber-900 font-bold rounded-xl border border-amber-300 transition-colors"
                  >
                    👤 Brendon (Customer)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('provider')}
                    className="py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors"
                  >
                    🐾 Rachel (Sitter)
                  </button>
                </div>
              </div>

              <form onSubmit={handleLoginFormSubmit} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl font-medium"
                      placeholder="e.g. brendon@example.sg"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl font-medium"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-md transition-colors text-sm"
                >
                  Log In to Account
                </button>
              </form>
            </div>
          )}

          {/* SIGN UP FORM WITH PET DETAILS */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              
              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 pb-3">
                <span className={signUpStep === 1 ? 'text-amber-600' : 'text-slate-400'}>
                  1. Parent Account Details
                </span>
                <span className={signUpStep === 2 ? 'text-amber-600' : 'text-slate-400'}>
                  2. Pet Details & Breed
                </span>
              </div>

              {/* STEP 1: Parent Account Info */}
              {signUpStep === 1 && (
                <div className="space-y-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
                      placeholder="e.g. Sarah Lin"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
                        placeholder="sarah@example.sg"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">SG Mobile Phone</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
                        placeholder="+65 9123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Singapore District</label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value as SingaporeDistrict)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-medium"
                    >
                      {SINGAPORE_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Home Address (Key Lockbox / Pickup)</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
                      placeholder="Blk & Street number, Singapore postal code"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Create Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 rounded-xl shadow-md transition-colors text-sm"
                  >
                    Continue to Add Pet Details →
                  </button>
                </div>
              )}

              {/* STEP 2: Pet Details (Requirement Item 9) */}
              {signUpStep === 2 && (
                <div className="space-y-3">
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                    🐾 Tell sitters about your pet so they can provide customized care & feeding!
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Pet Name</label>
                    <input
                      type="text"
                      required
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
                      placeholder="e.g. Biscuit"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Pet Species</label>
                      <select
                        value={petSpecies}
                        onChange={(e) => setPetSpecies(e.target.value as PetSpecies)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-medium"
                      >
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Bird">Bird</option>
                        <option value="Small Animal">Small Animal</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Breed</label>
                      <input
                        type="text"
                        required
                        value={petBreed}
                        onChange={(e) => setPetBreed(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
                        placeholder="e.g. Poodle / Domestic Shorthair"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Age (Years)</label>
                      <input
                        type="number"
                        value={petAge}
                        onChange={(e) => setPetAge(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Weight (Kg)</label>
                      <input
                        type="number"
                        value={petWeight}
                        onChange={(e) => setPetWeight(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Gender</label>
                      <select
                        value={petGender}
                        onChange={(e) => setPetGender(e.target.value as any)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-medium"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Feeding & Health Notes</label>
                    <textarea
                      rows={2}
                      value={medicalNotes}
                      onChange={(e) => setMedicalNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium text-xs"
                      placeholder="e.g. Eats 1 cup kibble twice daily. Friendly with dogs."
                    />
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSignUpStep(1)}
                      className="w-1/3 py-3 border border-slate-300 text-slate-700 font-bold rounded-xl"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors text-sm"
                    >
                      Complete Sign Up & Add Pet
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 shrink-0">
          🛡️ PawConnect Singapore • SGD $1,000,000 Care Insurance Guarantee Included
        </div>

      </div>
    </div>
  );
};
