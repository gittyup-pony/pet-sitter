import React, { useState } from 'react';
import { X, Star, ShieldCheck, ThumbsUp, Filter, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Provider, Review } from '../types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: Provider;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  provider
}) => {
  if (!isOpen) return null;

  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const filteredReviews = filterRating === 'all'
    ? provider.reviews
    : provider.reviews.filter((r) => r.rating === filterRating);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <img
              src={provider.avatarUrl}
              alt={provider.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-300"
            />
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-extrabold text-base text-white">{provider.name}</h3>
                {provider.verifiedSingPass && (
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Provider</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Verified Customer Reviews • {provider.district}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rating Breakdown Banner */}
        <div className="bg-amber-50 p-4 border-b border-amber-100 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="text-center px-3 py-1 bg-white rounded-2xl border border-amber-200 shadow-xs">
              <span className="text-2xl font-black text-amber-600">{provider.rating}</span>
              <p className="text-[10px] text-slate-400 font-bold uppercase">out of 5</p>
            </div>
            <div>
              <div className="flex text-amber-400 space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs font-bold text-slate-800 mt-0.5">
                Based on {provider.reviewCount} verified bookings
              </p>
              <p className="text-[11px] text-emerald-700 font-medium">
                100% verified pet parents in Singapore
              </p>
            </div>
          </div>

          {/* Filter pills */}
          <div className="hidden sm:flex items-center space-x-1 text-xs">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-2.5 py-1 rounded-lg border font-bold ${
                filterRating === 'all' ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              All ({provider.reviews.length})
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-2.5 py-1 rounded-lg border font-bold ${
                filterRating === 5 ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              5 ★
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              No reviews match the selected filter rating.
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-slate-900 text-sm">{rev.authorName}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                        📍 {rev.authorDistrict}
                      </span>
                      {rev.verifiedBooking && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified Booking</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Service: <strong className="text-slate-800">{rev.serviceName}</strong> for <strong className="text-amber-700">{rev.petType}</strong>
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal bg-white p-3 rounded-xl border border-slate-100 italic">
                  "{rev.comment}"
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0 text-xs">
          <span className="text-slate-500">Reviews submitted by real pet parents in Singapore</span>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-xl"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
