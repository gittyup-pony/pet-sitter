import React, { useState } from 'react';
import { X, Check, Sparkles, ShieldCheck, Zap, Heart, Gift } from 'lucide-react';

interface SubscriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: (planName: string) => void;
}

export const SubscriptionsModal: React.FC<SubscriptionsModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan
}) => {
  if (!isOpen) return null;

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      id: 'basic',
      name: 'PawConnect Free',
      tagline: 'Standard Pay-Per-Booking',
      priceMonthly: 0,
      priceAnnual: 0,
      popular: false,
      badge: 'Free Forever',
      features: [
        'Pay standard platform fee ($3.00/booking)',
        'Access to 100% SingPass Verified sitters',
        'Basic PawCare $50,000 coverage',
        'Standard PawPoints (10 pts per $1 spent)',
        'In-app live GPS route tracking & photos'
      ]
    },
    {
      id: 'care_plus',
      name: 'PawConnect Care+',
      tagline: 'Most Popular for Active Pet Parents',
      priceMonthly: 19.90,
      priceAnnual: 14.90, // $178.80 billed annually (~$14.90/mo)
      annualTotal: 178.80,
      popular: true,
      badge: 'Save 25% Billed Annually',
      features: [
        '0% Platform Booking Fees (Save ~$15/month)',
        '10% OFF all Pet Sitting, Dog Walking & Taxi Services',
        'Full SGD $1,000,000 PawCare Guarantee',
        'Priority 24/7 Telehealth Vet Hotline',
        '2x PawPoints Bonus Multiplier',
        'Guaranteed Sitter Response in < 15 mins'
      ]
    },
    {
      id: 'vip_family',
      name: 'VIP Pet Family Pass',
      tagline: 'Complete Peace of Mind for Multi-Pet Homes',
      priceMonthly: 39.90,
      priceAnnual: 29.90, // $358.80 billed annually
      annualTotal: 358.80,
      popular: false,
      badge: 'All-Inclusive VIP',
      features: [
        'Everything in Care+ Pass included',
        '2 FREE Private Dog Walks or Pet Visits every month',
        'Free Emergency Vet Taxi Shuttle (Up to $100/trip value)',
        'Dedicated Personal Pet Concierge Manager',
        'Complimentary Grooming Perks Voucher ($50 value)',
        '3x PawPoints Bonus Multiplier'
      ]
    }
  ];

  const handleChoosePlan = (planName: string) => {
    if (onSelectPlan) {
      onSelectPlan(`${planName} (${billingCycle.toUpperCase()})`);
    }
    alert(`Thank you for subscribing to ${planName} (${billingCycle === 'annual' ? 'Annual Billing' : 'Monthly Billing'})!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between shrink-0">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-1 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>PawConnect Care+ Membership</span>
            </div>
            <h2 className="text-2xl font-black">Choose Your Care Membership Plan</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Unlock 0% booking fees, priority vet hotline access, and exclusive discounts in Singapore
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Billing Toggle (Monthly vs Annual) */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-center items-center space-x-3 shrink-0 text-xs sm:text-sm">
          <span className={`font-bold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
            Monthly Billing
          </span>

          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-14 h-8 bg-amber-500 rounded-full p-1 transition-colors relative flex items-center"
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>

          <div className="flex items-center space-x-1.5">
            <span className={`font-bold ${billingCycle === 'annual' ? 'text-slate-900' : 'text-slate-500'}`}>
              Annual Billing
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              SAVE 25%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const priceDisplay = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all relative ${
                  plan.popular
                    ? 'border-amber-500 bg-amber-50/30 ring-2 ring-amber-500/20 shadow-md'
                    : 'border-slate-200 bg-white shadow-xs hover:border-amber-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    MOST POPULAR
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-2">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{plan.tagline}</p>
                  </div>

                  <div className="border-y border-slate-200/80 py-3">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-xs font-bold text-slate-500">SGD</span>
                      <span className="text-3xl font-black text-slate-900">${priceDisplay.toFixed(2)}</span>
                      <span className="text-xs text-slate-500">/ month</span>
                    </div>
                    {billingCycle === 'annual' && plan.annualTotal && (
                      <p className="text-[10px] text-emerald-700 font-bold mt-1">
                        Billed SGD ${plan.annualTotal.toFixed(2)} / year
                      </p>
                    )}
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => handleChoosePlan(plan.name)}
                    className={`w-full py-3 rounded-xl font-extrabold text-xs transition-all shadow-xs ${
                      plan.popular
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 shrink-0">
          🛡️ Cancel anytime in your dashboard. Guaranteed SGD $1,000,000 PawCare protection included on all tiers.
        </div>

      </div>
    </div>
  );
};
