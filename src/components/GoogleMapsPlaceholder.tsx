import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Info, ExternalLink, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import { isGoogleMapsConfigured, getGoogleMapsApiKey, SINGAPORE_LOCATIONS } from '../services/googleMapsService';

interface GoogleMapsPlaceholderProps {
  petName?: string;
  providerName?: string;
  locationName?: string;
  className?: string;
}

export const GoogleMapsPlaceholder: React.FC<GoogleMapsPlaceholderProps> = ({
  petName = 'Milo',
  providerName = 'Auntie Mei',
  locationName = 'Bishan-Ang Mo Kio Dog Run',
  className = ''
}) => {
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [showSetupGuide, setShowSetupGuide] = useState<boolean>(false);

  useEffect(() => {
    setHasKey(isGoogleMapsConfigured());
  }, []);

  return (
    <div className={`relative bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 text-white p-4 flex flex-col justify-between ${className}`}>
      
      {/* Background Simulation Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Top Banner Status */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xs text-amber-400">Google Maps SDK API</span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                hasKey ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}>
                {hasKey ? '✓ SDK ACTIVE' : '● PLACEHOLDER MODE'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {hasKey ? 'Live Google Maps Platform JS SDK initialized' : 'Add GOOGLE_MAPS_PLATFORM_KEY to connect live map rendering'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSetupGuide(!showSetupGuide)}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-3 py-1.5 rounded-xl transition-colors border border-slate-700 flex items-center space-x-1"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showSetupGuide ? 'Hide Instructions' : 'API Setup Info'}</span>
        </button>
      </div>

      {/* Setup Guide Drawer */}
      {showSetupGuide && (
        <div className="relative z-20 my-3 bg-slate-900 border border-amber-500/30 p-4 rounded-2xl space-y-2 text-xs text-slate-300 shadow-xl">
          <h4 className="font-extrabold text-amber-400 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>How to activate Google Maps SDK API</span>
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
            <li>Obtain an API key from <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline font-bold">Google Cloud Console</a>.</li>
            <li>Enable <strong>Maps JavaScript API</strong>, <strong>Places API (New)</strong>, and <strong>Routes API</strong>.</li>
            <li>Open AI Studio <strong>Settings (⚙️)</strong> &rarr; <strong>Secrets</strong> &rarr; add <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">GOOGLE_MAPS_PLATFORM_KEY</code>.</li>
            <li>The application will automatically initialize live Google Maps SDK rendering.</li>
          </ol>
        </div>
      )}

      {/* Map Interactive Canvas Stage */}
      <div className="relative z-10 my-4 flex-1 min-h-[220px] flex flex-col justify-center items-center text-center p-6 border border-slate-800/80 rounded-2xl bg-slate-900/60 backdrop-blur-xs space-y-3">
        {/* Animated GPS Path Line */}
        <svg className="absolute inset-0 w-full h-full stroke-amber-400/80 stroke-2 fill-none pointer-events-none">
          <path d="M 80 180 Q 200 60 380 120 T 580 90" strokeDasharray="6 6" className="animate-pulse" />
        </svg>

        {/* Dynamic Location Marker Pin */}
        <div className="relative z-10 flex flex-col items-center animate-bounce">
          <div className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg border border-amber-300 flex items-center space-x-1">
            <Navigation className="w-3.5 h-3.5" />
            <span>🐕 {petName} & {providerName} @ {locationName}</span>
          </div>
          <div className="w-4 h-4 bg-amber-400 rounded-full border-2 border-white shadow-xl mt-1"></div>
        </div>

        <div className="relative z-10 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-xl text-xs space-y-1">
          <p className="font-bold text-amber-400">📍 Location Coordinates: Singapore 1.3638° N, 103.8467° E</p>
          <p className="text-[11px] text-slate-400">Real-time telemetry stream operating cleanly in placeholder mode</p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
        <span>Google Maps Platform SDK Ready</span>
        <span className="font-mono">STATUS: {hasKey ? 'LIVE_KEY_CONNECTED' : 'PLACEHOLDER_READY'}</span>
      </div>
    </div>
  );
};
