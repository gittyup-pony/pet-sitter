import React, { useState } from 'react';
import { Calendar as CalendarIcon, Check, ExternalLink, Info, ShieldCheck, Sparkles } from 'lucide-react';
import { Booking } from '../types';
import { 
  isGoogleCalendarConfigured, 
  createGoogleCalendarEvent, 
  formatBookingToCalendarEvent 
} from '../services/googleCalendarService';

interface GoogleCalendarPlaceholderProps {
  booking: Booking;
  className?: string;
}

export const GoogleCalendarPlaceholder: React.FC<GoogleCalendarPlaceholderProps> = ({
  booking,
  className = ''
}) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncedUrl, setSyncedUrl] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const hasConfig = isGoogleCalendarConfigured();

  const handleSyncToCalendar = async () => {
    setIsSyncing(true);
    try {
      const result = await createGoogleCalendarEvent(booking);
      if (result.googleCalendarUrl) {
        setSyncedUrl(result.googleCalendarUrl);
      }
    } catch (err) {
      console.error('[Google Calendar SDK Sync] Exception:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs ${className}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h4 className="font-extrabold text-slate-900 text-xs">Google Calendar SDK API</h4>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                hasConfig ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {hasConfig ? 'SDK CONNECTED' : 'PLACEHOLDER MODE'}
              </span>
            </div>
            <p className="text-[10px] text-slate-500">Sync care schedule to Google Calendar</p>
          </div>
        </div>

        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          title="API Info"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Info Drawer */}
      {showInfo && (
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1.5">
          <p className="font-bold text-slate-800 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Google Calendar Integration Guide</span>
          </p>
          <p className="leading-relaxed">
            Configure <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">GOOGLE_CALENDAR_API_KEY</code> and <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">GOOGLE_CLIENT_ID</code> in <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">.env.example</code> to enable direct background OAuth sync.
          </p>
        </div>
      )}

      {/* Action Button */}
      {syncedUrl ? (
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs">
          <span className="font-bold text-emerald-800 flex items-center space-x-1">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Schedule Formatted!</span>
          </span>
          <a
            href={syncedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
          >
            <span>Open Google Calendar</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ) : (
        <button
          onClick={handleSyncToCalendar}
          disabled={isSyncing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-200" />
          <span>{isSyncing ? 'Syncing Appointment...' : 'Add Care Schedule to Google Calendar'}</span>
        </button>
      )}
    </div>
  );
};
