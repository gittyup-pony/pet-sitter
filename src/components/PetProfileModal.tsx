import React, { useState } from 'react';
import { X, Dog, Cat, Heart, ShieldCheck, Plus } from 'lucide-react';
import { PetProfile, PetSpecies } from '../types';

interface PetProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePet: (pet: PetProfile) => void;
  editingPet?: PetProfile | null;
}

export const PetProfileModal: React.FC<PetProfileModalProps> = ({
  isOpen,
  onClose,
  onSavePet,
  editingPet
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(editingPet?.name || '');
  const [species, setSpecies] = useState<PetSpecies>(editingPet?.species || 'Dog');
  const [breed, setBreed] = useState(editingPet?.breed || '');
  const [ageYears, setAgeYears] = useState<number>(editingPet?.ageYears || 2);
  const [weightKg, setWeightKg] = useState<number>(editingPet?.weightKg || 10);
  const [gender, setGender] = useState<'Male' | 'Female'>(editingPet?.gender || 'Male');
  const [feedingInstructions, setFeedingInstructions] = useState(editingPet?.feedingInstructions || '');
  const [emergencyContactName, setEmergencyContactName] = useState(editingPet?.emergencyContactName || 'Mount Pleasant Vet');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState(editingPet?.emergencyContactPhone || '+65 6251 7666');
  const [preferredVetClinic, setPreferredVetClinic] = useState(editingPet?.preferredVetClinic || 'Mount Pleasant Veterinary Centre');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const pet: PetProfile = {
      id: editingPet?.id || `pet-${Date.now()}`,
      name,
      species,
      breed: breed || 'Mixed Breed',
      ageYears,
      weightKg,
      gender,
      isNeutered: true,
      temperament: ['Friendly', 'Playful'],
      feedingInstructions: feedingInstructions || 'Standard kibble twice daily.',
      emergencyContactName,
      emergencyContactPhone,
      preferredVetClinic,
      avatarUrl: editingPet?.avatarUrl || (
        species === 'Cat' 
          ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400'
          : 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400'
      )
    };

    onSavePet(pet);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
          <h3 className="font-extrabold text-base">{editingPet ? 'Edit Pet Profile' : 'Add New Pet Profile'}</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Pet Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Milo"
                className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Species</label>
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value as PetSpecies)}
                className="w-full border border-slate-300 rounded-xl p-2.5 font-medium bg-white"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Bird">Bird</option>
                <option value="Small Animal">Small Animal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Breed</label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="e.g. Corgi"
                className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Age (Years)</label>
              <input
                type="number"
                value={ageYears}
                onChange={(e) => setAgeYears(Number(e.target.value))}
                className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Feeding & Dietary Instructions</label>
            <textarea
              rows={2}
              value={feedingInstructions}
              onChange={(e) => setFeedingInstructions(e.target.value)}
              placeholder="e.g. 1 cup dry food twice daily."
              className="w-full border border-slate-300 rounded-xl p-2.5 font-medium text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Emergency Vet Contact</label>
              <input
                type="text"
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Vet Phone (+65)</label>
              <input
                type="text"
                value={emergencyContactPhone}
                onChange={(e) => setEmergencyContactPhone(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-2.5 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 rounded-xl shadow-md transition-colors"
          >
            Save Pet Profile
          </button>
        </form>
      </div>
    </div>
  );
};
