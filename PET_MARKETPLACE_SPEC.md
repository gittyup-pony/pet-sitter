# PawConnect SG - Singapore Pet Service Marketplace
## Platform Architecture & Functional Specification Document

### 1. Executive Summary & Vision
PawConnect SG is a premier, trusted, conversion-focused pet service marketplace designed specifically for busy Singapore pet owners. It connects pet parents with thoroughly vetted, background-checked local pet sitters, pet transport drivers, dog walkers, and pet boarders.

- **Primary Conversion Goal:** Seamless discovery and booking of verified pet services in Singapore.
- **Key Differentiator:** End-to-end trust and safety framework integrated with Singapore identity verification standards, real-time GPS tracking for pet transport and walks, live photo/video check-ins, transparent SGD pricing with zero hidden fees, and an SGD $1,000,000 PawCare Guarantee.

---

### 2. Business Model & Value Proposition

#### Key Stakeholders
1. **Pet Owners (Customers):** Working professionals, DINKs, travellers, and busy families in Singapore needing reliable, high-quality care for their pets.
2. **Service Providers:** Vetted pet sitters, dog walkers, pet taxi drivers, and groomers earning flexible income.
3. **Strategic Partners:** MSIG / Etiqa Pet Insurance providers, licensed veterinary clinics (e.g., Mount Pleasant Vet, United Veterinary Clinic), and pet supply partners.

#### Revenue Streams
- **Platform Commission:** 15% commission on service provider earnings per completed booking.
- **Booking & Service Fee:** Transparent flat SGD $3.00 platform fee per booking.
- **Add-on Services:** Emergency Pet Care & Transport Insurance add-on (SGD $2.50/day).
- **Partner & Listing Fees:** Premium listings for vetted grooming salons and veterinary clinics.
- **Cancellation Charges:** Transparent tiered cancellation fee policy protecting both sitters and owners.

---

### 3. Core Functional Modules

#### 3.1 Discovery & Search Engine
- **Search Criteria:** Location (Singapore Districts e.g. Orchard, Bishan, Tampines, Jurong East, Katong), Service Type, Date/Time, Pet Type (Dog, Cat, Rabbit, Small Pet).
- **Filtering & Sorting:** Filter by SGD Price Range, Rating (4.5+), Response Time (< 15 mins), Verification Badges, and Distance. Sort by Recommended, Distance, Price, or Rating.

#### 3.2 Transparent Pricing & Quote Calculator
- **Base Fee:** Clear hourly or daily SGD rates.
- **Platform Fee:** SGD $3.00 transparent platform charge.
- **Insurance Add-on:** Optional SGD $2.50/day PawCare Protection.
- **Transport Surcharges:** Distance-based point-to-point calculation for pet transport services across Singapore.

#### 3.3 Multi-Step Frictionless Booking Flow
1. **Step 1:** Select Service Type (Pet Sitting, Pet Transport, Dog Walking, Boarding).
2. **Step 2:** Select Registered Pet Profile or Add New Pet.
3. **Step 3:** Select Date, Start/End Time, or Duration.
4. **Step 4:** Choose or Confirm Verified Provider.
5. **Step 5:** Review Itemised Price Breakdown in SGD.
6. **Step 6:** Add Special Instructions (Feeding, Vet details, Leash preference).
7. **Step 7:** Review Policy & Confirm Booking.
8. **Step 8:** Instant Secure Payment via PayNow SG QR, GrabPay, or Credit Card.

#### 3.4 Real-Time GPS Tracking & Photo Check-ins
- **Live GPS Map:** Simulated real-time tracking for dog walks and point-to-point pet transport across Singapore routes.
- **Photo Check-in Stream:** Providers upload photo/video updates with timestamps directly to the booking timeline.
- **In-App Messaging:** Direct encrypted chat between pet owner and provider with photo sharing.

#### 3.5 Customer & Pet Profile Management
- Comprehensive profiles for dogs, cats, rabbits, birds, and small pets including name, breed, weight, temperament, feeding schedules, medication requirements, emergency contacts, and preferred SG vet clinic.
- PawPoints Loyalty Program: Earn 10 points per $1 SGD spent; redeem points for booking discounts.

#### 3.6 Provider Portal
- Job request management (Accept/Decline within response SLA).
- Earnings dashboard with instant PayNow SG payout options.
- Availability calendar management and service area mapping across Singapore districts.

#### 3.7 Admin & Platform Operations
- Provider SingPass / background check verification queue.
- Dispute resolution and refund management.
- Commission rate configuration and SG market analytics.

---

### 4. Singapore Trust & Safety Standards
- **Verification Badges:** SingPass ID Verified, Background Checked, AVS/NParks Compliance.
- **Emergency Support:** 24/7 Singapore Hotline (+65 6789 1234) connected to emergency vet partner networks.
- **SGD $1,000,000 PawCare Guarantee:** Automatic protection covering medical emergencies during booked services.

---

### 5. Technology & UX Guidelines
- **Accessibility:** WCAG 2.1 AA compliant color contrast, readable typography, keyboard navigation.
- **Responsive Layout:** Mobile-first responsive design tailored for smartphones and desktop browsers.
- **Performance:** Clean React + Tailwind CSS code architecture with smooth state transitions.
