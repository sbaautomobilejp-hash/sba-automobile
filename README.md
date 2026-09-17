# SBA Automobile & SBA Transport Service (SBA合同会社)
> **Full-Stack Automotive Export & Logistics Platform**
> 〒310-0832 茨城県水戸市吉田3066 Japan

---

## 🌟 Executive Overview

A production-grade, full-stack Japanese automotive platform built for **SBA合同会社** (Mito, Ibaraki, Japan). The system provides a luxury Japanese showroom experience for worldwide vehicle buyers alongside a mobile-first operations portal for the business owner to manage vehicle inventory, photograph auction arrivals, and respond to global customer inquiries directly from a smartphone.

### Key Architecture Highlights:
- **Luxury Japanese Design System**: Deep obsidian black palette (`#050608`), silver/white typography, and imperial Japanese crimson red accents (`#DC2626`).
- **Interactive 3D / 360° Studio Showroom**: Three.js WebGL rotating turntable stage with orbital touch controls, paint finish customizer, headlight toggles, and underglow lighting.
- **Dynamic Multi-Currency Engine**: Live JPY (base), USD, EUR, GBP, and AUD currency conversion across all vehicle cards, specifications, and FOB price calculators.
- **Mobile-First Smartphone Admin Dashboard**: Built specifically for phone-based operations at Japanese auction yards (USS, TAA, CAA). Includes one-tap status toggles, quick price/mileage editors, and bottom navigation.
- **Client-Side Image Optimization Pipeline**: In-browser canvas compression automatically resizes multi-megabyte camera photos to lightweight web JPEGs (~200–400KB) before uploading, preserving mobile cellular bandwidth and cloud storage quotas.
- **Dual-Mode Backend Resilience**: Works immediately out-of-the-box with pre-seeded authentic Japanese demo inventory (Toyota Land Cruiser 300 ZX, Nissan GT-R Nismo, Honda Civic Type R FL5, Lexus LX600, etc.) and seamlessly connects to live **Firebase (Auth, Firestore, Storage)** when environment variables are supplied.

---

## 🚀 Quick Start (Running Locally)

### 1. Prerequisites
- Node.js 18+ or 20+
- npm 9+

### 2. Installation & Launch
```bash
# Navigate to project directory
cd sba-automobile

# Install dependencies (if not already installed)
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Production Build & Test
```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

---

## 🔐 Admin Portal & Production Security

The admin portal is intentionally **Firebase-only** in the production-ready build. The old one-click demo login and arbitrary-password fallback have been removed.

Admin URL:
`/admin/login`

Create the administrator in Firebase Authentication using **Email/Password**. The included Firestore and Storage rules currently authorize the email:
`admin@sba-automobile.jp`

If you want a different admin email, change it in both:
- `firestore.rules`
- `storage.rules`

> Important: Firebase Web configuration values are client-side configuration, not server secrets. The real protection comes from Firebase Authentication + Firestore/Storage Security Rules. Never add a Firebase service-account private key to this project.

## ☁️ Firebase Setup

1. Create a Firebase project.
2. Add a **Web App** in Project Settings.
3. Enable **Authentication → Email/Password**.
4. Create your admin user.
5. Create **Cloud Firestore** in Production Mode.
6. Enable **Cloud Storage**.
7. Copy the Web App configuration into `.env.local` using `.env.example` as the template.
8. Deploy the included security rules:

```bash
firebase login
firebase use YOUR_FIREBASE_PROJECT_ID
firebase deploy --only firestore:rules,storage
```

The website uses:
- `vehicles` — public vehicle inventory; only the admin can create/update/delete.
- `inquiries` — public visitors can create inquiries; only the admin can read/update/delete.
- `vehicles/{vehicleId}/...` — vehicle images in Firebase Storage; public read, admin write/delete.

### Cloud data behavior

When Firebase is configured, Firebase is the **single source of truth**. Network/permission errors are surfaced instead of silently saving to browser localStorage. This prevents the dangerous situation where a car appears saved on one phone but does not exist in the cloud.

When Firebase is not configured, the public site can still display the clearly-labelled demo inventory for design/testing. The admin login remains disabled until Firebase Authentication is connected.

## 🖼 Vehicle Photos

Admin users can add multiple photos from a phone camera or photo library. Images are compressed in the browser before upload and then stored in Firebase Storage.

Do not use demo/stock images for a real vehicle listing. Replace the demo inventory with actual vehicle photos, auction sheets and accurate specifications before publishing a real stock unit.

## 🌐 Deployment

Recommended production flow:

1. Put the project in a private Git repository.
2. Add the Firebase environment variables to your hosting provider.
3. Deploy the Next.js application.
4. Add your real domain and configure DNS.
5. Test the complete flow on both desktop and phone:
   - public inventory
   - inquiry submission
   - admin login
   - add/edit/delete vehicle
   - photo upload
   - status changes
   - inquiry management

Do not commit `.env.local`, Firebase service-account files, passwords or private keys.

## 🧪 Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

For a production build:

```bash
npm run build
npm run start
```

## 📂 Project Directory Structure

```
sba-automobile/
├── README.md                          # Full platform guide & documentation
├── .env.example                       # Environment template
├── firestore.rules                    # Production Firestore security rules
├── storage.rules                      # Production Storage security rules
├── firebase.json                      # Firebase CLI configuration
├── package.json                       # Next.js 14, React 18, Three.js, Firebase
├── tsconfig.json                      # TypeScript config with @/ path aliases
├── tailwind.config.js                 # Japanese red & obsidian black luxury theme
├── next.config.mjs                    # Next.js configuration & image domains
└── src/
    ├── app/
    │   ├── layout.tsx                 # Root layout with SEO and providers
    │   ├── globals.css                # Obsidian black styles, red glow, scrollbars
    │   ├── page.tsx                   # Public showroom homepage
    │   ├── cars/[slug]/page.tsx       # Car detail page with lightbox & shipping calculator
    │   ├── services/page.tsx          # Buy, Sell, Export, SBA Transport Service
    │   ├── export/page.tsx            # Global shipping routes & port guide
    │   ├── company/page.tsx           # SBA合同会社 Mito, Ibaraki corporate profile
    │   └── admin/
    │       ├── layout.tsx             # Protected admin shell & navigation
    │       ├── page.tsx               # Executive dashboard & metrics
    │       ├── login/page.tsx         # Secure admin login
    │       ├── vehicles/page.tsx      # Mobile inventory table & quick price/mileage editor
    │       ├── vehicles/new/page.tsx  # Add vehicle with camera photo upload
    │       ├── vehicles/[id]/page.tsx # Edit full vehicle specifications
    │       └── inquiries/page.tsx     # Customer leads inbox with WhatsApp direct reply
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx             # Public header with live currency switcher
    │   │   └── Footer.tsx             # Japanese corporate registration & demo notice
    │   ├── home/
    │   │   ├── Hero.tsx               # Luxury headline & trust indicators
    │   │   ├── Showroom3D.tsx         # Three.js 360° interactive turntable showroom
    │   │   ├── InventoryGrid.tsx      # Filterable vehicle stock with instant search
    │   │   ├── ServicesGrid.tsx       # Core business divisions
    │   │   ├── ExportWorldwide.tsx    # Interactive destination ports
    │   │   ├── ProcessFlow.tsx        # 5-step buying process
    │   │   ├── WhyChooseSBA.tsx       # Ibaraki logistics fleet & auction licensing
    │   │   └── ContactSection.tsx     # Direct inquiry form & WhatsApp
    │   ├── vehicle/
    │   │   ├── VehicleCard.tsx        # Card with status badges and specs
    │   │   └── InquiryModal.tsx       # Pre-filled customer inquiry modal
    │   └── admin/
    │       ├── AdminNav.tsx           # Responsive topbar, sidebar, and mobile bottom bar
    │       └── VehicleForm.tsx        # Comprehensive vehicle editor & image compressor
    ├── context/
    │   ├── AuthContext.tsx            # Firebase Authentication provider
    │   └── CurrencyContext.tsx        # JPY, USD, EUR, GBP, AUD converter
    ├── lib/
    │   ├── db.ts                      # Firestore data layer with demo-only local fallback
    │   ├── firebase.ts                # Firebase SDK initialization
    │   ├── imageUtils.ts              # Browser canvas image compression
    │   └── demoData.ts                # Authentic Japanese demo vehicles & inquiries
    └── types/
        └── index.ts                   # TypeScript interfaces (Vehicle, Inquiry, etc.)
```

---

## 🏛 Corporate Details & Legal

- **Company Name**: SBA合同会社 (SBA LLC)
- **Trade Divisions**: SBA Automobile / SBA Transport Service
- **Corporate Address**: 〒310-0832 茨城県水戸市吉田3066 (Yoshida 3066, Mito-shi, Ibaraki-ken, Japan)
- **Business Focus**: Procurement, Domestic Bidding, Inland Fleet Carrier Logistics, Customs Clearance, Worldwide Export.
- **Inspection Support**: JEVIC, JAAI, EAA and other destination-specific inspection options can be coordinated where applicable.

---
© 2026 SBA合同会社. All rights reserved.
