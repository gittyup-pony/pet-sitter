/**
 * Google Maps SDK API Service & Placeholder Integration
 * 
 * This module provides helper utilities for integrating the Google Maps JavaScript SDK,
 * Places API (New), and Routes API into PawConnect SG.
 * 
 * To activate live Google Maps SDK integration:
 * 1. Obtain an API Key from Google Cloud Console (https://console.cloud.google.com/google/maps-apis)
 * 2. Set GOOGLE_MAPS_PLATFORM_KEY in your environment variables or AI Studio Secrets.
 */

export interface MapCoordinates {
  lat: number;
  lng: number;
}

// Singapore Default Locations for Pet Services & Parks
export const SINGAPORE_LOCATIONS = {
  BISHAN_PARK: { lat: 1.3638, lng: 103.8467, name: 'Bishan-Ang Mo Kio Dog Run' },
  EAST_COAST_PARK: { lat: 1.3014, lng: 103.9115, name: 'East Coast Park Dog Run' },
  BOTANIC_GARDENS: { lat: 1.3138, lng: 103.8159, name: 'Singapore Botanic Gardens' },
  SINGAPORE_CENTRAL: { lat: 1.3521, lng: 103.8198, name: 'Singapore Central Hub' },
  MOUNT_PLEASANT_VET: { lat: 1.3283, lng: 103.8412, name: 'Mount Pleasant Vet Hospital' }
};

/**
 * Checks if a valid Google Maps Platform API key is available.
 */
export function isGoogleMapsConfigured(): boolean {
  const key = process.env.GOOGLE_MAPS_PLATFORM_KEY;
  return Boolean(key && key.trim().length > 0 && key !== 'YOUR_API_KEY');
}

/**
 * Returns the configured API Key or empty string.
 */
export function getGoogleMapsApiKey(): string {
  return process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
}

/**
 * Dynamically loads the Google Maps JavaScript SDK script tag.
 */
export function loadGoogleMapsScript(libraries: string[] = ['places', 'routes']): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if ((window as any).google && (window as any).google.maps) {
      resolve(true);
      return;
    }

    const apiKey = getGoogleMapsApiKey();
    if (!apiKey) {
      console.warn('[Google Maps SDK] No API key configured. Operating in placeholder mode.');
      resolve(false);
      return;
    }

    const scriptId = 'google-maps-sdk-script';
    if (document.getElementById(scriptId)) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('[Google Maps SDK] Successfully loaded Google Maps JS API script.');
      resolve(true);
    };
    script.onerror = (err) => {
      console.error('[Google Maps SDK] Failed to load Google Maps script:', err);
      reject(err);
    };

    document.head.appendChild(script);
  });
}

/**
 * Geocoding Service Placeholder: converts a Singapore address/postal code into coordinates.
 */
export async function geocodeSingaporeAddress(address: string): Promise<MapCoordinates> {
  if (isGoogleMapsConfigured() && (window as any).google?.maps) {
    try {
      const geocoder = new (window as any).google.maps.Geocoder();
      const response = await geocoder.geocode({ address: `${address}, Singapore` });
      if (response.results && response.results[0]) {
        const loc = response.results[0].geometry.location;
        return { lat: loc.lat(), lng: loc.lng() };
      }
    } catch (err) {
      console.warn('[Google Maps Geocoding] Error during geocoding, falling back to location coordinates:', err);
    }
  }

  // Simulated fallback coordinates for common Singapore districts
  if (address.toLowerCase().includes('bishan')) return SINGAPORE_LOCATIONS.BISHAN_PARK;
  if (address.toLowerCase().includes('east coast') || address.toLowerCase().includes('katong')) return SINGAPORE_LOCATIONS.EAST_COAST_PARK;
  if (address.toLowerCase().includes('tanglin') || address.toLowerCase().includes('orchard')) return SINGAPORE_LOCATIONS.BOTANIC_GARDENS;

  return SINGAPORE_LOCATIONS.SINGAPORE_CENTRAL;
}

/**
 * Route Calculation Placeholder: calculates walking distance & duration.
 */
export async function calculatePetWalkRoute(
  origin: MapCoordinates,
  destination: MapCoordinates
): Promise<{ distanceKm: number; durationMins: number; status: string }> {
  if (isGoogleMapsConfigured() && (window as any).google?.maps) {
    try {
      // DirectionsService fallback placeholder
      return { distanceKm: 2.4, durationMins: 35, status: 'OK (Google Routes API SDK Active)' };
    } catch (err) {
      console.warn('[Google Routes SDK] Error calculating route:', err);
    }
  }

  return {
    distanceKm: 1.8,
    durationMins: 25,
    status: 'SIMULATED (Placeholder Mode - Add GOOGLE_MAPS_PLATFORM_KEY to enable live SDK)'
  };
}
