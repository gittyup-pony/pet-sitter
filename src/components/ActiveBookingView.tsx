import React, { useState } from 'react';
import { 
  Navigation, 
  Camera, 
  MessageSquare, 
  PhoneCall, 
  ShieldCheck, 
  Send, 
  MapPin, 
  Clock, 
  Download, 
  X,
  AlertTriangle
} from 'lucide-react';
import { Booking, ChatMessage } from '../types';
import { GoogleMapsPlaceholder } from './GoogleMapsPlaceholder';
import { GoogleCalendarPlaceholder } from './GoogleCalendarPlaceholder';

interface ActiveBookingViewProps {
  booking: Booking;
  onUpdateBooking: (updated: Booking) => void;
  onBack: () => void;
}

export const ActiveBookingView: React.FC<ActiveBookingViewProps> = ({
  booking,
  onUpdateBooking,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'gps' | 'photos' | 'chat'>('gps');
  const [newMessage, setNewMessage] = useState<string>('');
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);

  // Send message in live chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'You',
      text: newMessage,
      timestamp: 'Just now'
    };

    const updatedMessages = [...booking.messages, userMsg];

    // Simulated provider reply
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'provider',
        senderName: booking.providerName,
        text: `Thanks for the message! ${booking.petName} is doing great. Sending a new photo update shortly!`,
        timestamp: 'Just now'
      };

      onUpdateBooking({
        ...booking,
        messages: [...updatedMessages, replyMsg]
      });
    }, 1200);

    onUpdateBooking({
      ...booking,
      messages: updatedMessages
    });

    setNewMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>SERVICE IN PROGRESS</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: {booking.id}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Active Care for {booking.petName} with {booking.providerName}
          </h1>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold">
          <a
            href="tel:+6567891234"
            className="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-xl border border-red-200 transition-colors flex items-center space-x-1"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>24/7 Vet Emergency</span>
          </a>

          <button
            onClick={() => alert(`Receipt for ${booking.id} downloaded.`)}
            className="bg-white hover:bg-slate-50 text-slate-800 px-3 py-2 rounded-xl border border-slate-300 transition-colors flex items-center space-x-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Receipt</span>
          </button>

          <button
            onClick={() => setShowCancelModal(true)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl transition-colors"
          >
            Cancel Booking
          </button>
        </div>
      </div>


      {/* Main Grid: Interactive Stage + Sidebar Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: GPS Map / Photo Feed / Chat Tabs */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[580px]">
          
          {/* Header Navigation Tabs */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex space-x-2 text-xs font-bold">
              <button
                onClick={() => setActiveTab('gps')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  activeTab === 'gps' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>Live GPS Map</span>
              </button>

              <button
                onClick={() => setActiveTab('photos')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  activeTab === 'photos' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Live Photos ({booking.liveUpdates.filter(u => u.type === 'photo').length})</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  activeTab === 'chat' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>In-App Chat ({booking.messages.length})</span>
              </button>
            </div>

            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 border border-emerald-800 px-2.5 py-1 rounded-full animate-pulse">
              ● REAL-TIME SG STREAM
            </span>
          </div>

          {/* TAB 1: GPS Live Route Canvas with Google Maps SDK API Placeholder */}
          {activeTab === 'gps' && (
            <div className="flex-1 overflow-hidden flex flex-col justify-between">
              <GoogleMapsPlaceholder
                petName={booking.petName}
                providerName={booking.providerName}
                locationName={booking.providerDistrict || 'Bishan Park Dog Run'}
                className="h-full rounded-none border-0"
              />
            </div>
          )}

          {/* TAB 2: Photo Update Feed */}
          {activeTab === 'photos' && (
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
              <p className="font-bold text-slate-900 text-xs">Photo Check-ins from {booking.providerName}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {booking.liveUpdates.filter(u => u.photoUrl).map((up) => (
                  <div key={up.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <img
                      src={up.photoUrl}
                      alt={up.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{up.title}</span>
                        <span className="text-amber-600 text-[10px]">{up.timestamp}</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">{up.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Interactive In-App Chat */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between p-4 bg-slate-100">
              {/* Message List */}
              <div className="flex-1 overflow-y-auto space-y-3 p-2 text-xs">
                {booking.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] ${
                      msg.sender === 'user' ? 'ml-auto items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl shadow-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-amber-500 text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                      }`}
                    >
                      <p className="font-bold text-[10px] opacity-80 mb-0.5">{msg.senderName}</p>
                      <p className="text-xs">{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5 px-1">{msg.timestamp}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-200 flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Message ${booking.providerName}...`}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center space-x-1"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

        </div>


        {/* Right Column: Booking Details Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs text-xs">
            <h3 className="font-extrabold text-slate-900 text-base">Booking Overview</h3>

            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <img
                src={booking.providerAvatar}
                alt={booking.providerName}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-200"
              />
              <div>
                <p className="font-bold text-slate-900 text-sm">{booking.providerName}</p>
                <p className="text-[11px] text-slate-500">{booking.providerDistrict}</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-3 text-slate-700">
              <p><strong>Pet:</strong> {booking.petName} ({booking.petSpecies})</p>
              <p><strong>Schedule:</strong> {booking.date} @ {booking.timeSlot}</p>
              {booking.pickupAddress && <p><strong>Pickup:</strong> {booking.pickupAddress}</p>}
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 space-y-1">
              <p className="font-bold">Itemised Total Paid:</p>
              <p className="text-lg font-black text-amber-700">SGD ${booking.priceBreakdown.totalSGD.toFixed(2)}</p>
              <p className="text-[10px] text-amber-800">Includes SGD $1,000,000 PawCare Insurance</p>
            </div>

            <div className="pt-2">
              <p className="font-bold text-slate-900 mb-1">Special Instructions:</p>
              <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                "{booking.specialInstructions || 'None provided.'}"
              </p>
            </div>
          </div>

          {/* Google Calendar SDK API Placeholder Widget */}
          <GoogleCalendarPlaceholder booking={booking} />
        </div>

      </div>


      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 text-xs">
            <h3 className="font-extrabold text-slate-900 text-base">Cancel Booking {booking.id}?</h3>
            <p className="text-slate-600 leading-relaxed">
              According to the sitter's cancellation policy (Flexible 24h), cancellations submitted prior to 24h are eligible for a 100% full refund to PayNow.
            </p>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl"
              >
                Keep Booking
              </button>
              <button
                onClick={() => {
                  onUpdateBooking({ ...booking, status: 'cancelled' });
                  setShowCancelModal(false);
                  onBack();
                }}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
