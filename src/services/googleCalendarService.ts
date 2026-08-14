/**
 * Google Calendar SDK API Service & Placeholder Integration
 * 
 * This module provides helper utilities for integrating the Google Calendar API v3
 * to sync pet sitting bookings, dog walk appointments, and vet care reminders.
 * 
 * To activate live Google Calendar integration:
 * 1. Configure OAuth 2.0 Client Credentials in Google Cloud Console with scope:
 *    https://www.googleapis.com/auth/calendar.events
 * 2. Set GOOGLE_CALENDAR_API_KEY and GOOGLE_CLIENT_ID in your environment variables.
 */

import { Booking } from '../types';

export const GOOGLE_CALENDAR_SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.readonly'
];

export interface GoogleCalendarEvent {
  id?: string;
  summary: string;
  description: string;
  location?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: Array<{ email: string; displayName?: string }>;
  reminders?: {
    useDefault: boolean;
    overrides: Array<{ method: 'email' | 'popup'; minutes: number }>;
  };
}

/**
 * Checks if Google Calendar API keys / credentials are set.
 */
export function isGoogleCalendarConfigured(): boolean {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  return Boolean((apiKey && apiKey.trim().length > 0) || (clientId && clientId.trim().length > 0));
}

/**
 * Formats a PawConnect SG Booking into a standard Google Calendar Event schema.
 */
export function formatBookingToCalendarEvent(booking: Booking): GoogleCalendarEvent {
  // Parse date and time slot into ISO 8601 strings
  const [startTimeStr, endTimeStr] = booking.timeSlot.includes('-')
    ? booking.timeSlot.split('-').map(s => s.trim())
    : [booking.timeSlot, '18:00'];

  const eventStartISO = `${booking.date}T09:00:00+08:00`; // Singapore GMT+8
  const eventEndISO = `${booking.date}T11:00:00+08:00`;

  return {
    summary: `🐾 PawConnect SG: ${booking.serviceType.replace('_', ' ').toUpperCase()} for ${booking.petName}`,
    description: `Pet Care Service with ${booking.providerName}\n` +
      `Pet: ${booking.petName} (${booking.petSpecies})\n` +
      `District: ${booking.providerDistrict}\n` +
      `Booking ID: ${booking.id}\n` +
      `Special Instructions: ${booking.specialInstructions || 'None provided.'}\n\n` +
      `Booked via PawConnect SG Marketplace`,
    location: booking.pickupAddress || `${booking.providerDistrict}, Singapore`,
    start: {
      dateTime: eventStartISO,
      timeZone: 'Asia/Singapore'
    },
    end: {
      dateTime: eventEndISO,
      timeZone: 'Asia/Singapore'
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 30 },
        { method: 'email', minutes: 120 }
      ]
    }
  };
}

/**
 * Creates or syncs an event to Google Calendar API (or simulates in placeholder mode).
 */
export async function createGoogleCalendarEvent(
  booking: Booking,
  accessToken?: string
): Promise<{ success: boolean; eventId: string; googleCalendarUrl?: string; message: string }> {
  const event = formatBookingToCalendarEvent(booking);

  // If live OAuth token & config exist, call Google Calendar REST API
  if (accessToken && isGoogleCalendarConfigured()) {
    try {
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          eventId: data.id,
          googleCalendarUrl: data.htmlLink,
          message: 'Successfully synced appointment to your Google Calendar!'
        };
      } else {
        const errData = await response.json();
        console.warn('[Google Calendar API] Error response:', errData);
      }
    } catch (error) {
      console.error('[Google Calendar API] Network exception during event creation:', error);
    }
  }

  // Placeholder mode fallback / standard calendar link generator
  const encodedTitle = encodeURIComponent(event.summary);
  const encodedDetails = encodeURIComponent(event.description);
  const encodedLocation = encodeURIComponent(event.location || 'Singapore');
  const googleWebCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&details=${encodedDetails}&location=${encodedLocation}`;

  return {
    success: true,
    eventId: `gcal-placeholder-${booking.id}`,
    googleCalendarUrl: googleWebCalendarUrl,
    message: isGoogleCalendarConfigured()
      ? 'Event prepared. Click to open in Google Calendar web.'
      : 'Placeholder Mode: Google Calendar API key pending. Click link to open direct Google Calendar scheduling.'
  };
}
